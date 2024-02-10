<template>
  <div class="employee-add">
    <HeadLabel :title="!id ? '添加员工' : '编辑员工'" goback />
    <div class="container-box" style="padding: 30px 30px 40px;">
      <Form
        ref="formRef"
        :model="formData"
        :rules="addEmployeeFormRules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 7 }"
      >
        <FormItem label="账号" name="username">
          <Input class="h-[40px]" v-model:value="formData.username" placeholder="请输入账号" size="large" />
        </FormItem>
        <FormItem label="员工姓名" name="name">
          <Input class="h-[40px]" v-model:value="formData.name" placeholder="请输入员工姓名" size="large" />
        </FormItem>
        <FormItem label="手机号" name="phone">
          <Input class="h-[40px]" v-model:value="formData.phone" placeholder="请输入手机号" size="large" />
        </FormItem>
        <FormItem label="性别" name="sex">
          <RadioGroup v-model:value="formData.sex" class="h-[40px] flex items-center">
            <Radio value="1">男</Radio>
            <Radio value="0">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="身份证号" name="idNumber">
          <Input class="h-[40px]" v-model:value="formData.idNumber" placeholder="请输入身份证号" size="large" />
        </FormItem>
      </Form>
      <div class="flex justify-center actions">
        <Button size="large" @click="router.push('/employee')">取消</Button>
        <NormalButton @click="handleSave(false)">保存</NormalButton>
        <PrimaryButton @click="handleSave(true)" v-if="!id">保存并继续</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Button, Radio, RadioGroup, type FormInstance, message } from 'ant-design-vue'
import NormalButton from '@/components/Button/NormalButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import HeadLabel from '@/components/HeadLabel/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, ref, toRaw } from 'vue'
import type { IAddEmployeeDTO } from '@sky_take_out/types'
import { addEmployeeFormRules } from './config'
import { editEmployee, addEmployee, getEmployeeInfo } from '@/api/employee'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.query.id as string)
const formRef = ref<FormInstance>()
const formData = reactive<IAddEmployeeDTO>({
  name: '',
  idNumber: '',
  phone: '',
  sex: '1',
  username: '',
})

function _handleSave() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate()
      .then(async () => {
        try {
          const data = toRaw(formData)
          const isAdd = !id.value
          if (isAdd) {
            await addEmployee(data)
          } else {
            await editEmployee({
              id: +id.value,
              ...data,
            })
          }
          message.success(`员工${isAdd ? '添加' : '信息修改'}成功`)
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
      formData.idNumber = ''
      formData.name = ''
      formData.phone = ''
      formData.sex = '1'
      formData.username = ''
    } else {
      router.push('/employee')
    }
  })
}

defineExpose({
  formData,
})
defineOptions({
  name: 'AddEmployee',
  async beforeRouteEnter(to, from, next) {
    const id = to.query.id as string
    if (id) {
      try {
        const employee = await getEmployeeInfo(id)
        next((vm: any) => {
          vm.formData.idNumber = employee.idNumber
          vm.formData.name =  employee.name
          vm.formData.phone =  employee.phone
          vm.formData.sex =  employee.sex
          vm.formData.username =  employee.username
        })
      } catch (err: any) {
        message.error(err.message)
        next({
          path: '/employee/add',
          replace: true,
        })
      }
    } else {
      next()
    }
  },
})
</script>

<style lang="scss" scoped>
.employee-add {
  transform: translateY(-20px);
  padding:0 10px 10px;
  .HeadLabel {
    background-color: transparent;
    margin-bottom: 0px;
    padding-left: 0px;
  }
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
}
</style>