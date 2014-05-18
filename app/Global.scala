import com.typesafe.config.ConfigFactory
import java.io.File
import play.api._

object Global extends GlobalSettings {

  override def onStart(application: Application): Unit = {

    val libraryRoot = new File(application.configuration.getString("library.root").get)
    Logger.info("Library base path: " + libraryRoot)

    if (!libraryRoot.exists) {
      Logger.info("Initialising library base directory.")

      val initialisationSuccess = libraryRoot.mkdir()
      if (!initialisationSuccess) {
        Logger.error("Could not create base directory. Perhaps the containing folder does not exist or there are issues with permissions.")
        Logger.error("Application shutting down because what's the point?")
        System.exit(1)
      }

      Logger.info("new directory: " + new File(libraryRoot, "artists").mkdir())
    }
  }


  override def onLoadConfig(defaultConfiguration: Configuration, path: File, classloader: ClassLoader, mode: Mode.Mode): Configuration = {

    val configuration = if (mode == Mode.Dev) {
      Logger.info("Using development configuration")
      defaultConfiguration ++ Configuration(ConfigFactory.load("applaudio.dev.conf"))
    } else {
      defaultConfiguration
    }

    super.onLoadConfig(configuration, path, classloader, mode)

  }

}
