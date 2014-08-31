import java.io.File

import play.api.Application
import play.api.test.PlaySpecification
import support.{BeforeAndAfter, ApplaudioApp}

import scalax.io.{Codec, Output, Resource}

class LibrarySpec extends PlaySpecification {

  "Retrieving Directories" should {

    "return an OK response for valid requests" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/artists").get)
      response.status must be equalTo (OK)
    }

    "return an Not Found response for valid requests for missing content" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/artists/Aqua").get)
      response.status must be equalTo (NOT_FOUND)
    }

    "return a Not Found response for potentially dangerous requests" in new ApplaudioApp with ExternalDirectory {
      val response = await(request(s"/api/librarymanager/../$externalDirectoryName").get)
      response.status must be equalTo (NOT_FOUND)
    }

  }

  "Retrieving files" should {

    "return an 'OK' response for files in the library" in new ApplaudioApp with FileInLibrary {
      val response = await(request(s"/api/library/$filename").get)
      response.status must be equalTo (OK)
    }

    "return a 'Not Found' response for files outside of the library root" in new ApplaudioApp with ExternalFile {
      val response = await(request(s"/api/library/../$externalFileName").get)
      response.status must be equalTo (NOT_FOUND)
    }

  }
}


trait ExternalFile extends BeforeAndAfter {

  val externalFileName = "applaudio.txt"
  def externalFilePath(libraryRoot: String): String = s"$libraryRoot/../$externalFileName"

  override def before() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    val output:Output = Resource.fromFile(externalFilePath(libraryRoot))
    output.write("Written from Applaudio test")(Codec.UTF8)
  }
  override def after() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    new File(externalFilePath(libraryRoot)).delete()
  }
}

trait ExternalDirectory extends BeforeAndAfter {

  val externalDirectoryName = "applaudio_directory"
  def externalDirectory(libraryRoot: String): File = new File(s"$libraryRoot/../$externalDirectoryName")

  override def before() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    println("Making external Dir: " + externalDirectory(libraryRoot).mkdir())
  }
  override def after() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    externalDirectory(libraryRoot).delete()
  }
}

trait FileInLibrary extends BeforeAndAfter {

  val filename = "text.txt"
  def filePath(libraryRoot: String): String = s"$libraryRoot/$filename"

  override def before() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    println("Writing file to " + filePath(libraryRoot))
    val output: Output = Resource.fromFile(filePath(libraryRoot))
    output.write("text")(Codec.UTF8)
  }
  override def after() = {
    val libraryRoot = app.configuration.getString("library.root").getOrElse {
      throw new Exception("No library root in application configuration")
    }
    new File(filePath(libraryRoot)).delete()
  }
}