package models

import java.io.File

import org.scalatest.{Matchers, WordSpecLike}
import org.specs2.mock._

class FileOpsTest extends WordSpecLike with Matchers with Mockito {

  "The FileOps support object" should {

    "get the correct label for a directory" in new TestFileOps {
      FileOps.label(directory) should be ("Derrick L. Carter")
    }

    "get the correct label for a file" in new TestFileOps {
      FileOps.label(file) should be ("Where You At?")
    }

    "get the filename extension from a file" in new TestFileOps {
      FileOps.extension(file) should be ("mp3")
    }

    "get the relative path of a file from the Applaudio library root" in new TestFileOps {
      FileOps.pathFromLibrary(file, libraryRoot) should be ("artists/Derrick L. Carter/Where You At?.mp3")
    }

  }

  trait TestFileOps {

    val libraryRoot = "/applaudio_library/"

    // Mocking the method arguments feels dirty but unfortunately you cannot have a file that is a directory and that doesn't exist.
    val directory = mock[java.io.File]
    directory.isDirectory returns true
    directory.getAbsolutePath returns "/applaudio_library/artists/Derrick L. Carter/"

    val file = new File("/applaudio_library/artists/Derrick L. Carter/Where You At?.mp3")

  }

}
