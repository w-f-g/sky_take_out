export interface IElectronAPI {
  platform: NodeJS.Platform,
  isMaximized: () => Promise<boolean>,
  setScreenType: (type: string) => void,
  listenWinSizeChange: (cb: (flag: boolean) => void) => void,
}

declare global {
  interface Window {
    electron?: IElectronAPI
  }
}