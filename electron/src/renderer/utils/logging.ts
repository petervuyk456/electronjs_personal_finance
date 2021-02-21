import ipc from 'rendererUtils/ipc'
import { ILogData, LogType } from 'sharedUtils/console'
import { ipcType } from 'sharedUtils/ipc'

export default class logger {
  //#region Log methods

  /**
   * Log a warning message to the console/log file
   * @param msg Message to log
   */
  public static warn(msg: string) {
    this.sendOverIpc({ type: LogType.warn, msg })
  }

  /**
   * Log an error message to the console/log file
   * @param msg Message to log
   */
  public static error(msg: string) {
    this.sendOverIpc({ type: LogType.error, msg })
  }

  /**
   * Log a success message to the console/log file
   * @param msg Message to log
   */
  public static success(msg: string) {
    this.sendOverIpc({ type: LogType.success, msg })
  }

  /**
   * Log an info message to the console/log file
   * @param msg Message to log
   */
  public static info(msg: string) {
    this.sendOverIpc({ type: LogType.info, msg })
  }

  /**
   * Log a debug message to the console/log file
   * @param msg Message to log
   */
  public static debug(msg: string) {
    this.sendOverIpc({ type: LogType.debug, msg })
  }

  //#endregion Log methods

  /**
   *
   * @param data
   */
  private static sendOverIpc(data: ILogData) {
    ipc.sendToMain(ipcType.log, data)
  }
}
