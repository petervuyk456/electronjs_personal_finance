import log from 'electron-log'
import { color, ILogData, LogType } from 'sharedUtils/console'

export default class logger {
  //#region Log methods

  /**
   * Log a warning message to the console/log file
   * @param msg Message to log
   */
  public static warn(msg: string) {
    log.warn(this.colorText(msg, color.yellow))
  }

  /**
   * Log an error message to the console/log file
   * @param msg Message to log
   */
  public static error(msg: string) {
    log.error(this.colorText(msg, color.red))
  }

  /**
   * Log a success message to the console/log file
   * @param msg Message to log
   */
  public static success(msg: string) {
    log.info(this.colorText(msg, color.green))
  }

  /**
   * Log an info message to the console/log file
   * @param msg Message to log
   */
  public static info(msg: string) {
    log.info(msg)
  }

  /**
   * Log a debug message to the console/log file
   * @param msg Message to log
   */
  public static debug(msg: string) {
    log.debug(this.colorText(msg, color.blue))
  }

  //#endregion Log methods

  /**
   * Log messages recieved from the renderer
   * @param data Log message and other related data
   */
  public static logRendererMsg(data: ILogData) {
    // Error check
    if (!data || !data.msg) {
      this.warn('Invalid log message recieved from renderer')
      console.log(data)
      return
    }

    // Call appropriate log function for the given data
    switch (data.type) {
      case LogType.error:
        this.error(data.msg)
        break
      case LogType.warn:
        this.warn(data.msg)
        break
      case LogType.success:
        this.success(data.msg)
        break
      case LogType.debug:
        this.debug(data.msg)
        break
      default:
        this.info(data.msg)
        break
    }
  }

  /**
   * Add color values to a string
   * @param text Original string to color
   * @param textColor Color to apply
   */
  private static colorText(text: string, textColor: color): string {
    return textColor + text + color.reset
  }
}
