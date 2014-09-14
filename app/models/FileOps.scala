package models

import java.io.File
import java.net.URLEncoder

import play.api.Play
import play.api.libs.json.{Json, Writes}

object FileOps {

  implicit val writes = new Writes[File] {
    def writes(file: File) = {
      if (file.isDirectory)
        Json.obj(
          "label" -> label(file),
          "type" -> "directory")
      else
        Json.obj(
          "label" -> label(file),
          "type" -> extension(file),
          "location" -> controllers.routes.Api.getMusicFile(encodedPathFromLibrary(file), "false").url,
          "download" -> controllers.routes.Api.getMusicFile(encodedPathFromLibrary(file), "true").url)
    }
  }

  private[this] def label(file: File): String = file.getAbsolutePath.split('/').last.split('.').head
  private[this] def extension(file: File): String = file.getAbsolutePath.split('.').last
  private[this] def pathFromLibrary(file: File): String = {
    val libraryRoot = Play.current.configuration.getString("library.root").get
    file.getCanonicalPath.split(libraryRoot).last
  }
  private[this] def encodedPathFromLibrary(file: File): String = URLEncoder.encode(pathFromLibrary(file), "UTF-8")

}
