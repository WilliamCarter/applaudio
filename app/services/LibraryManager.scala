package services

import java.io.File

import play.api.libs.Files.TemporaryFile
import play.api.mvc.MultipartFormData.FilePart
import play.api.mvc.RequestHeader
import play.api.{Logger, Play}


object LibraryManager {

  lazy val libraryRoot: String = Play.current.configuration.getString("library.root").get

  def getDirectoryListing(path: String)(implicit request: RequestHeader): Option[Array[String]] = {

    println("LibraryManager.getDirectoryListing(" + path + ")")

    getFile(path).flatMap { file =>
      if (!file.isDirectory) None else {
        val fileList = file.listFiles.filter { file =>
          // First filter out hidden files (filenames starting with a '.')
          file.getName.charAt(0) != '.'
        }.map {
          // Second, map list to filenames only.
          file => file.getName
        }
        println ("returning files " + fileList)
        Option(fileList)
      }
    }
  }

  def addDirectory(path: String, name: String): Boolean = {
    println("LibraryManager.addDirectory(" + path + ", " + name + ")")

    val newDirectoryParent = new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8"))

    // Check directory parent exists. Fail if it doesn't.
    if(!newDirectoryParent.exists) {
      println("File path doesn't exist")
      return false
    }

    // Create new Directory
    val newDirectory = new File(newDirectoryParent, name)
    if (newDirectory.exists)
      println("File " + newDirectory.getAbsolutePath + " already exists")
    else
      newDirectory.mkdir()

    return true

  }

  def uploadFiles(path: String, files: Seq[FilePart[TemporaryFile]]) = {
    files.foreach { filePart =>

      println("Uploading filePart " + path + filePart.filename)
      val newFile = new File(libraryRoot + path, filePart.filename)
      if (newFile.exists) {
        println("The file " + newFile.getAbsolutePath + " already exists. Upload cancelled.")
      } else {
        filePart.ref.moveTo(newFile)
      }
    }
  }

  def getFile(path: String)(implicit request: RequestHeader): Option[File] = {

    val file = new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8"))
    if (!file.exists) None
    else if (!file.getCanonicalPath.contains(libraryRoot)) {
      Logger.warn("Dangerous file access: " + request)
      None
    }
    else Some(file)
  }

}
