<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { antdThemeConfig } from '@/config/antd-vue'
</script>

<template>
  <ConfigProvider
    :theme="antdThemeConfig"
  >
    <RouterView />
  </ConfigProvider>
</template>
