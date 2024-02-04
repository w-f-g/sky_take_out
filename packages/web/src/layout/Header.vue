<template>
  <header class="sky-header flex">
    <section class="flex">
      <div :class="['logo-view', opened && 'is-opened']">
        <img 
          alt="logo"
          :class="['logo', opened && 'is-opened']"
          :src="opened ? logoPng : miniLogoPng" 
        >
      </div>
      <div
        @click="toggleSideBar"
        class="flex items-center cursor-pointer pl-5 pr-3"
      >
        <MenuFoldOutlined class="icon" v-if="opened" />
        <MenuUnfoldOutlined class="icon" v-else />
      </div>
    </section>
    <NavBar />
  </header>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useSidebar } from '@/hooks/sidebar'
import logoPng from '@/assets/login/logo.png'
import miniLogoPng from '@/assets/login/mini-logo.png'
import NavBar from './NavBar.vue'

const { opened, toggleSideBar } = useSidebar()

defineOptions({
  name: 'SkyHeader'
})
</script>

<style lang="scss" scoped>
.sky-header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #ffc100;
  .logo-view {
    width: 80px;
    text-align: center;
    background-color: #ffc100;
    padding: 15px 0 0;
    height: 60px;
    transition: width .28s;
    &.is-opened {
      width: 190px;
    }
    .logo {
      width: 30px;
      height: 30px;
      display: inline-block;
      &.is-opened {
        width: 120px;
        height: 31px;
      }
    }
  }
  .icon {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
</style>