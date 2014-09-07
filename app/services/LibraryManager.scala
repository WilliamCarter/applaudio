package services

import java.io._
import java.util.zip.{ZipEntry, ZipOutputStream}

import play.api.libs.Files.TemporaryFile
import play.api.mvc.MultipartFormData.FilePart
import play.api.{Logger, Play}

import scala.io.Source

class LibraryManager {

  lazy val libraryRoot: String = Play.current.configuration.getString("library.root").get

  def getDirectoryListing(path: String): Option[List[File]] = {

    println("LibraryManager.getDirectoryListing(" + path + ")")

    getFile(path).flatMap { file =>
      if (!file.isDirectory) None
      else Option(file.listFiles.toList.filterNot(_.getName.startsWith(".")))
    }
  }

  def addDirectory(path: String, name: String): Boolean = {
    println("LibraryManager.addDirectory(" + path + ", " + name + ")")

    val newDirectoryParent = new File(libraryRoot + java.net.URLDecoder.decode(path, "UTF-8"))

    // Check directory parent exists. Fail if it doesn't.
    if(!newDirectoryParent.exists) {
      println("File path doesn't exist")
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

  def uploadFiles(path: String, files: Seq[FilePart[TemporaryFile]]) = {

    getFile(path) match {
      case Some(directory) => {
        files.foreach { filePart =>
          println(s"Uploading filePart $path/${filePart.filename}")
          val newFile = new File(directory, filePart.filename)
          newFile.setExecutable(false)
          if (newFile.exists) Logger.info("The file " + newFile.getAbsolutePath + " already exists. Upload cancelled.")
          else filePart.ref.moveTo(newFile)
        }
        invalidateZippedDirectory(directory)
      }
      case None => Logger.warn(s"Enclosing directory ($path) doesn't exist. File Upload cancelled")
    }

  }

  def getFile(path: String): Option[File] = {

    val file = new File(libraryRoot + path)
    if (!isInApplaudioLibrary(file)) {
      Logger.warn(s"Dangerous file access: $path")
      None
    }
    else if (!file.exists) None
    else Some(file)
  }

  def isInApplaudioLibrary(file: File): Boolean = file.getCanonicalPath.contains(libraryRoot)


  def compress(directory: File): File = {
    println(s"compress(${directory.getAbsolutePath})")
    val compressed = zipFileForDirectory(directory)
    if (compressed.exists) compressed
    else zipTracks(compressed.getAbsolutePath, directory.listFiles.toList)
  }


  private[this] def zipTracks(out: String, files: List[File]): File = {

    val zip = new ZipOutputStream(new FileOutputStream(out))

    val tracks: List[File] = files.filter(_.isFile).isEmpty match {
      case true => List(new File("conf/empty.txt"))
      case false => files.filter(_.isFile)
    }

    tracks.foreach { file =>
      zip.putNextEntry(new ZipEntry(file.getName))
      val in = new BufferedInputStream(new FileInputStream(file.getAbsoluteFile))
      var b = in.read()
      while (b > -1) {
        zip.write(b)
        b = in.read()
      }
      in.close()
      zip.closeEntry()
    }

    zip.close()

    new File(out)
  }

  private[this] def zipFileForDirectory(directory: File): File = {
    new File(s"${directory.getAbsolutePath}.zip")
  }

  private[this] def invalidateZippedDirectory(directory: File): Unit = {
    zipFileForDirectory(directory).delete()
  }

}
