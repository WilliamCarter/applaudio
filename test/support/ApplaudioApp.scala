package support

import play.api.libs.ws.WS
import play.api.test.WithServer

class ApplaudioApp extends WithServer {

  def request(path: String) = WS.url(s"http://localhost:$port$path")
}
