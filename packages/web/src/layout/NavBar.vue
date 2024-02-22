<template>
  <nav class="flex-1 flex justify-between">
    <div class="h-full flex items-center">
      <div :class="['businessBtn', !status && 'closing']">
        {{ status ? '营业中' : '打烊中' }}
      </div>
    </div>
    <div class="h-full flex-1 flex justify-end right-menu">
      <div class="shop-status-btn h-full" @click="shopStatusModalOpen = true">
        <i></i>
        <span>营业状态设置</span>
      </div>
      <div class="avatar-wrapper">
        <div class="avatar">
          <div class="user-info">
            <span>{{ name }}</span>
            <CaretDownOutlined class="down-icon" />
            <CaretUpOutlined class="up-icon hidden" />
          </div>
          <ul class="menu">
            <li class="menu-item" @click="shopPasswordModalOpen = true">
              <span>修改密码</span>
              <LockOutlined />
            </li>
            <li class="menu-item" @click="handleLogout">
              <span>退出登录</span>
              <PoweroffOutlined />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ShopStatusModal
      :open="shopStatusModalOpen"
      @ok="shopStatusModalOpen = false"
      @cancel="shopStatusModalOpen = false"
    />
    <PasswordModal
      :open="shopPasswordModalOpen"
      @ok="shopPasswordModalOpen = false"
      @cancel="shopPasswordModalOpen = false"
    />
  </nav>
</template>

<script setup lang="ts">
import { useUserInfo } from '@/hooks/user'
import { useShopStore } from '@/stores/shop'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { CaretDownOutlined, CaretUpOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import ShopStatusModal from './components/ShopStatusModal.vue'
import PasswordModal from './components/PasswordModal.vue'
import { orderSocket } from '@/utils'

const router = useRouter()

const shopStore = useShopStore()
const { status } = storeToRefs(shopStore)
const { getShopStatus } = shopStore

const { employeeLogout } = useUserStore()
const { name } = useUserInfo()

const shopStatusModalOpen = ref(false)
const shopPasswordModalOpen = ref(false)

async function handleLogout() {
  await employeeLogout()
  orderSocket.close()
  router.push('/login')
}

onMounted(() => {
  getShopStatus()
})
</script>

<style lang="scss" scoped>
nav {
  height: 100%;
  .businessBtn {
    height: 22px;
    line-height: 20px;
    background: #fd3333;
    border: 1px solid #ffffff;
    border-radius: 4px;
    display: inline-block;
    padding: 0 6px;
    color: #fff;
    &.closing {
      background: #6a6a6a;
    }
  }
  .right-menu {
    font-size: 14px;
    .shop-status-btn {
      width: 130px;
      padding: 0 10px;
      line-height: 60px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.52);
      }
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: sub;
        margin: 0 4px 0 0;
        background: url('@/assets/icons/time.png') no-repeat;
        background-size: contain;
      }
    }
    .avatar-wrapper {
      margin-right: 20px;
      margin-top: 14px;
      margin-left: 18px;
      position: relative;
      text-align: left;
      color: #333;
      .avatar {
        height: 32px;
        &:hover {
          height: auto;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
          border-radius: 4px;
          .user-info {
            border-radius: 4px 4px 0 0;
            background-color: #fff;
            .down-icon {
              display: none;
            }
            .up-icon {
              display: block;
            }
          }
          .menu {
            display: block;
          }
        }
        .user-info {
          width: 120px;
          height: 32px;
          line-height: 32px;
          padding-left: 12px;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.52);
          position: relative;
          .up-icon,
          .down-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .menu {
          background-color: #fff;
          padding: 0 5px 5px;
          display: none;
          .menu-item {
            cursor: pointer;
            height: 32px;
            line-height: 32px;
            padding: 0 5px 0 7px;
            display: flex;
            justify-content: space-between;
            &:hover {
              background-color: #f6f1e1;
            }
          }
        }
      }
    }
  }
}
</style>