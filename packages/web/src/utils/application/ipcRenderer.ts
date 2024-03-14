export const isMaximized = window.electron?.isMaximized

export const setScreenType = (type: string) => {
  if (window.electron) {
    window.electron.setScreenType(type)
  }
}

export const listenWinSizeChange = window.electron?.listenWinSizeChange