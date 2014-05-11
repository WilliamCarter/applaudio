import sbt._

object ApplicationBuild extends Build {

  println("Build file is executed")

  val appName = "applaudio"
  val appVersion = "0.0.1"
  val appDependencies = Seq(
    "org.scalatest" % "scalatest_2.10" % "2.0" % "test"
  )

  play.Project(appName, appVersion, appDependencies)

}