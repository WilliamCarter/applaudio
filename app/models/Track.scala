//package models
//
//import play.api.Play
//import play.api.libs.json.{Json, Writes}
//
//abstract trait File {
//  val path: String
//}
//
//object File {
//  def apply(file: java.io.File) = {
//    val libraryRoot = Play.current.configuration.getString("library.root").get
//    val path = file.getCanonicalPath.split(libraryRoot).last
//    if (file.isDirectory) Directory(path) else Track(path)
//  }
//}
//
//case class Directory(path: String) extends File {
//  val label = path.split('/').last
//}
//
//object Directory {
//  implicit val directoryWrites = new Writes[Directory] {
//    def writes(directory: Directory) = {
//      Json.obj("label" -> directory.label, "type" -> "directory")
//    }
//  }
//}
//
//case class Track(path: String) extends File {
//  def label = path.split('/').last.split('.').head
//  def fileType = path.split('.').last
//}
//
//object Track {
//  implicit val trackWrites = new Writes[Track] {
//    def writes(track: Track) = {
//      Json.obj(
//        "label" -> track.label,
//        "type" -> track.fileType,
//        "location" -> controllers.routes.Api.getMusicFile(track.path, "false").url,
//        "download" -> controllers.routes.Api.getMusicFile(track.path, "true").url
//      )
//    }
//  }
//}
