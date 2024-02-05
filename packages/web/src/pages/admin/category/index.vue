<template>
  <div class="container-box p-[30px]">
    <div class="search flex justify-between mb-5">
      <div class="flex items-center">
        <div>
          <span class="form-label">分类名称：</span>
          <Input
            class="w-44"
            size="large"
            allow-clear
            v-model:value="categoryName"
            placeholder="请填写分类名称"
            @keydown.enter="handleSearch"
          />
        </div>
        <div class="ml-5">
          <span class="form-label">分类类型：</span>
          <Select
            size="large"
            allow-clear
            style="width: 160px;"
            v-model:value="categoryType"
            placeholder="请选择"
          >
            <SelectOption :value="1">菜品分类</SelectOption>
            <SelectOption :value="2">套餐分类</SelectOption>
          </Select>
        </div>
        <NormalButton @click="handleSearch">查询</NormalButton>
      </div>
      <div>
        <NormalButton @click="handleAddCategory(1)">+ 新增菜品分类</NormalButton>
        <PrimaryButton @click="handleAddCategory(2)" class="ml-5">+ 新增套餐分类</PrimaryButton>
      </div>
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
        <div v-if="column.key === 'type'">
          {{ record.type === 1 ? '菜品分类' : '套餐分类' }}
        </div>
        <div
          :class="['tableColumn-status', record.status === 0 && 'stop-use']"
          v-else-if="column.key === 'status'"
        >
          {{ record.status === 1 ? '启用' : '禁用' }}
        </div>
        <div v-else-if="column.key === 'action'">
          <Button
            class="text-btn blueBug"
            type="text"
            @click="handleEditCategory(record as ICategoryVO)"
          >修改</Button>
          <Button
            class="text-btn delBut"
            type="text"
            @click="handleDeleteCategory(record.id)"
          >删除</Button>
          <Button
            type="text"
            @click="updateCategoryStatus(record.status, record.id)"
            :class="['text-btn', record.status === 1 ? 'delBut' : 'blueBug']"
          >{{ record.status === 1 ? '禁用' : '启用' }}</Button>
        </div>
      </template>
    </Table>
    <CategoryModal
      :open="open"
      :type="modalType"
      :id="modalEditObj.id"
      :name="modalEditObj.name"
      :sort="modalEditObj.sort"
      @ok="handleCloseModal"
      @cancel="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { Input, Table, Button, type TablePaginationConfig, message, Modal, Select, SelectOption } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { columns } from './config'
import { onMounted, reactive, ref, shallowRef } from 'vue'
import type { ICategoryPageQueryDTO, ICategoryVO } from '@sky_take_out/types'
import { changeCategoryStatus, deleteCategory, getCategoryList } from '@/api/category'
import CategoryModal from './components/CategoryModal.vue'

type TSearch = {
  name: string,
  type: 1 | 2 | undefined,
}

const searchObj: TSearch = {
  name: '',
  type: undefined,
}
const categoryName = shallowRef('')
const categoryType = shallowRef<1 | 2>()
const tableData = shallowRef<ICategoryVO[]>([])

const open = ref(false)
const modalType = ref<1 | 2>(1)

const pageData = reactive({
  currentPage: 1,
  total: 0,
})

type TModalEdit = {
  id?: number,
  name?: string,
  sort?: string,
}
const modalEditObj: TModalEdit = {
  id: undefined,
  name: '',
  sort: '',
}

async function getCategoryPageList(page: number, name?: string, type?: 1 | 2) {
  const params: ICategoryPageQueryDTO = {
    page: page + '',
    pageSize: '10',
  }
  if (name) {
    params.name = name
  }
  if (type) {
    params.type = type
  }
  const res = await getCategoryList(params)
  pageData.currentPage = page
  pageData.total = res.total
  tableData.value = res.records
}

const handlePaginationChange = async ({ current }: TablePaginationConfig) => {
  await getCategoryPageList(current!, searchObj.name, searchObj.type)
}

async function handleSearch() {
  const name = categoryName.value
  const type = categoryType.value
  if (name !== searchObj.name || type !== searchObj.type) {
    searchObj.name = name
    searchObj.type = type
    await getCategoryPageList(1, name, type)
  }
}

function updateCategoryStatus(status: 0 | 1, id: number) {
  Modal.confirm({
    title: '提示',
    centered: true,
    content: '确认调整该分类的状态?',
    onOk: async () => {
      try {
        await changeCategoryStatus(status === 1 ? 0 : 1, id)
        await getCategoryPageList(pageData.currentPage, searchObj.name, searchObj.type)
      } catch (err: any) {
        message.error(err.message)
      }
    },
  })
}

function handleEditCategory(data: ICategoryVO) {
  modalEditObj.id = data.id
  modalEditObj.name = data.name
  modalEditObj.sort = data.sort + ''
  modalType.value = data.type as (1 | 2)

  open.value = true
}

async function handleCloseModal() {
  open.value = false
  modalType.value = 1

  modalEditObj.id = undefined
  modalEditObj.name = undefined
  modalEditObj.sort = undefined

  await getCategoryPageList(pageData.currentPage, searchObj.name, searchObj.type)
}

function handleAddCategory(type: 1 | 2) {
  open.value = true
  modalType.value = type
}

function handleDeleteCategory(id: number) {
  Modal.confirm({
    title: '确定删除',
    centered: true,
    okText: '删除',
    content: '此操作将永久删除该分类，是否继续？',
    onOk: async () => {
      try {
        await deleteCategory(id)
        await getCategoryPageList(pageData.currentPage, searchObj.name, searchObj.type)
        message.success('删除成功')
      } catch (err: any) {
        message.error(err.message)
      }
    },
  })  
}

onMounted(() => {
  getCategoryPageList(1)
})

defineOptions({
  name: 'CategoryPage',
})
</script>

<style scoped>

</style>