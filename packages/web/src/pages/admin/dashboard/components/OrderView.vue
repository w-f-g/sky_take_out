<template>
  <div class="flex gap-5">
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-waiting mr-1 align-middle" style="font-size: 28px;"></i>
        待接单
      </div>
      <RouterLink to="/order?status=2" class="text-[#fd3333] font-bold text-[28px]">{{ data?.waitingOrders || 0 }}</RouterLink>
    </div>
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-waiting mr-1 align-middle" style="font-size: 28px;"></i>
        待派送
      </div>
      <RouterLink to="/order?status=3" class="text-[#fd3333] font-bold text-[28px]">{{ data?.deliveredOrders || 0 }}</RouterLink>
    </div>
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-waiting mr-1 align-middle" style="font-size: 28px;"></i>
        已完成
      </div>
      <RouterLink to="/order?status=5" class="font-bold text-[28px]">{{ data?.completedOrders || 0 }}</RouterLink>
    </div>
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-waiting mr-1 align-middle" style="font-size: 28px;"></i>
        已取消
      </div>
      <RouterLink to="/order?status=6" class="font-bold text-[28px]">{{ data?.cancelledOrders || 0 }}</RouterLink>
    </div>
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-waiting mr-1 align-middle" style="font-size: 28px;"></i>
        全部订单
      </div>
      <RouterLink to="/order" class="font-bold text-[28px]">{{ data?.allOrders || 0 }}</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderOverViewVO } from '@sky_take_out/types'
import { toRefs } from 'vue'

const props = defineProps<{
  data: IOrderOverViewVO | null
}>()
const { data } = toRefs(props)
</script>

<style scoped>

</style>