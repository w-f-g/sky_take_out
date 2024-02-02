<template>
  <div :class="['sidebar-view', isCollapsed && 'is-collapsed']">
    <Menu
      theme="dark"
      mode="inline"
      :inline-collapsed="isCollapsed"
      :items="menuItems"
      @select="handleMenuSelect"
      :selected-keys="selectedKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { Menu, type ItemType } from 'ant-design-vue'
import adminRoutes from '@/router/admin'
import { computed, h } from 'vue'
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { useRoute, useRouter } from 'vue-router'
import { useSidebar } from '@/hooks/sidebar'

const route = useRoute()
const router = useRouter()
const { opened } = useSidebar()

const selectedKeys = computed(() => ([route.name as string]))
const isCollapsed = computed(() => !opened.value)

const menuItems = adminRoutes.map(({ name, meta }) => {
  return {
    key: name,
    label: meta.title,
    title: meta.title,
    icon: meta.icon ? h('i', {
      class: ['iconfont', meta.icon],
    }) : null,
  } as ItemType
})

const handleMenuSelect: SelectEventHandler = (info) => {
  const { key } = info
  router.push({ name: key.toString() })
}
</script>

<style lang="scss" scoped>
.sidebar-view {
  width: 190px;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: rgb(52, 55, 68);
  padding: 47px 15px 0;
  transition: width .28s;
  &.is-collapsed {
    width: 80px;
    .ant-menu {
      width: auto;
      :deep(.ant-menu-item) {
        padding-left: 0 !important;
        text-align: center;
        .ant-menu-title-content {
          display: none;
        }
        &.ant-menu-item-selected:hover {
          background-color: #ffc200;
        }
      }
    }
  }

  .ant-menu {
    background-color: rgb(52, 55, 68);

    :deep(.ant-menu-item) {
      padding-left: 17px !important;
      padding-right: 0;
      margin: 0 0 20px !important;
      color: rgb(191, 203, 217);

      &.ant-menu-item-selected,
      &.ant-menu-item-selected:hover {
        background-color: #e3e3e3;
        color: #333;
      }

      &:hover {
        color: #ffffff;
        background: #4d4d4d;
      }

      i {
        font-size: 20px;
      }
    }
  }
}
</style>
