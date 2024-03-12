import { IS_ELECTRON, IS_IOS, isMaximized, setScreenType } from '@/utils/application'
import { onMounted, ref } from 'vue'

export const useAppActionBar = () => {
  const isShowWinActions = IS_ELECTRON && !IS_IOS

  const isMaximize = ref(false)

  function handleActionClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement
    const type = target.getAttribute('data-action-type')!
    setScreenType(type)
    if (type) {
      if (type === 'maximize') {
        isMaximize.value = false
      }
      if (type === 'unmaximize') {
        isMaximize.value = true
      }
    }
  }

  onMounted(async () => {
    if (isMaximized) {
      const flag = await isMaximized()
      isMaximize.value = flag
    }
  })

  return {
    isMaximize,
    isShowWinActions,
    handleActionClick,
  }
}