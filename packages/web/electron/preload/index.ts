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
  } as IElectronAPI,
)