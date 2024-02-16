<template>
  <div>
    <Result status="404" title="404" sub-title="肥肠抱歉，你要找的页面不见了">
      <template #extra>
        <Button type="primary" @click="router.replace('/')">回到首页</Button>
      </template>
    </Result>
  </div>
</template>

<script setup lang="ts">
import { Result, Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>

</style>