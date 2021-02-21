import { IipcData, ipcType } from 'shared/utils/ipc'

export default class ipc {
  /**
   * Posts a 'ipcMessage' request to the window
   * @param ipcType
   * @param msg
   */
  public static sendToMain(ipcType: ipcType, data: any) {
    const msg: IipcData = {
      type: ipcType,
      data,
    }

    window.postMessage(msg, '*')
  }
}
