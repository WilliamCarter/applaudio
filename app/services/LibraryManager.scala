package services

import java.io.File

import play.api.libs.Files.TemporaryFile
import play.api.mvc.MultipartFormData.FilePart
import play.api.{Logger, Play}


object LibraryManager {

  lazy val libraryRoot: String = Play.current.configuration.getString("library.root").get

  def getDirectoryListing(path: String): Option[Array[String]] = {

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

    getFile(path) match {
      case Some(directory) => {
        files.foreach { filePart =>
          println(s"Uploading filePart $path/${filePart.filename}")
          val newFile = new File(directory, filePart.filename)
          newFile.setExecutable(false)
          if (newFile.exists) Logger.info("The file " + newFile.getAbsolutePath + " already exists. Upload cancelled.")
          else filePart.ref.moveTo(newFile)
        }
      }
      case None => Logger.warn(s"Enclosing directory ($path) doesn't exist. File Upload cancelled")
    }

  }

  def getFile(path: String): Option[File] = {

    val file = new File(libraryRoot + path)
    if (!isInApplaudioLibrary(file)) {
      Logger.warn(s"Dangerous file access: $path")
      None
    }
    else if (!file.exists) None
    else Some(file)
  }

  def isInApplaudioLibrary(file: File): Boolean = file.getCanonicalPath.contains(libraryRoot)

}
