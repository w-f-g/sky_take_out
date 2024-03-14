import { IS_ELECTRON, IS_IOS, isMaximized, listenWinSizeChange, setScreenType } from '@/utils/application'
import { onMounted, ref } from 'vue'

export const useAppActionBar = () => {
  const isShowWinActions = IS_ELECTRON && !IS_IOS

  const isMaximize = ref(false)

  function handleActionClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement
    const type = target.getAttribute('data-action-type')!
    setScreenType(type)
  }

  onMounted(async () => {
    if (isMaximized) {
      const flag = await isMaximized()
      isMaximize.value = flag
    }
    if (listenWinSizeChange) {
      listenWinSizeChange((flag) => {
        isMaximize.value = flag
      })
    }
  })

  return {
    isMaximize,
    isShowWinActions,
    handleActionClick,
  }
}