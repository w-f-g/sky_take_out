import { contextBridge, ipcRenderer } from 'electron'
import type { IElectronAPI } from '../type'

contextBridge.exposeInMainWorld(
  'electron',
  {
    platform: process.platform,
    isMaximized: () => ipcRenderer.invoke('get_is_maximized'),
    setScreenType: (type: string) => {
      ipcRenderer.send('detach:service', { type })
    },
    listenWinSizeChange: (cb) => {
      ipcRenderer.on('win_size_change', (_, data) => {
        cb(data)
      })
    }
  } as IElectronAPI,
)

const excludes = ['r', 'R', '0', '+', '-', 'w', 'm']
window.addEventListener('keydown', e => {
  if (e.ctrlKey && process.env.NODE_ENV !== 'development') {
    console.log(e.key)
    const flag = excludes.indexOf(e.key) >= 0
    if (flag) {
      e.preventDefault()
    }
  }
})