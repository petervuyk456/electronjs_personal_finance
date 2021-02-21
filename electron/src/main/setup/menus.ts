import { MenuItemConstructorOptions } from 'electron'

/**
 * Build the mac application menu
 */
export const addAppMenu = (menuConfig: MenuItemConstructorOptions[]) => {
  menuConfig.push({
    role: 'appMenu',
  })
}

/**
 * Build the file menu
 */
export const addFileMenu = (menuConfig: MenuItemConstructorOptions[]) => {
  menuConfig.push({
    role: 'fileMenu',
  })
}

/**
 * Build the developer menu
 */
export const addDevMenu = (menuConfig: MenuItemConstructorOptions[]) => {
  menuConfig.push({
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'toggleDevTools' },
    ],
  })
}
