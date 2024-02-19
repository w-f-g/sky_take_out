<template>
  <div class="order-page">
    <RadioGroup
      size="large"
      @change="handleRadioChange"
      :value="_searchObj.orderType"
    >
      <RadioButton
        :key="item.value"
        :value="item.value"
        v-for="item in orderTypes"
      >
        {{ item.label }}
        <sup v-if="
          item.value > 1 && item.value < 5 && parseInt(getOrderStatisics(item.value)) > 0
        ">{{ getOrderStatisics(item.value) }}</sup>
      </RadioButton>
    </RadioGroup>
    <div class="container-box mt-5">
      <div class="search flex mb-5">
        <div class="flex items-center">
          <span class="form-label">订单号：</span>
          <Input
            size="large"
            allow-clear
            v-model:value="searchObj.number"
            class="w-[172px] h-[40px]"
            placeholder="请填写订单号"
          />
        </div>
        <div class="ml-5 flex items-center">
          <span class="form-label">手机号：</span>
          <Input
            size="large"
            allow-clear
            v-model:value="searchObj.phone"
            class="w-[172px] h-[40px]"
            placeholder="请填写手机号"
          />
        </div>
        <div class="ml-5 flex items-center">
          <span class="form-label">下单时间：</span>
          <RangePicker
            class="h-[40px]"
            size="large"
            value-format="YYYY-MM-DD"
            :value="searchObj.dateTimes"
            @change="handleRangePickerChange"
          />
        </div>
        <NormalButton @click="handleSearch">查询</NormalButton>
      </div>
      <Table
        :columns="columns"
        :data-source="tableData"
        :pagination="{
          position: ['bottomCenter'],
          showTotal: total => `共 ${total} 条`,
          showQuickJumper: true,
          showSizeChanger: false,
          total: pageData.total,
          current: pageData.currentPage,
        }"
        @change="handlePaginationChange"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'status'">{{ orderTypeLabel(record.status) }}</div>
          <div v-else-if="column.key === 'action'">
            <!-- 蓝色按钮 -->
            <Button
              v-if="record.status === 2"
              class="text-btn blueBug"
              type="text"
              @click="handleOrderNext(record.status, record.id)"
            >接单</Button>
            <Button
              v-if="record.status === 3"
              class="text-btn blueBug"
              type="text"
              @click="handleOrderNext(record.status, record.id)"
            >派送</Button>
            <Button
              v-if="record.status === 4"
              class="text-btn blueBug"
              type="text"
              @click="handleOrderNext(record.status, record.id)"
            >完成</Button>
            <!-- 红色按钮 -->
            <Button
              v-if="[1, 3, 4, 5].includes(record.status)"
              class="text-btn delBut"
              type="text"
              @click="handleCancelOrder(record.id)"
            >取消</Button>
            <Button
              v-if="record.status === 2"
              class="text-btn delBut"
              type="text"
              @click="handleRejectionOrder(record.id)"
            >拒单</Button>
            <Button
              class="text-btn blueBug"
              type="text"
              @click="handleOrderDetail(record as IAdminSearchOrderVO)"
            >查看</Button>
          </div>
        </template>
      </Table>
    </div>
    <OrderInfoModal
      :open="open"
      :next="isAutoNext"
      :order="orderDetail"
      @ok="handleModalOk"
      @close="open = false"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { completeOrder, confirmOrder, deliveryOrder, getOrderInfoById, getOrderList, orderStatistics } from '@/api/order'
import NormalButton from '@/components/Button/NormalButton.vue'
import type { IAdminOrderVO, IAdminSearchOrderDTO, IAdminSearchOrderVO } from '@sky_take_out/types'
import { RadioButton, RadioGroup, Input, RangePicker, Table, Button, message, type RadioChangeEvent } from 'ant-design-vue'
import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import { computed, onMounted, reactive, ref, shallowRef, toRaw } from 'vue'
import { cancelOrderModal, rejectionOrderModal } from './components/modal'
import OrderInfoModal from './components/OrderInfoModal.vue'

const modules = import.meta.glob('./config.ts', { eager: true })['./config.ts'] as object
const _columns = Object.entries(modules)
  .filter(([k]) => k !== 'default')
  .reduce((prev, target) => {
    const [k, v] = target
    prev[k] = v as ColumnsType
    return prev
  }, {} as Record<string, ColumnsType>)

const orderTypes = [  
  {
    label: '全部订单',
    value: 0
  },
  {
    label: '待接单',
    value: 2,
  },
  {
    label: '待派送',
    value: 3,
  },
  {
    label: '派送中',
    value: 4,
  },
  {
    label: '已完成',
    value: 5,
  },
  {
    label: '已取消',
    value: 6,
  },
] as const

type TOrderType = typeof orderTypes[number]['value']

type TSearch = {
  orderType: TOrderType,
  phone: string,
  number: string,
  dateTimes: [string, string],
  [key: string]: any,
}

let _searchObj: TSearch = {
  orderType: 0,
  phone: '',
  number: '',
  dateTimes: ['', ''],
}

const orderTypes$ = reactive(orderTypes)
const searchObj: TSearch = reactive({
  orderType: 0,
  phone: '',
  number: '',
  dateTimes: ['', ''],
})
const tableData = shallowRef<IAdminSearchOrderVO[]>([])
const pageData = reactive({
  currentPage: 1,
  total: 0,
})

