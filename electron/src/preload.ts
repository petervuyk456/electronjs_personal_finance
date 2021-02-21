import { LogType } from 'sharedUtils/console'
import { IipcData, ipcType } from 'shared/utils/ipc'
const { ipcRenderer } = require('electron')

ipcRenderer.send(ipcType.log, {
  type: LogType.info,
  msg: 'Running preload script',
})

process.once('loaded', () => {
  // Convert post office messages to ipc messages
  window.addEventListener('message', event => {
    const e: Event & { data?: IipcData } = event

    // For security reasons, verify data uses one of our custom ipc channels
    if (e.data?.type && Object.values(ipcType).includes(e.data.type)) {
      ipcRenderer.send(e.data.type, e.data.data)
    }
  })
})
