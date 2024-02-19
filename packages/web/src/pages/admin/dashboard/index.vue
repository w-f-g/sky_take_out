<template>
  <div class="dashboard-page">
    <div class="container-box mb-5">
      <div class="flex justify-between pt-[5px] mb-4">
        <div class="title">
          今日数据
          <span class="text-sm font-normal text-[#666] pl-3">{{ today }}</span>
        </div>
        <RouterLink class="link flex items-center" to="/statistics">详细数据</RouterLink>
      </div>
      <OverView :data="businessData" />
    </div>
    <div class="container-box mb-5">
      <div class="flex justify-between pt-[5px] mb-4">
        <div class="title">
          订单管理
          <span class="text-sm font-normal text-[#666] pl-3">{{ today }}</span>
        </div>
        <RouterLink class="link flex items-center" to="/order">订单明细</RouterLink>
      </div>
      <OrderView :data="orderData" />
    </div>
    <div class="flex gap-5">
      <div class="container-box mb-5 flex-1">
        <div class="flex justify-between pt-[5px] mb-4">
          <div class="title">菜品总览</div>
          <RouterLink class="link flex items-center" to="/dish">菜品管理</RouterLink>
        </div>
        <CategoryView :type='1' :data="dishData" />
      </div>
      <div class="container-box mb-5 flex-1">
        <div class="flex justify-between pt-[5px] mb-4">
          <div class="title">套餐总览</div>
          <RouterLink class="link flex items-center" to="/setmeal">套餐管理</RouterLink>
        </div>
        <CategoryView :type="2" :data="setmealData" />
      </div>
    </div>
    <div class="container-box order-view">
      <div class="flex justify-between pt-[5px] mb-4">
        <div class="title">订单信息</div>
        <RadioGroup
          size="large"
          @change="handleRadioChange"
          :value="orderType"
        >
          <RadioButton :value="2">
            待接单
            <sup v-if="statistics && statistics.toBeConfirmed > 0">{{ getNumText(statistics.toBeConfirmed) }}</sup>
          </RadioButton>
          <RadioButton :value="3">
            待派送
            <sup v-if="statistics && statistics.confirmed">{{ getNumText(statistics.confirmed) }}</sup>
          </RadioButton>
        </RadioGroup>
      </div>
      <OrderList :order-type="orderType" @change="setOrderStatistics" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import OverView from './components/OverView.vue'
import OrderView from './components/OrderView.vue'
import OrderList from './components/OrderList.vue'
import CategoryView from './components/CategoryView.vue'
import { orderStatistics } from '@/api/order'
import { getBusinessData, getOverviewDishes, getOverviewOrders, getOverviewSetmeals } from '@/api/dashboard'
import type { IOrderOverViewVO, IBusinessDataVO, IOverViewVO, IAdminOrderStatisticsVO } from '@sky_take_out/types'
import { RadioButton, RadioGroup, type RadioChangeEvent } from 'ant-design-vue'

const today = dayjs().format('YYYY.MM.DD')

const businessData = ref<IBusinessDataVO | null>(null)
const orderData = ref<IOrderOverViewVO | null>(null)
const dishData = ref<IOverViewVO | null>(null)
const setmealData = ref<IOverViewVO | null>(null)

const orderType = ref<2 | 3>(2)
const statistics = ref<IAdminOrderStatisticsVO | null>(null)

const getNumText = computed(() => {
  return (val: number) => {
    return val > 99 ? '99+' : val
  }
})

/** 获取订单状态数量 */
async function setOrderStatistics() {
  const res = await orderStatistics()
  statistics.value = res
}

/** 查看不同订单状态 */
async function handleRadioChange({ target }: RadioChangeEvent) {
  const value = target.value
  orderType.value = value
}

onMounted(async () => {
  const response = await Promise.all([
    getBusinessData(),
    getOverviewOrders(),
    getOverviewDishes(),
    getOverviewSetmeals(),
  ])
  businessData.value = response[0]
  orderData.value = response[1]
  dishData.value = response[2]
  setmealData.value = response[3]

  setOrderStatistics()
})

defineOptions({
  name: 'DashboardPage',
})
</script>

<style lang="scss" scoped>
.dashboard-page {
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
  }
  .link {
    background: url("@/assets/icons/icon_more@2x.png") no-repeat right center;
    background-size: contain;
    font-size: 14px;
    line-height: 16px;
    padding-right: 20px;
  }
  .order-view {
      .ant-radio-group {
        .ant-radio-button-wrapper {
          border-radius: 0;
          width: 120px;
          text-align: center;
          font-size: 14px;
          color: #333;
          background-color: #fff;
          position: relative;
          &.ant-radio-button-wrapper-checked {
            background-color: #ffc200;
            font-weight: bold;
          }
          sup {
            position: absolute;
            top: 5px;
            transform: translateX(3px);
            background-color: #fd3333;
            color: #fff;
            line-height: 18px;
            height: auto;
            min-width: 18px;
            min-height: 18px;
            border-radius: 10px;
            font-size: 12px;
          }
        }
      }
  }
}
</style>