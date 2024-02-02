<template>
  <Modal
    :open="open"
    class="password-modal"
    ok-text="保存"
    :ok-button-props="{ size: 'large', loading }"
    cancel-text="取消"
    :cancel-button-props="{ size: 'large' }"
    title="修改密码"
    @ok="handleOk"
    @cancel="emit('cancel')"
  >
    <Form
      class="mt-[60px] password-modal-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      autocomplete="off"
      :model="passwordForm"
      ref="formRef"
      :rules="formRules"
    >
      <FormItem name="oldPassword" label="原始密码">
        <Input
          size="large"
          type="password"
          placeholder="请输入"
          v-model:value="passwordForm.oldPassword"
        />
      </FormItem>
      <FormItem name="newPassword" label="新密码">
        <Input
          size="large"
          type="password"
          v-model:value="passwordForm.newPassword"
          placeholder="6 - 20位密码，数字或字母，区分大小写"
        />
      </FormItem>
      <FormItem name="newPasswordAgain" label="确认密码">
        <Input
          size="large"
          type="password"
          placeholder="请输入"
          v-model:value="passwordForm.newPasswordAgain"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { editEmployeePassword } from '@/api'
import { useUserInfo } from '@/hooks/user'
import { Form, FormItem, Input, Modal, type FormInstance, message } from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import { reactive, ref, toRefs } from 'vue'

const props = defineProps<{
  open: boolean,
}>()
const { open } = toRefs(props)

const { id } = useUserInfo()

const formRef = ref<FormInstance>()
const loading = ref(false)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordAgain: '',
})
const formRules: Record<string, RuleObject[]> = {
  oldPassword: [
    { required: true, message: '请输入原始密码', trigger: 'blur' },
    { pattern: /^[0-9A-Za-z]{6,20}$/, message: '6 - 20位密码，数字或字母，区分大小写', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^[0-9A-Za-z]{6,20}$/, message: '6 - 20位密码，数字或字母，区分大小写', trigger: 'blur' },
  ],
  newPasswordAgain: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^[0-9A-Za-z]{6,20}$/, message: '6 - 20位密码，数字或字母，区分大小写', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        if (value !== passwordForm.newPassword) {
          callback('密码不一致，请重新输入密码')
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const emit = defineEmits(['ok', 'cancel'])

function handleOk() {
  loading.value = true
  formRef.value?.validate()
    .then(async () => {
      try {
        await editEmployeePassword({
          empId: +id.value,
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        })
        message.success('修改成功')
        emit('ok')
      } catch (err: any) {
        message.error(err.message)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

</script>

<style lang="scss">
.password-modal-form {
  .ant-form-item .ant-form-item-label > label {
    height: 40px;
  }
}
</style>