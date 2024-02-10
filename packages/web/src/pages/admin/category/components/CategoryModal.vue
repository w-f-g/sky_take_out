<template>
  <Modal
    :open="open"
    :title="title"
    @cancel="emit('cancel')"
  >
    <Form
      ref="formRef"
      :rules="rules"
      class="add-dish-form"
      :model="formData"
      :label-col="{ span: 4 }"
    >
      <FormItem label="分类名称" name="categoryName">
        <Input class="h-[40px]" v-model:value="formData.categoryName" placeholder="请输入分类名称" size="large" />
      </FormItem>
      <FormItem label="排序" name="sort">
        <Input class="h-[40px]" v-model:value="formData.sort" placeholder="请输入排序" size="large" />
      </FormItem>
    </Form>
    <template #footer>
      <Button class="h-[36px]" @click="emit('cancel')">取消</Button>
      <component :is="!id ? NormalButton : PrimaryButton" class="h-[36px]" size="default" @click="handleSubmit">确定</component>
      <PrimaryButton v-if="!id" class="h-[36px]" size="default" @click="handleAddAgain">保存并继续添加</PrimaryButton>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs, watchEffect } from 'vue'
import { Modal, Button, Form, FormItem, Input, type FormInstance, message } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import { addCategory, editCategory } from '@/api/category'
import type { IEditCategoryDTO } from '@sky_take_out/types'

type TFormData = {
  categoryName: string,
  sort: string,
}

type Props = {
  open: boolean,
  type: 1 | 2,
  id?: number,
  name?: string,
  sort?: string,
}

const emit = defineEmits(['ok', 'cancel'])
const props = defineProps<Props>()
const { open, type, id, name, sort } = toRefs(props)

const loading = ref(false)
const formRef = ref<FormInstance>()
const formData = reactive<TFormData>({
  categoryName: '',
  sort: '',
})
const rules: Record<keyof TFormData, RuleObject[]> = {
  categoryName: [
    {
      required: true,
      validator(rule, value) {
        const reg = new RegExp('^[A-Za-z\u4e00-\u9fa5]+$')
        if (!value) {
          return Promise.reject(`${type.value === 1 ? '菜品' : '套餐'}分类名称不能为空`)
        } else if (value.length < 2 || value.length > 20) {
          return Promise.reject('分类名称输入不符，请输入2-20个字符')
        } else if (!reg.test(value)) {
          return Promise.reject('分类名称包含特殊字符')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur',
    },
  ],
  sort: [
    {
      required: true,
      validator(rule, value) {
        const reg = new RegExp('^\\d+$')
        if (value) {
          if (!reg.test(value)) {
            return Promise.reject('排序只能输入数字类型')
          } else if (Number(value) > 99) {
            return Promise.reject('排序只能输入0-99数字')
          } else {
            return Promise.resolve()
          }
        } else {
          return Promise.reject('排序不能为空')
        }
      },
      trigger: 'blur',
    },
  ],
}

const title = computed(() => {
  if (id.value) {
    return '编辑分类'
  }
  return `新增${type.value === 1 ? '菜品' : '套餐'}分类`
})

watchEffect(() => {
  formData.categoryName = name.value || ''
  formData.sort = sort.value || ''
})

function _submit() {
  return new Promise((resolve, reject) => {
    loading.value = true
    formRef.value?.validate()
      .then(async () => {
        // @ts-ignore
        // 当初写接口的时候傻逼了
        const params = {
          name: formData.categoryName,
          sort: formData.sort,
          type: type.value + '',
        } as IEditCategoryDTO
        try {
          if (id.value) {
            params.id = id.value
            await editCategory(params)
          } else {
            await addCategory(params)
          }
          message.success('操作成功')
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
      .finally(() => {
        loading.value = false
      })
  })
}

async function handleSubmit() {
  try {
    await _submit()
    emit('ok')
  } catch (err: any) {
    message.error(err.message)
  }
}

async function handleAddAgain() {
  try {
    await _submit()
    formData.categoryName = ''
    formData.sort = ''
  } catch (err: any) {
    message.error(err.message)
  }
}
</script>

<style lang="scss" scoped>
.add-dish-form {
  padding: 30px 10px 0;
}
</style>