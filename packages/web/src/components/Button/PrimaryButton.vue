<template>
  <Button v-bind="$attrs" type="primary" class="primary-btn text-black" size="large">
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
</script>

<style lang="scss" scoped>
.primary-btn.ant-btn {
  font-size: 14px;
}
</style>