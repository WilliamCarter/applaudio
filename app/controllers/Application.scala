package controllers

import play.api.mvc._

/**
 * Created by cartew01 on 21/03/2014.
 */
object Application extends Controller{

  def test(url: String) = Action {
    Ok("Given URL: " + url)
  }
}
