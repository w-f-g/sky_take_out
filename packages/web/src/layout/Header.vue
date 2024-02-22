<template>
  <header class="sky-header flex">
    <section class="flex">
      <div :class="['logo-view', opened && 'is-opened']">
        <img 
          alt="logo"
          :class="['logo', opened && 'is-opened']"
          :src="opened ? logoPng : miniLogoPng" 
        >
      </div>
      <div
        @click="toggleSideBar"
        class="flex items-center cursor-pointer pl-5 pr-3"
      >
        <MenuFoldOutlined class="icon" v-if="opened" />
        <MenuUnfoldOutlined class="icon" v-else />
      </div>
    </section>
    <NavBar />
    <ContextHolder />
    <audio ref="audio1">
      <source src="@/assets/preview.mp3" />
    </audio>
    <audio ref="audio2">
      <source src="@/assets/reminder.mp3" />
    </audio>
  </header>
</template>

<script setup lang="tsx">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useSidebar } from '@/hooks/sidebar'
import logoPng from '@/assets/login/logo.png'
import miniLogoPng from '@/assets/login/mini-logo.png'
import NavBar from './NavBar.vue'
import { onMounted, ref } from 'vue'
import { orderSocket } from '@/utils'
import { notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const [api, ContextHolder] = notification.useNotification()
const { opened, toggleSideBar } = useSidebar()
const router = useRouter()

const audio1 = ref<HTMLAudioElement>()
const audio2 = ref<HTMLAudioElement>()

onMounted(async () => {
  try {
    await orderSocket.connect()
    orderSocket.listen((e) => {
      const key = 'message_order_' + e.orderId
      const isNotOrderPage = router.currentRoute.value.path !== '/order'
      audio1.value!.currentTime = 0
      audio2.value!.currentTime = 0
      if (e.type === 1) {
        audio1.value!.play()
      } else {
        audio2.value!.play()
      }
      api.info({
        key,
        message: e.type === 1 ? '待接单' : '催单',
        duration: !isNotOrderPage ? 3 : null,
        description: () => {
          if (e.type === 1) {
            return (
              <div>您有1个<span style="color: #419EFF;">待处理</span>,{e.content},请及时接单</div>
            )
          }
          return (
            <div>{e.content},<span style="color: #419EFF; cursor: pointer;">去处理</span></div>
          )
        },
        onClick() {
          if (isNotOrderPage) {
            router.push('/order?status=2')
          }
          api.destroy(key)
        }
      })
    })
  } catch (err: any) {
    notification.error({
      message: '错误',
      description: '服务器错误，无法接收实时报警信息',
      duration: 2,
    })
  }
})

defineOptions({
  name: 'SkyHeader'
})
</script>

<style lang="scss" scoped>
.sky-header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #ffc100;
  .logo-view {
    width: 80px;
    text-align: center;
    background-color: #ffc100;
    padding: 15px 0 0;
    height: 60px;
    transition: width .28s;
    &.is-opened {
      width: 190px;
    }
    .logo {
      width: 30px;
      height: 30px;
      display: inline-block;
      &.is-opened {
        width: 120px;
        height: 31px;
      }
    }
  }
  .icon {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
</style>