package services

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import java.io.File


object LibraryManager {

  def getDirectoryListing(path: String): Option[Array[String]] = {

    println("LibraryManager.getDirectoryListing(" + path + ")")
    Play.getExistingFile("public/music/" + java.net.URLDecoder.decode(path, "UTF-8")) match {

      case Some(directory) =>
        if (directory.isDirectory) {
          val fileList = directory.listFiles.map { file => file.getName }
          println ("returning files " + fileList)
          Option(fileList)
        } else {
          None // return music file?
        }

      case None =>
        println("No such file: public/music/" + path)
        None
    }

  }

  def addDirectory(path: String, name: String): Boolean = {
    println("LibraryManager.addDirectory(" + path + ", " + name + ")")
    Play.getExistingFile("public/music/" + path) match {

      case Some (directory) =>
        if (directory.isDirectory) {
          new File(directory, name).mkdir()
        } else {
          false
        }

      case None => false
    }
  }

  def removeDirectory(path: String) {

  }

}