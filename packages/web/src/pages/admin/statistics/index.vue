<template>
  <div class="statistics-page">
    <div class="actions flex justify-between items-center">
      <div class="flex items-center">
        <RadioGroup
          size="large"
          @change="handleRadioChange"
          :value="type"
        >
          <RadioButton
            :key="i"
            :value="i"
            v-for="(item, i) in radioLabels"
          >{{ item }}</RadioButton>
        </RadioGroup>
        <div class="ml-2">已选时间：{{ dateTimes[0] }} 至 {{ dateTimes[1] }}</div>
      </div>
      <Button
        class="h-[40px]"
        :icon="h(UploadOutlined)"
        @click="handleExportExecl"
      >数据导出</Button>
    </div>
    <div class="content">
      <div class="flex gap-5 h-[430px] mb-5">
        <div class="container-box flex-1 flex flex-col">
          <div class="title">营业额统计</div>
          <div class="flex-1">
            <TurnoverChart :options="turnoverOptions" />
          </div>
          <div class="text-center text-xs text-[#666]">营业额(元)</div>
        </div>
        <div class="container-box flex-1 flex flex-col">
          <div class="title">用户统计</div>
          <div class="flex-1">
            <UserChart :options="userOptions" />
          </div>
          <ul class="orderListLine user">
            <li class="one"><span></span>用户总量（个）</li>
            <li class="three"><span></span>新增用户（个）</li>
          </ul>
        </div>
      </div>
      <div class="flex gap-5 h-[440px]">
        <div class="container-box flex-1 flex flex-col">
          <div class="title">订单统计</div>
          <div class="orderProportion">
            <div>
              <p>订单完成率</p>
              <p>{{ (orderData.orderCompletionRate * 100).toFixed(1) }}%</p>
            </div>
            <div class="symbol">=</div>
            <div>
              <p>有效订单</p>
              <p>{{ orderData.validOrderCount }}</p>
            </div>
            <div class="symbol">/</div>
            <div>
              <p>订单总数</p>
              <p>{{ orderData.totalOrderCount }}</p>
            </div>
          </div>
          <div class="flex-1">
            <OrderChart :options="orderOptions" />
          </div>
          <ul class="orderListLine">
            <li class="one"><span></span>订单总数（个）</li>
            <li class="three"><span></span>有效订单（个）</li>
          </ul>
        </div>
        <div class="container-box flex-1">
          <div class="title">销量排名TOP10</div>
          <Top10Chart :options="top10Options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { ref, h, computed, toValue, onMounted, type Ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { RadioGroup, RadioButton, Button, type RadioChangeEvent, Modal } from 'ant-design-vue'
import { exportReport, getOrdersStatistics, getTop10, getTurnoverStatistics, getUserStatistics } from '@/api/statistics'
import type { EChartsOption } from 'echarts'

import Top10Chart from './components/Top10Chart.vue'
import UserChart from './components/UserChart.vue'
import OrderChart from './components/OrderChart.vue'
import TurnoverChart from './components/TurnoverChart.vue'
import type { IOrdersStatisticsVO } from '@sky_take_out/types'

dayjs.extend(weekday)
const FORMAT = 'YYYY-MM-DD'
const radioLabels = ['昨日', '近7日', '近30日', '本周', '本月']
const today = dayjs()

const type = ref(1)
const dateTimes = computed(() => {
  const value = toValue(type)
  if (value === 0) {
    const begin = today.subtract(1, 'day').format(FORMAT)
    return [begin, begin]
  } else if (value === 1) {
    const begin = today.subtract(7, 'day').format(FORMAT)
    const end = today.subtract(1, 'day').format(FORMAT)
    return [begin, end]
  } else if (value === 2) {
    const begin = today.subtract(30, 'day').format(FORMAT)
    const end = today.subtract(1, 'day').format(FORMAT)
    return [begin, end]
  } else if (value === 3) {
    const begin = today.startOf('week').format(FORMAT)
    const end = today.endOf('week').format(FORMAT)
    return [begin, end]
  } else {
    const begin = today.startOf('month').format(FORMAT)
    const end = today.endOf('month').format(FORMAT)
    return [begin, end]
  }
})

