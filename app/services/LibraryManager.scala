package services

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import java.io.File


object LibraryManager {

  val libraryRoot: String = Play.configuration.getString("library.root").get;

  def getDirectoryListing(path: String): Option[Array[String]] = {

    println("LibraryManager.getDirectoryListing(" + path + ")")

    val directory = Option(new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8")))
    directory match {

      case Some(directory) =>
        if (directory.isDirectory) {
          val fileList = directory.listFiles.map { file => file.getName }
          println ("returning files " + fileList)
          Option(fileList)
        } else {
          None // return music file?
        }

      case None =>
        println("No such file: " + libraryRoot + path)
        None
    }

  }

  def addDirectory(path: String, name: String): Boolean = {
    println("LibraryManager.addDirectory(" + path + ", " + name + ")")

    val newDirectoryParent = new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8"))

    // Check directory parent exists. Fail if it doesn't.
    if(!newDirectoryParent.exists) {
      println("File path doesn't exist. WTF!?")
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

}