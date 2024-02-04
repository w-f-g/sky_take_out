<template>
  <div class="HeadLabel">
    <span
      v-if="goback"
      class="goBack"
      @click="goBack"
    ><img
      src="@/assets/icons/btn_back@2x.png"
      alt=""
    > 返回</span>
    <span v-if="!butList">{{ title }}</span>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
type Props = {
  goback?: boolean,
  butList?: boolean,
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  goback: false,
  butList: false,
})
const { goback, butList, title } = toRefs(props)

function goBack() {
  router.back()
}

defineOptions({
  name: 'HeadLabel',
})
</script>

<style lang="scss" scoped>
  .HeadLabel{
    // position: absolute;
    background: #fff;
    color: #333333;
    height: 64px;
    font-size: 16px;
    // width: 300px;
    padding-left: 22px;
    line-height: 64px;
    font-weight: 700;
    margin-bottom: 15px;
    top:0px;
    left: 0px;
    opacity: 0;
    animation: opacity 500ms ease-out 800ms forwards;
    .goBack{
      border-right: solid 1px #d8dde3;
      padding-right: 14px;
      margin-right: 14px;
      font-size: 16px;
      color: #333333;
      cursor: pointer;
      font-weight: 400;
      img{
        position: relative;
        top:24px;
        margin-right: 5px;
        width: 18px;
        height: 18px;
        float: left;
      }
    }
  }
  @keyframes opacity {
     0% {
       opacity: 0;
       left: 80px;
     }
     100% {
       opacity: 1;
       left: 0;
     }
   }
</style>
