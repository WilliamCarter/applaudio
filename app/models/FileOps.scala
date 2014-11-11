package models

import java.io.File
import java.net.URLEncoder

import play.api.Play
import play.api.libs.json.{Json, Writes}

trait FileOps {

  implicit val writes = new Writes[File] {
    def writes(file: File) = {
      if (file.isDirectory)
        Json.obj(
          "label" -> FileOps.label(file),
          "type" -> "directory")
      else
        Json.obj(
          "label" -> FileOps.label(file),
          "type" -> FileOps.extension(file),
          "location" -> controllers.routes.Api.getMusicFile(FileOps.encodedPathFromLibrary(file), "false").url,
          "download" -> controllers.routes.Api.getMusicFile(FileOps.encodedPathFromLibrary(file), "true").url)
    }
  }

}

object FileOps {

  lazy val libraryRoot = Play.current.configuration.getString("library.root").get

  def label(file: File): String = {
    val filename = file.getAbsolutePath.split('/').last
    if (file.isDirectory) filename else filename.substring(0, filename.lastIndexOf('.'))
  }
  def extension(file: File): String = file.getAbsolutePath.split('.').last
  def pathFromLibrary(file: File, libraryRoot: String = libraryRoot): String = file.getCanonicalPath.split(libraryRoot).last
  def encodedPathFromLibrary(file: File): String = URLEncoder.encode(pathFromLibrary(file), "UTF-8")

}