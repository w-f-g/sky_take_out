<template>
  <div class="container-box add-dish">
    <Form
      ref="formRef"
      :model="formData"
      :rules="addSetmealFormRules"
      label-align="right"
    >
      <div class="flex">
        <FormItem label="套餐名称" name="name">
          <Input
            class="h-[40px]"
            style="width: 350px;"
            placeholder="请填写套餐名称"
            v-model:value="formData.name"
          />
        </FormItem>
        <FormItem label="套餐分类" name="categoryId">
          <Select
            size="large"
            allow-clear
            style="width: 300px;"
            placeholder="请选择套餐分类"
            v-model:value="formData.categoryId"
          >
            <SelectOption
              v-for="item in setmealCategoryList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </SelectOption>
          </Select>
        </FormItem>
      </div>
      <FormItem label="套餐价格" name="price">
        <Input
          class="h-[40px]"
          style="width: 350px;"
          placeholder="请设置套餐价格"
          v-model:value="formData.price"
        />
      </FormItem>
      <FormItem label="套餐菜品" name="setmealDishes">
        <PrimaryButton @click="addSetmealDishOpen = true">+ 添加口味</PrimaryButton>
        <template v-if="formData.setmealDishes.length > 0">
          <Table
            class="setmeal-dishs-table"
            style="width: 720px; margin-top: 10px;"
            :columns="columns"
            :data-source="formData.setmealDishes"
            :pagination="false"
          >
            <template #bodyCell="{ column, record, index }">
              <div v-if="column.key === 'copies'">
                <FormItemRest>
                  <InputNumber v-model:value="record.copies" :min="1" :max="99" />
                </FormItemRest>
              </div>
              <div
                class="delBut cursor-pointer"
                v-else-if="column.key === 'action'"
                @click="handleDeleteSetmealDish(index)"
              >删除</div>
            </template>
          </Table>
        </template>
      </FormItem>
      <FormItem label="套餐图片" name="image">
        <SkyUpload v-model="formData.image" />
      </FormItem>
      <FormItem label="套餐描述" name="description">
        <Textarea
          show-count
          :maxlength="200"
          :autoSize="{ maxRows: 3 }"
          placeholder="套餐描述，最长200字"
          v-model:value="formData.description"
          style="width: 750px; min-height: 40px;"
        />
      </FormItem>
    </Form>
    <div class="flex justify-center actions">
      <Button size="large" @click="router.back()">取消</Button>
      <NormalButton @click="handleSave(false)">保存</NormalButton>
      <PrimaryButton @click="handleSave(true)" v-if="!id">保存并继续</PrimaryButton>
    </div>
    <AddSetmealDishModal v-model:open="addSetmealDishOpen" v-model:setmealDishs="formData.setmealDishes" />
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Button, type FormInstance, message, Select, SelectOption, Textarea, Table, InputNumber, FormItemRest } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'
import { getCategoryByType, type TSelectOptions } from '@/api/category'
import SkyUpload from '@/components/SkyUpload/index.vue'
import { addSetmealFormRules } from './config'
import { addSetmeal, editSetmeal, getSetmealInfo } from '@/api/setmeal'
import AddSetmealDishModal from './components/AddSetmealDishModal.vue'
import type { TSetmealDish } from './type'
import type { ColumnsType } from 'ant-design-vue/es/table'
import type { ISetmealAddDTO } from '@sky_take_out/types'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.query.id as string)
const setmealCategoryList = shallowRef<TSelectOptions>([])
const formRef = ref<FormInstance>()
const formData = reactive({
  name: '',
  categoryId: '',
  price: '',
  image: '',
  description: '',
  status: 0,
  setmealDishes: [] as TSetmealDish[],
})
const addSetmealDishOpen = ref(false)
const columns:  ColumnsType = [
  {
    title: '名称',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '原价',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '份数',
    key: 'copies',
    dataIndex: 'copies',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
  },
]

function handleDeleteSetmealDish(index: number) {
  formData.setmealDishes.splice(index, 1)
}

function _handleSave() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate()
      .then(async () => {
        try {
          const isAdd = !id.value
          const data: ISetmealAddDTO = {
            // @ts-ignore
            setmealDishes: formData.setmealDishes,
            name: formData.name,
            categoryId: +formData.categoryId,
            price: +formData.price,
            image: formData.image,
            description: formData.description,
            status: formData.status,
          }
          if (isAdd) {
            await addSetmeal(data)
          } else {
            // @ts-ignore
            await editSetmeal({
              ...data,
              id: +id.value,
            })
          }
          message.success(`套餐${isAdd ? '添加' : '修改'}成功`)
          resolve(true)
        } catch (err: any) {
          message.error(err.message)
          reject(err)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

function handleSave(flag: boolean) {
  _handleSave().then(() => {
    if (flag) {
      formData.name = ''
      formData.categoryId = ''
      formData.price = ''
      formData.image = ''
      formData.description = ''
      formData.setmealDishes = []
      formData.status = 0
    } else {
      router.push('/setmeal')
    }
  })
}

onMounted(async () => {
  const list = await getCategoryByType(2)
  setmealCategoryList.value = list
})

defineExpose({
  formData,
})

defineOptions({
  name: 'AddDishPage',
  async beforeRouteEnter(to, from, next) {
    const id = to.query.id as string
    if (id) {
      try {
        // 根据id查询套餐数据
        const res = await getSetmealInfo(id)
        next((vm: any) => {
          vm.formData.name = res.name
          vm.formData.categoryId = res.categoryId
          vm.formData.price = res.price
          vm.formData.image = res.image
          vm.formData.description = res.description
          vm.formData.status = res.status
          vm.formData.setmealDishes = res.setmealDishes
        })
      } catch (err: any) {
        message.error(err.message)
        next({
          path: '/dish/add',
          replace: true,
        })
      }
    } else {
      next()
    }
  }
})
</script>

<style lang="scss" scoped>
.add-dish {
  padding: 30px;
  .actions {
    transform: translateY(10px);
    padding-top: 30px;
    border-top: 1px solid #f3f4f7;
    :deep(.ant-btn) {
      margin-left: 0;
      margin-right: 10px;
      font-size: 14px;
    }
  }

  :deep(.ant-form-item .ant-form-item-label > label) {
    width: 180px;
    justify-content: flex-end;
  }
  :deep(textarea.ant-input) {
    line-height: 32px;
  }
  .setmeal-dishs-table {
    :deep(.ant-table-content) {
      border-top: 1px solid #f0f0f0;
      border-left: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
    }
  }
}
</style>