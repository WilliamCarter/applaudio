import sbt.Keys._
import sbt._

object ApplicationBuild extends Build {

  println("Loading build")

  val appName = "applaudio"
  val appVersion = "1.0.0"
  val appDependencies = Seq(
    "org.scalatest" % "scalatest_2.10" % "2.0" % "test"
  )

  val main = play.Project(appName, appVersion, appDependencies)
    .settings(play.Project.defaultScalaSettings:_*)

}