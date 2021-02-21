import { ipcMain as ipc } from 'electron'
import { ILogData } from 'sharedUtils/console'
import { ipcType } from 'sharedUtils/ipc'
import logger from 'mainUtils/logging'

export function addIpcHandlers() {
  // Log messages
  ipc.on(ipcType.log, (event, args: ILogData) => logger.logRendererMsg(args))
}
