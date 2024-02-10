<template>
  <div class="container-box" style="padding: 30px;">
    <div class="search flex justify-between mb-5">
      <div class="flex items-center">
        <div>
          <span class="form-label">分类名称：</span>
          <Input
            class="w-44"
            size="large"
            allow-clear
            placeholder="请填写菜品名称"
            v-model:value="searchObj.name"
            @keydown.enter="handleSearch"
          />
        </div>
        <div class="ml-5">
          <span class="form-label">菜品分类：</span>
          <Select
            size="large"
            allow-clear
            style="width: 160px;"
            placeholder="请选择"
            v-model:value="searchObj.categoryId"
          >
            <SelectOption
              v-for="item in dishCategoryList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </SelectOption>
          </Select>
        </div>
        <div class="ml-5">
          <span class="form-label">售卖状态：</span>
          <Select
            size="large"
            allow-clear
            style="width: 160px;"
            placeholder="请选择"
            v-model:value="searchObj.status"
          >
            <SelectOption :value="0">停售</SelectOption>
            <SelectOption :value="1">启售</SelectOption>
          </Select>
        </div>
        <NormalButton @click="handleSearch">查询</NormalButton>
      </div>
      <div>
          <Button
            class="text-btn delBut no-right"
            type="text"
            @click="handleDeleteDishs(tableSelectionRow as string[])"
            :disabled="!tableSelectionRow.length"
          >批量删除</Button>
        <PrimaryButton class="ml-5" @click="router.push('/dish/add')">+ 新建菜品</PrimaryButton>
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
      :row-selection="{
        onChange: handleTableRowSelection,
      }"
      @change="handlePaginationChange"
    >
      <template #bodyCell="{ column, record }">
        <div v-if="column.key === 'price'">
          ￥{{ record.price }}
        </div>
        <template v-else-if="column.key === 'image'">
          <Image
            :width="40"
            :height="40"
            :preview="false"
            :src="record.image"
            fallback="@/assets/noImg.png"
            class="rounded"
          />
        </template>
        <div
          :class="['tableColumn-status', record.status === 0 && 'stop-use']"
          v-else-if="column.key === 'status'"
        >
          {{ record.status === 1 ? '启售' : '停售' }}
        </div>
        <div v-else-if="column.key === 'action'">
          <Button
            class="text-btn blueBug"
            type="text"
            @click="router.push({
              path: '/dish/add',
              query: {
                id: record.id,
              },
            })"
          >修改</Button>
          <Button
            class="text-btn delBut"
            type="text"
            @click="handleDeleteDishs([record.id])"
          >删除</Button>
          <Button
            type="text"
            @click="handleDishStatus(record.status, record.id)"
            :class="['text-btn', record.status === 1 ? 'delBut' : 'blueBug']"
          >{{ record.status === 1 ? '停售' : '启售' }}</Button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Input, Table, Button, type TablePaginationConfig, message, Modal, Select, SelectOption, Image } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { columns } from './config'
import { onMounted, reactive, shallowRef, toRaw } from 'vue'
import { getCategoryByType, type TSelectOptions } from '@/api/category'
import type { IDishPageQueryDTO, IDishPageVO } from '@sky_take_out/types'
import { deleteDishs, getDishList, updateDishStatus } from '@/api/dish'
import type { Key } from 'ant-design-vue/es/table/interface'
import { useRouter } from 'vue-router'

type TSearch = {
  categoryId?: string,
  name?: string,
  status?: 0 | 1,
  [key: string]: any,
}

let _searchObj: TSearch = {
  categoryId: undefined,
  name: '',
  status: undefined,
}

const router = useRouter()
const searchObj = reactive<TSearch>({
  categoryId: undefined,
  name: '',
  status: undefined
})
const dishCategoryList = shallowRef<TSelectOptions>([])
const tableData = shallowRef<IDishPageVO[]>([])
const tableSelectionRow = shallowRef<Key[]>([])
const pageData = reactive({
  currentPage: 1,
  total: 0,
})

async function getDishPageList(page: number, params?: TSearch) {
  const obj: IDishPageQueryDTO = {
    page: page + '',
    pageSize: '10',
  }
  if (params?.categoryId) {
    obj.categoryId = params.categoryId
  }
  if (params?.name) {
    obj.name = params.name
  }
  if (params?.status !== undefined) {
    obj.status = params.status
  }
  const res = await getDishList(obj)
  tableData.value = res.records.map(x => {
    return {
      ...x,
      key: x.id,
    }
  })
  pageData.currentPage = page
  pageData.total = +res.total
}

const handlePaginationChange = async ({ current }: TablePaginationConfig) => {
  await getDishPageList(current!, _searchObj)
}

async function handleSearch() {
  const _s = toRaw(searchObj)
  const flag = Object.entries(_s).some(([k, v]) => !Object.is(v, _searchObj[k]))
  if (flag) {
    _searchObj = {..._s}
    await getDishPageList(1, _searchObj)
  }
}

function handleDishStatus(status: 0 | 1, id: number) {
  Modal.confirm({
    title: '提示',
    centered: true,
    content: '确认更改该菜品状态?',
    onOk: async () => {
      try {
        await updateDishStatus(status === 1 ? 0 : 1, id)
        await getDishPageList(pageData.currentPage, _searchObj)
        message.success('菜品状态已经更改成功！')
      } catch (err: any) {
        message.error(err.message)
      }
    },
  })
}

function handleTableRowSelection(selectedRowKeys: Key[]) {
  tableSelectionRow.value = selectedRowKeys
}

async function handleDeleteDishs(ids: string[]) {
  Modal.confirm({
    title: '确定删除',
    centered: true,
    content: '确认删除该菜品, 是否继续?',
    onOk: async () => {
      try {
        await deleteDishs(ids)
        await getDishPageList(pageData.currentPage, _searchObj)
        message.success('删除成功')
      } catch (err: any) {
        message.error(err.message)
      }
    },
  })
}

onMounted(async () => {
  const list = await getCategoryByType(1)
  dishCategoryList.value = list
  getDishPageList(1)
})

defineOptions({
  name: 'DishPage',
})
</script>

<style lang="scss" scoped>
.text-btn.no-right {
  &:disabled {
    opacity: 0.5;
  }
  &::after {
    width: 0;
  }
}
</style>