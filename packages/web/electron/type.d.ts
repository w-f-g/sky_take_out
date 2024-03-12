export interface IElectronAPI {
  platform: NodeJS.Platform,
  isMaximized: () => Promise<boolean>,
  setScreenType: (type: string) => void,
}

declare global {
  interface Window {
    electron?: IElectronAPI
  }
}