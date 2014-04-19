package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.{JsValue, Json}
import play.api.Play.current
import services.LibraryManager

object Api extends Controller {

  def getDirectoryListing(path: String) = Action {
    println("Getting directory listing for " + path);
    LibraryManager.getDirectoryListing(path) match {
      case Some(listing) => Ok (Json.obj ("listing" -> listing))
      case None => NotFound
    }
  }

  def addDirectory() = Action { request =>

    println("Api.addDirectory")

    request.body.asJson match {

      case Some(requestJson) => {
        println(requestJson.toString())

        val success = for {
          path <- requestJson.\("path").asOpt[String]
          name <- requestJson.\("name").asOpt[String]
        } yield LibraryManager.addDirectory(path, name)

        success match {
          case Some(result) => Ok (Json.obj ("success" -> success))
          case None => Ok (Json.obj ("success" -> false))
        }

      }

      case None => {
        println("No JSON object in request.")
        BadRequest
      }
    }

  }

  def removeDirectory() = Action {
    println("Api.removeDirectory")
    Ok("remove directory")
  }


  def upload = Action(parse.multipartFormData) { request =>

    println("Api.upload()")

    request.body.file("audio").map { audioFile =>
      val filename = audioFile.filename
      val contentType = audioFile.contentType
      println("User tried to upload " + filename + " of content type " + contentType)
      Ok("File uploaded")
    }.getOrElse {
      BadRequest
    }
  }

}