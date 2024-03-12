import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const sidebar = reactive({
    opened: true,
  })
  const updateSidebarOpened = (flag: boolean) => {
    sidebar.opened = flag
  }
  return {
    sidebar,
    updateSidebarOpened,
  }
})