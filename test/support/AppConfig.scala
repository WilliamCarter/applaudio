package support

import play.api.Application

object AppConfig {

  def getString(key: String)(implicit app: Application): String = {
    app.configuration.getString(key).getOrElse {
      throw new Exception(s"Configuration does not contain a string with key '$key'")
    }
  }
}
