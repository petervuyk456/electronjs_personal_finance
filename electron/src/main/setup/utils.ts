import { BrowserWindow, MenuItemConstructorOptions } from "electron"
import log from '../utils/logging'
import installExtension, { ExtensionReference } from 'electron-devtools-installer';

export enum platform{
  unknown = 0,
  windows,
  mac,
  linux
}

export interface cmdArgData{
  isDev: boolean
}

// Determine which platform we're running on
export function getPlatform(): platform {
  switch (process.platform)
  {
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
    isDev: false
  }
  // process cmd args
  for (const arg of process.argv) {
    switch (arg.toLowerCase()){
      case '--dev':
        data.isDev = true
        break;
    }
  }

  return data
}

export function installDevTool(tool: ExtensionReference) {
  installExtension(tool)
      .then((name: string) => log.success(`Added Extension:  ${name}`))
      .catch((err: any) => log.warn(`An error occurred: ${err}`));
}

/**
 * Build toolbar menu configuration options
 * @param sysPlatform Which system platform we're running
 * @param isDev Flag to indicate whether we're in development mode
 */
export function buildMenuConfig(sysPlatform: platform, isDev: boolean): MenuItemConstructorOptions[]{
  return [
    // Application menu for mac
    ...(sysPlatform === platform.mac ? [{ role: 'appMenu' }] : []),
    // File Menu
    {
      role: 'fileMenu',
    },
    // Development menu
    ...(isDev
      ? [
          {
            label: 'Developer',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              { type: 'separator' },
              { role: 'toggledevtools' },
            ],
          },
        ]
      : []),
  ] as MenuItemConstructorOptions[]
}

/**
 * Create a new window
 * @param url url to load into the window
 * @param options Electron load url options
 * @param [isDev] Flag to indicate whether we're in development mode
 * @param [devToolsWidth] Width to use for the chrome dev tools
 */
export function createWindow(url: string, options?: Electron.LoadURLOptions,isDev: boolean = false, devToolsWidth: number = 0): BrowserWindow {
  // Create the browser window.
  const window = new BrowserWindow({
    height: 600,
    width: 500 + devToolsWidth,
    show: false,
    backgroundColor: "white",
  });

  // and load the index.html of the app.
  window.loadURL(url, options);

  // Open the DevTools
  if (isDev) {
    window.webContents.openDevTools()
  }

  // Show window once it has loaded
  window.once('ready-to-show', () => {
    window.show()
  })

  log.info("New window created")

  return window
}