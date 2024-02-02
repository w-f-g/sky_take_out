<template>
  <div class="layout">
    <Header />
    <main>
      <SideBar />
      <section :class="['wrapper', !opened && 'is-collapsed']">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './Header.vue'
import SideBar from './SideBar.vue'
import { useSidebar } from '@/hooks/sidebar'

const { opened } = useSidebar()
defineOptions({
  name: 'AppLayout'
})
</script>

<style lang="scss" scoped>
.layout {
  .wrapper {
    padding: 20px;
    margin-left: 190px;
    transition: margin-left .28s;
    &.is-collapsed {
      margin-left: 80px;
    }
  }
}
</style>