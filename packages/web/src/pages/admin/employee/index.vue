<template>
  <div class="container-box" style="padding: 30px;">
    <div class="search flex justify-between mb-5">
      <div class="flex items-center">
        <span class="form-label">员工姓名：</span>
        <Input
          class="w-44"
          size="large"
          allow-clear
          v-model:value="employeeName"
          placeholder="请输入员工姓名"
          @keydown.enter="handleSearch"
        />
        <NormalButton @click="handleSearch">查询</NormalButton>
      </div>
      <PrimaryButton @click="handleEmployee">+ 添加员工</PrimaryButton>
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
        <div
          :class="['tableColumn-status', record.status === 0 && 'stop-use']"
          v-if="column.key === 'status'"
        >
          {{ record.status === 1 ? '启用' : '禁用' }}
        </div>
        <div v-else-if="column.key === 'action'">
          <Button
            class="text-btn blueBug"
            type="text"
            :disabled="record.username === 'admin'"
            @click="router.push({
              path: '/employee/add',
              query: {
                id: record.id,
              }
            })"
          >修改</Button>
          <Button
            :class="['text-btn', record.status === 1 ? 'delBut' : 'blueBug']"
            type="text"
            @click="updateEmployeeStatus(record.status, record.id)"
            :disabled="record.username === 'admin'"
          >{{ record.status === 1 ? '禁用' : '启用' }}</Button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Input, Table, Button, type TablePaginationConfig, message, Modal } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { onMounted, reactive, ref, shallowRef } from 'vue'
import { queryEmployeePageList, setEmployeeStatus } from '@/api/employee'
import { columns } from './config'
import type { IEmployeePageQueryDTO, IEmployeeVO } from '@sky_take_out/types'
import { useRouter } from 'vue-router'

let name = ''
const employeeName = ref('')
const tableData = shallowRef<IEmployeeVO[]>([])

const pageData = reactive({
  currentPage: 1,
  total: 0,
})

const router = useRouter()

const getEmployeePageList = async (page: number, name?: string) => {
  const params: IEmployeePageQueryDTO = {
    page: page + '',
    pageSize: '10',
  }
  if (name !== undefined) {
    params.name = name
  }
  const res = await queryEmployeePageList(params)
  pageData.currentPage = page
  pageData.total = res.total
  tableData.value = res.records
}

async function handleSearch() {
  if (employeeName.value !== name) {
    name = employeeName.value
    await getEmployeePageList(1, name)
  }
}

function handleEmployee() {
  router.push('/employee/add')
}

function updateEmployeeStatus(status: 0 | 1, id: number) {
  Modal.confirm({
    title: '提示',
    centered: true,
    content: '确认调整该账号的状态?',
    onOk: async () => {
      try {
        await setEmployeeStatus(status === 1 ? 0 : 1, id)
        await getEmployeePageList(pageData.currentPage, name)
      } catch (err: any) {
        message.error(err.message)
      }
    }
  })
}

const handlePaginationChange = async ({ current }: TablePaginationConfig) => {
  await getEmployeePageList(current!, name)
}

onMounted(() => {
  getEmployeePageList(1)
})

defineOptions({
  name: 'EmployeePage',
})
</script>

<style scoped>

</style>