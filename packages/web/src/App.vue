<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import antdConfig from '@/config/antd-vue'
</script>

<template>
  <ConfigProvider v-bind="antdConfig">
    <RouterView />
  </ConfigProvider>
</template>
