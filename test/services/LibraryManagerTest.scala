package services

import java.io.File

import org.scalatest._

class LibraryManagerTest extends WordSpecLike with Matchers with PrivateMethodTester {

  val libraryManagerService = new LibraryManager

  "The Library Manager Service" should {

    "get the correct zip file for a given directory" in {
      val directory = new File("/library/artists/The Beatles/")
      val zipFileForDirectory = PrivateMethod[File]('zipFileForDirectory)
      val zipFile = libraryManagerService invokePrivate zipFileForDirectory(directory)
      zipFile.getAbsolutePath should be ("/library/artists/The Beatles.zip")
    }

  }
}
