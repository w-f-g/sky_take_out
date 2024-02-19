<template>
  <div class="flex gap-5">
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-open mr-1 align-middle" style="font-size: 28px;"></i>
        已启售
      </div>
      <div class="font-bold text-[28px]">{{ data?.sold || 0 }}</div>
    </div>
    <div class="flex-1 flex justify-between items-center p-5 bg-[#fffbf0] rounded">
      <div>
        <i class="iconfont icon-stop mr-1 align-middle" style="font-size: 28px;"></i>
        已停售
      </div>
      <div class="font-bold text-[28px]">{{ data?.discontinued || 0 }}</div>
    </div>
    <RouterLink class="add" to="/setmeal/add">
      <img class="w-[22px] h-[22px] mb-1" src="@/assets/icons/btn_add@2x.png" alt="">
      <span>新增套餐</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IOverViewVO } from '@sky_take_out/types'
import { toRefs } from 'vue'

const props = defineProps<{
  data: IOverViewVO | null
}>()
const { data } = toRefs(props)
</script>

<style lang="scss" scoped>
.add {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffc100;
  border-radius: 4px;
  padding: 18px 20px 10px
}
</style>