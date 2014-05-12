package controllers

import play.api._
import play.api.mvc._
import play.Logger

object StaticResources extends Controller {

  lazy val resourceGetter: (String => Action[AnyContent]) = {
    Logger.info("Defining resource getter function for mode " + Play.current.mode)
    if (play.Play.isProd) {
      filename: String => {
        Logger.info("fetching asset from /public")
        controllers.Assets.at(path="/public", filename)
      }
    } else {
      filename: String => {
        Logger.info("fetching asset from /frontend/app")
        controllers.ExternalAssets.at(rootPath="frontend/app", filename)
      }
    }
  }

  def at(filename: String): Action[AnyContent] = resourceGetter(filename)

}
