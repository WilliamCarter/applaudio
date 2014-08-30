package services

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import java.io.File
import play.api.mvc.MultipartFormData.FilePart
import play.api.libs.Files.TemporaryFile


object LibraryManager {

  lazy val libraryRoot: String = Play.current.configuration.getString("library.root").get

  def getDirectoryListing(path: String): Option[Array[String]] = {

    println("LibraryManager.getDirectoryListing(" + path + ")")

    val directory = new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8"))

    if (!directory.exists) {
      println("No such file: " + libraryRoot + path)
      None
    } else if (directory.isDirectory) {

      val fileList = directory.listFiles.filter { file =>
        // First filter out hidden files (filenames starting with a '.')
        file.getName.charAt(0) != '.'
      }.map {
        // Second, map list to filenames only.
        file => file.getName
      }
      println ("returning files " + fileList)
      Option(fileList)
    } else {
      None
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

  def removeDirectory(path: String) {

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

  def getFile(path: String) =
    controllers.ExternalAssets.at(libraryRoot, java.net.URLDecoder.decode(path, "UTF-8"))

}
