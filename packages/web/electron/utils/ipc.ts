import { BrowserWindow, ipcMain } from 'electron'

export const mainIPC = (win: BrowserWindow) => {
  // 判断是否是满屏状态
  ipcMain.handle('get_is_maximized', () => win.isMaximized())

  const handleSizeChange = () => {
    win.webContents.send('win_size_change', win.isMaximized())
  }
  win.on('maximize', handleSizeChange)
  win.on('unmaximize', handleSizeChange)

  const operation = {
    more: () => {
      win.webContents.openDevTools()
    },
    minimize: () => {
      win.focus()
      win.minimize()
    },
    unmaximize: () => {
      win.unmaximize()
    },
    maximize: () => {
       win.maximize()
    },
    close: () => {
      win.hide()
    },
  }
  ipcMain.on('detach:service', (_, data: Record<'type', keyof typeof operation>) => {
    operation[data.type]()
  })
}