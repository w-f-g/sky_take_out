import { useLayoutStore } from '@/stores/layout'
import { toRefs } from 'vue'

export const useSidebar = () => {
  const layoutStore = useLayoutStore()
  const { updateSidebarOpened, sidebar } = layoutStore
  const toggleSideBar = () => updateSidebarOpened(!sidebar.opened)
  return {
    ...toRefs(sidebar),
    toggleSideBar,
    updateSidebarOpened,
  }
}