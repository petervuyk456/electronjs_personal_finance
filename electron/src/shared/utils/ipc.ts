export enum ipcType {
  log = 'log',
}

export interface IipcData {
  type: ipcType
  data: any
}
