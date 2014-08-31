import play.api.test.PlaySpecification
import support.{AppConfig, ApplaudioApp}

class SpecSpec extends PlaySpecification {

  "Tests" should {
    "run with their own configuration" in new ApplaudioApp {
      AppConfig.getString("context") must be equalTo("test")
    }
  }

}