const turnoverOptions: Ref<EChartsOption> = ref({})
const userOptions: Ref<EChartsOption> = ref({})
const orderOptions: Ref<EChartsOption> = ref({})
const top10Options: Ref<EChartsOption> = ref({})
const orderData = ref<IOrdersStatisticsVO>({} as IOrdersStatisticsVO)

function handleRadioChange({ target }: RadioChangeEvent) {
  const value = target.value
  type.value = value
  getData()
}

function handleExportExecl() {
  Modal.confirm({
    title: '提示',
    centered: true,
    content: '是否确认导出最近30天运营数据?',
    onOk: async () => {
      exportReport()
    },
  })
}

async function getTurnoverData() {
  const [begin, end] = dateTimes.value
  const res = await getTurnoverStatistics(begin, end)
  turnoverOptions.value = {
    xAxis: {
      data: res.dateList.split(','),
    },
    series: [
      {
        data: res.turnoverList.split(',')
      }
    ]
  }
}

async function getUserData() {
  const [begin, end] = dateTimes.value
  const res = await getUserStatistics(begin, end)
  userOptions.value = {
    xAxis: {
      data: res.dateList.split(','),
    },
    series: [
      {
        data: res.totalUserList.split(','),
      },
      {
        data: res.newUserList.split(','),
      },
    ],
  }
}

async function getOrderData() {
  const [begin, end] = dateTimes.value
  const res = await getOrdersStatistics(begin, end)
  orderData.value = res
  orderOptions.value = {
    xAxis: {
      data: res.dateList.split(','),
    },
    series: [
      {
        data: res.orderCountList.split(','),
      },
      {
        data: res.validOrderCountList.split(','),
      },
    ]
  }
}

async function getTop10Data() {
  const [begin, end] = dateTimes.value
  const res = await getTop10(begin, end)
  top10Options.value = {
    yAxis: {
      data: res.nameList.split(',').reverse(),
    },
    series: [
      {
        data: res.numberList.split(',').reverse(),
      },
    ],
  }
}

function getData() {
  Promise.all([
    getTurnoverData(),
    getUserData(),
    getOrderData(),
    getTop10Data(),
  ])
}

onMounted(() => {
  getData()
})

defineOptions({
  name: 'StatisticsPage'
})
</script>

<style lang="scss" scoped>
.statistics-page {
  .actions {
    margin-bottom: 20px;
    .ant-radio-group {
      .ant-radio-button-wrapper {
        border-radius: 0;
        width: 80px;
        text-align: center;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        position: relative;
        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
        &.ant-radio-button-wrapper-checked {
          background-color: #ffc200;
        }
      }
    }
    .ant-btn {
      border-radius: 4px;
    }
  }
  .content {
    .title {
      font-weight: 600;
      font-size: 16px;
      color: #333;
      padding-top: 5px;
      margin-bottom: 18px;
    }
    .orderListLine {
      width: 360px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      margin-top: -10px;
      li {
        font-size: 12px;
        color: #666666;
        padding: 0 6px;
        align-items: center;
        display: flex;
        height: 20px;
        span {
          display: inline-block;
          width: 12px;
          height: 2px;
          overflow: hidden;
          margin-right: 8px;
        }
        &.one {
          span {
            background:#FFC100 ;
          }
        }
        &.two {
          span {
            background: #7f85fc;
          }
        }
        &.three {
          span {
            background:#FD7F7F;
          }
        }
      }
    }
    .orderListLine.user {
      width: 260px;
    }
    .orderProportion {
      display: flex;
      padding-bottom: 10px;
      color: #666;
      vertical-align: middle;
      font-size: 12px;
      & > div {
        display: inline-block;
        p {
          margin: 0;
          &:last-child {
            font-size: 16px;
            font-weight: 700;
            color: #000;
            padding-top: 5px;
          }
        }
      }
      .symbol {
        padding: 10px 20px 0;
        font-size: 16px;
      }
    }
  }
}
</style>