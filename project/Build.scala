import sbt._

object ApplicationBuild extends Build {

  val appName = "applaudio"
  val appVersion = "1.0.0"
  val appDependencies = Seq(
    "org.scalatest" % "scalatest_2.10" % "2.0" % "test"
  )

  play.Project(appName, appVersion, appDependencies)

}