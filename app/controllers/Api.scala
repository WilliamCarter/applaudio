package controllers

import java.io.File
import java.net.URLDecoder

import play.api.libs.json.{Writes, Json}
import play.api.mvc._
import services.LibraryManager
import utils.ConvertibleInt._

object Api extends Controller {

  val libraryManagerService = new LibraryManager

  def getDirectoryListing(path: String) = Action { implicit request =>
    println("Api.getDirectoryListing(" + path + ")")

    implicit val fileWrites = new Writes[File] {
      def writes(file: File) = {
        val fileType = if (file.isDirectory) "directory" else "file"
        Json.obj(
          "label" -> file.getName,
          "type" -> fileType)
      }
    }

    libraryManagerService.getDirectoryListing(java.net.URLDecoder.decode(path, "UTF-8")) match {
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
    } yield libraryManagerService.addDirectory(path, name)

    success match {
      case Some(result) => Ok (Json.obj ("success" -> success))
      case None => BadRequest
    }

  }

  def removeDirectory() = TODO


  def upload = Action(parse.multipartFormData) { request =>

    println("Api.upload()")

    val path: String = request.body.dataParts("path").head
    libraryManagerService.uploadFiles(path, request.body.files)

    Ok("Upload complete")

  }

  def getMusicFile(path: String, download: String) = Action { implicit request =>
    libraryManagerService.getFile(URLDecoder.decode(path, "UTF-8")) match {
      case Some(file) if (!file.isDirectory) => Ok.sendFile(file, inline=(download == "false"))
      case Some(file) if (file.isDirectory && download == "true") => Ok.sendFile(libraryManagerService.compress(file), inline=false)
      case _ => NotFound
    }
  }

}