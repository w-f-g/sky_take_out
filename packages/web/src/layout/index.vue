<template>
  <div class="layout">
    <Header />
    <main class="page-main">
      <SideBar />
      <section :class="['wrapper', !opened && 'is-collapsed']">
        <RouterView v-slot="{ Component }">
          <Transition
            mode="out-in"
            name="page-fade"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
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
  .page-main {
    height: calc(100vh - 60px);
    margin-top: 60px;
    overflow-y: auto;
    .wrapper {
      padding: 20px;
      margin-left: 190px;
      transition: margin-left .28s;
      &.is-collapsed {
        margin-left: 80px;
      }
    }
  }
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.6s, transform 0.4s;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>