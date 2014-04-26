package controllers

import play.api.mvc._
import play.api.libs.json.Json
import services.LibraryManager
import utils.ConvertibleInt._
import java.io.File

object Api extends Controller {

  def getDirectoryListing(path: String) = Action {
    println("Api.getDirectoryListing(" + path+ ")")
    LibraryManager.getDirectoryListing(path) match {
      case Some(listing) => Ok (Json.obj ("listing" -> listing))
      case None => NotFound
    }
  }

  def addDirectory() = Action(parse.json(maxLength = 2 kilobytes)) { request =>

    println("Api.addDirectory")
//    println(request.body.toString())

    val success = for {
      path <- request.body.\("path").asOpt[String]
      name <- request.body.\("name").asOpt[String]
    } yield LibraryManager.addDirectory(path, name)

    success match {
      case Some(result) => Ok (Json.obj ("success" -> success))
      case None => Ok (Json.obj ("success" -> false))
    }

  }

  def removeDirectory() = Action {
    println("Api.removeDirectory")
    Ok("remove directory")
  }


  def upload = Action(parse.multipartFormData) { request =>

    println("Api.upload()")

    val path: String = request.body.dataParts("path").head
    LibraryManager.uploadFiles(path, request.body.files)

    Ok("Upload complete")

  }

}