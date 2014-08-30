import play.api.libs.ws.WS
import play.api.test.{PlaySpecification, WithServer}
import support.ApplaudioApp

class LibrarySpec extends PlaySpecification {

  "Applaudio Library" should {

    "return an OK response for valid requests" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/artists").get)
      response.status must be equalTo (OK)
    }

    "return an Not Found response for valid requests for missing content" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/artists/Aqua").get)
      response.status must be equalTo (NOT_FOUND)
    }

    "return a Not Found response for potentially dangerous requests" in new ApplaudioApp {
      val response = await(request("/api/librarymanager/../../etc").get)
      response.status must be equalTo (NOT_FOUND)
    }

  }
}
