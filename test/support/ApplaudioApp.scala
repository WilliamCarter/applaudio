package support

import java.io.File

import com.typesafe.config.ConfigFactory
import org.specs2.execute.{AsResult, Result}
import play.api.{Configuration, Application}
import play.api.libs.ws.WS
import play.api.test.{Helpers, FakeApplication, WithServer}

class ApplaudioApp extends WithServer(FakeApplication(new File("test")), Helpers.testServerPort) with BeforeAndAfter {

  def request(path: String) = WS.url(s"http://localhost:$port$path")

  override def around[T: AsResult](t: => T): Result = {

    try {
      println("do before")
      before()
      super.around(t)
    } finally {
      after()
    }
  }

}

trait BeforeAndAfter {
  // Application is not running when before() and after() are executed.
  // You can, however, retrieve the application configuration BEFORE Global.onLoadConfig() has been run.

  implicit val app: Application

  def before() = ()
  def after() = ()

}
