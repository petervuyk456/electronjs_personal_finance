/**
 * Build the mac application menu
 */
export const appMenu = () => ({
  role: 'appMenu',
})

/**
 * Build the file menu
 */
export const fileMenu = () => ({
  role: 'fileMenu',
})

/**
 * Build the developer menu
 */
export const devMenu = () => ({
  label: 'Developer',
  submenu: [
    { role: 'reload' },
    { role: 'forcereload' },
    { type: 'separator' },
    { role: 'toggledevtools' },
  ],
})
