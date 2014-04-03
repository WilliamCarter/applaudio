package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import play.api.Play.current

object Api extends Controller {

  def listing(url: String) = Action {
    println("Getting directory listing for " + url);
    val directoryOption = Play.getExistingFile("public/music/" + java.net.URLDecoder.decode(url, "UTF-8"))
    directoryOption match {
      case Some(directory) => {
        if (directory.isDirectory)
          Ok (Json.obj ("listing" -> directory.listFiles.map{ file => file.getName}))
        else
          NotFound
      }
      case None => NotFound
    }
  }

}