<template>
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
    :loading="loading"
    @change="handlePaginationChange"
  >
    <template #bodyCell="{ column, record }">
      <div v-if="column.key === 'action'">
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
        <!-- 红色按钮 -->
        <Button
          v-if="record.status === 3"
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
  <OrderInfoModal
    :open="open"
    :next="isAutoNext"
    :order="orderDetail"
    @ok="handleModalOk"
    @close="open = false"
    @cancel="handleModalCancel"
  />
</template>

<script setup lang="ts">
import { message, Table, Button, type TablePaginationConfig } from 'ant-design-vue'
import { computed, onMounted, reactive, ref, shallowRef, toRefs, watchEffect } from 'vue'
import { confirmOrder, deliveryOrder, getOrderInfoById, getOrderList } from '@/api/order'
import { cancelOrderModal, rejectionOrderModal } from '@/pages/admin/order/components/modal'
import OrderInfoModal from '@/pages/admin/order/components/OrderInfoModal.vue'
import { columns2, columns3 } from '@/pages/admin/order/config'
import type { IAdminOrderVO, IAdminSearchOrderDTO, IAdminSearchOrderVO } from '@sky_take_out/types'

const props = defineProps<{
  orderType: 2 | 3,
}>()
const { orderType } = toRefs(props)

const emit = defineEmits<{
  (e: 'change'): void,
}>()

const loading = ref(false)
const tableData = shallowRef<IAdminSearchOrderVO[]>([])
const pageData = reactive({
  currentPage: 1,
  total: 0,
})
const columns = computed(() => {
  return orderType.value === 2 ? columns2 : columns3
})

const open = ref(false)
const orderDetail = ref<IAdminOrderVO>({} as IAdminOrderVO)
const isAutoNext = computed(() => orderType.value === 2)

watchEffect(() => {
  getOrderPageList(1)
})

/** 获取订单列表 */
async function getOrderPageList(page: number) {
  loading.value = true
  const obj: IAdminSearchOrderDTO = {
    page: page + '',
    pageSize: '10',
    status: orderType.value + '',
  }
  const res = await getOrderList(obj)
  tableData.value = res.records
  pageData.currentPage = page
  pageData.total = +res.total
  emit('change')
  loading.value = false
}

/** 接单、派送、完成状态修改 */
async function handleOrderNext(status: 2 | 3, id: number) {
  try {
    if (status === 2) {
      await confirmOrder(id)
    } else if (status === 3) {
      await deliveryOrder(id)
    }
    getOrderPageList(pageData.currentPage)
    message.success('操作成功')
  } catch (err: any) {
    message.error(err.message)
  }
}

/** 取消订单 */
async function handleCancelOrder(id: number) {
  await cancelOrderModal(id)
  getOrderPageList(pageData.currentPage)
}

/** 拒单 */
async function handleRejectionOrder(id: number) {
  await rejectionOrderModal(id)
  getOrderPageList(pageData.currentPage)
}

const handlePaginationChange = ({ current }: TablePaginationConfig) => {
  getOrderPageList(current!)
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
    await getOrderPageList(pageData.currentPage)
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
  await handleOrderNext(status as 2 | 3, id)
  await getOrderPageList(pageData.currentPage)
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
</script>

<style scoped>

</style>