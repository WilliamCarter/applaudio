package controllers

import play.api.mvc._

object Application extends Controller{

  def test(url: String) = Action {
    Ok("Given URL: " + url)
  }
}
