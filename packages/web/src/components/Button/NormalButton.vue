<template>
  <Button v-bind="$attrs" class="normal-btn continue" size="large">
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
</script>

<style lang="scss" scoped>
.normal-btn.ant-btn {
  font-size: 14px;
}
</style>