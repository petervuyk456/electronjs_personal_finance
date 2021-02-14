import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import log from '../utils/logging'
import installExtension, {
  ExtensionReference,
} from 'electron-devtools-installer'
import { appMenu, devMenu, fileMenu } from './menus'

export enum platform {
  unknown = 0,
  windows,
  mac,
  linux,
}

export interface cmdArgData {
  isDev: boolean
}

// Determine which platform we're running on
export function getPlatform(): platform {
  switch (process.platform) {
    case 'win32':
      return platform.windows
    case 'darwin':
      return platform.mac
    case 'linux':
      return platform.linux
  }
  return platform.unknown
}

// Process command line arguments
export function processCmdArgs(): cmdArgData {
  // Set defaults
  const data = {
    isDev: false,
  }
  // process cmd args
  for (const arg of process.argv) {
    switch (arg.toLowerCase()) {
      case '--dev':
        data.isDev = true
        break
    }
  }

  return data
}

/**
 * Install a chromium extension
 * @param tool
 */
export function installChromiumExt(tool: ExtensionReference) {
  installExtension(tool)
    .then((name: string) => log.success(`Added Extension:  ${name}`))
    .catch((err: any) => log.warn(`An error occurred: ${err}`))
}

/**
 * Build toolbar menu configuration options
 * @param sysPlatform Which system platform we're running
 * @param isDev Flag to indicate whether we're in development mode
 */
export function buildMenuConfig(
  sysPlatform: platform,
  isDev: boolean
): MenuItemConstructorOptions[] {
  return [
    // Add app menu on Macs
    sysPlatform === platform.mac ? appMenu() : null,
    // Always add file menu
    fileMenu(),
    // Add dev menu in dev mode
    isDev ? devMenu() : null,
  ] as MenuItemConstructorOptions[]
}

/**
 * Create a new window
 * @param url url to load into the window
 * @param options Electron load url options
 * @param [isDev] Flag to indicate whether we're in development mode
 * @param [devToolsWidth] Width to use for the chrome dev tools
 */
export function createWindow(
  url: string,
  options?: Electron.LoadURLOptions,
  isDev: boolean = false,
  devToolsWidth: number = 0
): BrowserWindow {
  // Create the browser window and load the url
  const window = new BrowserWindow({
    height: 600,
    width: 500 + devToolsWidth,
    show: false,
    backgroundColor: 'white',
  })
  window.loadURL(url, options)

  // Open the DevTools
  if (isDev) {
    window.webContents.openDevTools()
  }

  // Show window once it has loaded
  window.once('ready-to-show', () => {
    window.show()
  })

  log.info('New window created')

  return window
}

/**
 * Set default dev tools size in user preferences so app window size exactly matches what we'd see in production
 * @param width Default width for our chrome devtools
 */
export function setDevToolsDefaultWidth(width: number): void {
  // Get user devtools preferences
  const userDataPath = app.getPath('userData')
  const prefPath = path.join(userDataPath, 'Preferences')
  const prefs = JSON.parse(fs.readFileSync(prefPath, 'utf-8'))
  // Append devtools size to the existing preferences
  prefs.electron.devtools = {
    ...(prefs.electron.devtools || {}),
    preferences: {
      ...((prefs.electron.devtools || {}).preferences || {}),
      'InspectorView.splitViewState': JSON.stringify({
        // Seems like vertical and horizontal size are switched
        // This should set the width
        vertical: { size: width },
      }),
    },
  }
  fs.writeFileSync(prefPath, JSON.stringify(prefs))
}
