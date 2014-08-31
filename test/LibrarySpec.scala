import java.io.File

import play.api.Application
import play.api.libs.json.JsValue
import play.api.test.PlaySpecification
import support.{ConfigExtractor, BeforeAndAfter, ApplaudioApp}

import scalax.io.{Codec, Output, Resource}

class LibrarySpec extends PlaySpecification {

  "Retrieving Directories" should {

    "return an OK response for valid requests" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/artists").get)
      response.status must be equalTo (OK)
    }

    "return a listing of directories" in new ApplaudioApp with ThreeArtists {
      val response = await(request("/api/librarymanager/artists").get)
      (response.json \ "listing").as[Seq[JsValue]].length should be greaterThanOrEqualTo (3)
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
    val output:Output = Resource.fromFile(externalFilePath(ConfigExtractor.getString("library.root")))
    output.write("Written from Applaudio test")(Codec.UTF8)
  }
  override def after() = {
    new File(externalFilePath(ConfigExtractor.getString("library.root"))).delete()
  }
}

trait ExternalDirectory extends BeforeAndAfter {

  val externalDirectoryName = "applaudio_directory"
  def externalDirectory(libraryRoot: String): File = new File(s"$libraryRoot/../$externalDirectoryName")

  override def before() = {
    externalDirectory(ConfigExtractor.getString("library.root")).mkdir()
  }
  override def after() = {
    externalDirectory(ConfigExtractor.getString("library.root")).delete()
  }
}

trait FileInLibrary extends BeforeAndAfter {

  val filename = "text.txt"
  def filePath(libraryRoot: String): String = s"$libraryRoot/$filename"

  override def before() = {
    val output: Output = Resource.fromFile(filePath(ConfigExtractor.getString("library.root")))
    output.write("text")(Codec.UTF8)
  }
  override def after() = {
    new File(filePath(ConfigExtractor.getString("library.root"))).delete()
  }
}

trait ThreeArtists extends BeforeAndAfter {

  val artists = Array("Aphex Twin", "Blur", "Catriona and the Waves")

  override def before() = {
    val artistsDirectory = new File(ConfigExtractor.getString("library.root"), "artists")
    artists.foreach { artist => new File(artistsDirectory, s"test_$artist").mkdir() }
  }

  override def after() = {
    val artistsDirectory = new File(ConfigExtractor.getString("library.root"), "artists")
    artists.foreach { artist => new File(artistsDirectory, s"test_$artist").delete() }
  }
}