<template>
  <div class="flex gap-5">
    <div class="flex-1 p-5 bg-[#fffbf0] rounded">
      <div>营业额</div>
      <div class="py-[10px] text-[28px]">￥{{ data?.turnover || 0 }}</div>
    </div>
    <div class="flex-1 p-5 bg-[#fffbf0] rounded">
      <div>有效订单</div>
      <div class="py-[10px] text-[28px]">{{  data?.validOrderCount || 0 }}</div>
    </div>
    <div class="flex-1 p-5 bg-[#fffbf0] rounded">
      <div>订单完成率</div>
      <div class="py-[10px] text-[28px]">{{ data?.orderCompletionRate || 0 }}%</div>
    </div>
    <div class="flex-1 p-5 bg-[#fffbf0] rounded">
      <div>平均客单价</div>
      <div class="py-[10px] text-[28px]">￥{{ data?.unitPrice || 0 }}</div>
    </div>
    <div class="flex-1 p-5 bg-[#fffbf0] rounded">
      <div>新增用户</div>
      <div class="py-[10px] text-[28px]">{{ data?.newUsers || 0 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBusinessDataVO } from '@sky_take_out/types'
import { toRefs } from 'vue'

const props = defineProps<{
  data: IBusinessDataVO | null
}>()
const { data } = toRefs(props)
</script>

<style lang="scss" scoped>

</style>