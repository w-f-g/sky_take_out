<template>
  <div class="h-full flex justify-center items-center">
    <div v-if="isShowWinActions" class="flex win-actions justify-end">
      <div class="drag-bar flex-1 overflow-hidden"></div>
      <div class="flex" @click="handleActionClick">
        <div v-if="IS_DEV" data-action-type="more" class="icon more"></div>
        <div data-action-type="minimize" class="icon minimize"></div>
        <div v-if="isMaximize" data-action-type="unmaximize" class="icon maximize"></div>
        <div v-else data-action-type="maximize" class="icon unmaximize"></div>
        <div data-action-type="close" class="icon close"></div>
      </div>
    </div>
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
import { useAppActionBar } from '@/hooks/appActionBar'

const router = useRouter()
const { isMaximize, isShowWinActions, handleActionClick } = useAppActionBar()
</script>

<style lang="scss" scoped>
.win-actions {
  $winActionsHeight: 32px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $winActionsHeight;
  .drag-bar {
    -webkit-app-region: drag;
  }
  .icon {
    height: $winActionsHeight;
    padding: 0 20px;
    &.more {
      background: url("@/assets/win-icons/more.svg") center no-repeat;
      background-size: 20px;
    }
    &.minimize {
      background: url("@/assets/win-icons/minimize.svg") center no-repeat;
      background-size: 20px;
    }
    &.maximize {
      background: url("@/assets/win-icons/maximize.svg") center no-repeat;
      background-size: 20px;
    }
    &.unmaximize {
      background: url("@/assets/win-icons/unmaximize.svg") center no-repeat;
      background-size: 20px;
    }
    &.close {
      background: url("@/assets/win-icons/close.svg") center no-repeat;
      background-size: 20px;
      &:hover {
        background: url("@/assets/win-icons/close-white.svg") center no-repeat;
        background-size: 20px;
        background-color: #e81123;
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>