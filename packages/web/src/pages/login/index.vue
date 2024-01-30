<template>
  <div class="login">
    <div class="login-box">
      <img src="@/assets/login/login-l.png" alt="">
      <div class="login-form">
        <Form class="a-form" :model="loginForm" ref="formRef" :rules="loginFormRlues">
          <div class="login-form-title">
            <img src="@/assets/login/icon_logo.png" style="width: 149px; height: 38px;" alt="" />
          </div>
          <FormItem name="username" class="login-form-item">
            <Input v-model:value="loginForm.username" :bordered="false" autocomplete="off" type="text" placeholder="帐号">
            <template #prefix>
              <UserOutlined />
            </template>
            </Input>
          </FormItem>
          <FormItem name="password" class="login-form-item">
            <Input v-model:value="loginForm.password" @keyup.enter="handleSubmit" :bordered="false" autocomplete="off"
              type="password" placeholder="密码">
            <template #prefix>
              <LockOutlined />
            </template>
            </Input>
          </FormItem>
          <FormItem>
            <Button class="login-btn" @click="handleSubmit" :loading="loadding">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Button, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref, toRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { useRouter } from 'vue-router'

type TLoginForm = Record<'username' | 'password', string>

defineOptions({
  name: 'LoginPage',
})

const formRef = ref<FormInstance>()
const loginForm = reactive<TLoginForm>({
  username: '',
  password: '',
})
const loadding = ref(false)

const { setUserInfo } = useUserStore()
const router = useRouter()

const loginFormRlues: Record<keyof TLoginForm, Rule[]> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ min: 6, message: '密码必须在6位以上', trigger: 'blur' }],
}

function handleSubmit() {
  loadding.value = true
  formRef.value?.validate()
    .then(async () => {
      const params = toRaw(loginForm)
      try {
        await setUserInfo(params)
        message.success('登录成功')
        router.replace('/')
      } catch (err: any) {
        message.error(err.message)
      }
    })
    .finally(() => {
      loadding.value = false
    })
}

</script>

<style lang="scss" scoped>
.login {
  @apply flex justify-center items-center h-full;
  background-color: #333;
}

.login-box {
  width: 1000px;
  height: 474.38px;
  border-radius: 8px;
  display: flex;

  img {
    width: 60%;
    height: auto;
  }
}

.login-form {
  background: #ffffff;
  width: 40%;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  &-item {
    border-bottom: 1px solid #e9e9e8;

    .ant-input-affix-wrapper {
      padding: 0;

      :deep(.ant-input-prefix) {
        margin-right: 12px;
      }
    }
  }

  .a-form {
    width: 214px;
    height: 307px;
  }

  .ant-form-item {
    margin-bottom: 30px;
  }

  .el-form-item.is-error .el-input__inner {
    border: 0 !important;
    border-bottom: 1px solid #fd7065 !important;
    background: #fff !important;
  }

  :deep(.ant-input) {
    border: 0;
    border-radius: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    height: 32px;
    line-height: 32px;
  }

  .ant-input::placeholder {
    color: #aeb5c4;
  }
}

.login-btn {
  height: 34px;
  border-radius: 17px;
  padding: 11px 20px !important;
  margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
  border: 0;
  line-height: 1;
  font-weight: 500;
  color: #333333;
  background-color: #ffc200;
  width: 100%;

  &:hover,
  &:focus {
    background-color: #ffc200;
    color: #ffffff;
  }
}

.login-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  .title-label {
    font-weight: 500;
    font-size: 20px;
    color: #333333;
    margin-left: 10px;
  }
}
</style>
