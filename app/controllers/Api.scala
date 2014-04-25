package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.{JsValue, Json}
import play.api.Play.current
import services.LibraryManager
import java.io.File

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

    println(request.body.asFormUrlEncoded)

    val path = request.body.asFormUrlEncoded.get("path").getOrElse{ BadRequest }
    println(path)

    request.body.file("audio").map { audioFile =>
      println(audioFile)
      val filename = audioFile.filename
      val contentType = audioFile.contentType
      println("User trying to upload " + filename + " of content type " + contentType)
      audioFile.ref.moveTo(new File("/tmp/picture.mp3"))
      Ok("File uploaded")
    }.getOrElse {
      BadRequest
    }


  }

}