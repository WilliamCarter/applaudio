package support

import org.specs2.execute.{AsResult, Result}
import play.api.Application
import play.api.libs.ws.WS
import play.api.test.WithServer

class ApplaudioApp() extends WithServer with BeforeAndAfter {

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

  val app: Application

  def before() = ()
  def after() = ()

}