const statistics = reactive({
  '2': 0,
  '3': 0,
  '4': 0,
})

const open = ref(false)
const orderDetail = ref<IAdminOrderVO>({} as IAdminOrderVO)

type TStatistics = keyof typeof statistics

const columns = computed(() => {
  const k = 'columns' + searchObj.orderType
  return _columns[k]
})
const orderTypeLabel = computed(() => {
  return (type: TOrderType) => {
    const target = orderTypes$.find(x => x.value === type)!
    return target.label
  }
})
const getOrderStatisics = computed(() => {
  return (value: number) => {
    const num = statistics[value as unknown as TStatistics]
    return num > 99 ? '99+' : num + ''
  }
})
const isAutoNext = computed(() => searchObj.orderType === 2)

/** 接单、派送、完成状态修改 */
async function handleOrderNext(status: TOrderType, id: number) {
  try {
    if (status === 2) {
      await confirmOrder(id)
    } else if (status === 3) {
      await deliveryOrder(id)
    } else if (status === 4) {
      await completeOrder(id)
    }
    getOrderPageList(pageData.currentPage, _searchObj)
    message.success('操作成功')
  } catch (err: any) {
    message.error(err.message)
  }
}

/** 获取订单状态数量 */
async function setOrderStatistics() {
  const res = await orderStatistics()
  statistics['2'] = res.toBeConfirmed
  statistics['3'] = res.confirmed
  statistics['4'] = res.deliveryInProgress
}

/** 取消订单 */
async function handleCancelOrder(id: number) {
  await cancelOrderModal(id)
  getOrderPageList(pageData.currentPage, _searchObj)
}

/** 拒单 */
async function handleRejectionOrder(id: number) {
  await rejectionOrderModal(id)
  getOrderPageList(pageData.currentPage, _searchObj)
}

/** 获取订单列表 */
async function getOrderPageList(page: number, params?: TSearch) {
  const obj: IAdminSearchOrderDTO = {
    page: page + '',
    pageSize: '10',
  }
  if (params && params.dateTimes && params.dateTimes[0]) {
    obj.beginTime = params.dateTimes[0]
    obj.endTime = params.dateTimes[1]
  }
  if (params?.number) {
    obj.number = params.number
  }
  if (params?.phone) {
    obj.phone = params.phone
  }
  if (params && params.orderType !== 0) {
    obj.status = params.orderType + ''
  }
  const res = await getOrderList(obj)
  tableData.value = res.records
  pageData.currentPage = page
  pageData.total = +res.total

  setOrderStatistics()
}

/** 选择时间范围 */
function handleRangePickerChange(times: [string, string]) {
  const beginTime = times[0] + ' 00:00:00'
  const endTime = times[1] + ' 23:59:59'
  searchObj.dateTimes = [beginTime, endTime]
}

function handleSearch() {
  const _s = toRaw(searchObj)
  const flag = Object.entries(_s).some(([k, v]) => {
    if (k === 'dateTimes') {
      const times = _searchObj[k]
      const _v = v || ['', '']
      return _v[0] !== times[0] || _v[1] !== times[1]
    }
    return !Object.is(v, _searchObj[k])
  })
  if (flag) {
    _searchObj = {..._s}
    getOrderPageList(1, _searchObj)
  }
}

const handlePaginationChange = ({ current }: TablePaginationConfig) => {
  getOrderPageList(current!, _searchObj)
}

/** 查看不同订单状态 */
async function handleRadioChange({ target }: RadioChangeEvent) {
  const value = target.value
  searchObj.dateTimes = ['', '']
  searchObj.number = ''
  searchObj.phone = ''

  const _s = toRaw(searchObj)
  _searchObj = { ..._s, orderType: value }
  await getOrderPageList(1, _searchObj)
  searchObj.orderType = value
}

async function handleOrderDetail(data: IAdminSearchOrderVO) {
  const res = await getOrderInfoById(data.id)
  open.value = true
  orderDetail.value = res
}

async function handleModalCancel(flag: boolean) {
  const { id, status } = orderDetail.value
  if (status === 2) {
    await handleRejectionOrder(id)
    await getOrderPageList(pageData.currentPage, _searchObj)
  }
  if (flag) {
    if (tableData.value.length > 0) {
      const data = tableData.value[0]
      const res = await getOrderInfoById(data.id)
      orderDetail.value = res
    }
  } else {
    open.value = false
  }
}

async function handleModalOk(flag: boolean) {
  const { id, status } = orderDetail.value
  await handleOrderNext(status as TOrderType, id)
  await getOrderPageList(pageData.currentPage, _searchObj)
  if (flag && tableData.value.length > 0) {
    const data = tableData.value[0]
    const res = await getOrderInfoById(data.id)
    orderDetail.value = res
  } else {
    open.value = false
  }
}

onMounted(() => {
  getOrderPageList(1)
})

defineOptions({
  name: 'OrderPage',
})
</script>

<style lang="scss" scoped>
.order-page {
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
  .search {
    .ant-picker-large {
      :deep(.ant-picker-input > input) {
        font-size: 14px;
      }
    }
  }
}
</style>