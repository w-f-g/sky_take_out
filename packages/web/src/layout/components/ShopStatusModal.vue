<template>
  <Modal
    :open="open"
    ok-text="确定"
    cancel-text="取消"
    title="营业状态设置"
    :closable="false"
    @ok="handleOk"
    @cancel="emit('cancel')"
  >
    <div class="shop-status-content">
      <div class="shop-status-item">
        <input type="radio" v-model="shopStatus" id="shop-status-1" name="shop-status" value="1" hidden />
        <label for="shop-status-1">
          <div class="title">营业中</div>
          <div class="desc">当前餐厅处于营业状态，自动接收任何订单，可点击打烊进入店铺打烊状态。</div>
        </label>
      </div>
      <div class="shop-status-item">
        <input type="radio" v-model="shopStatus" id="shop-status-0" name="shop-status" value="0" hidden />
        <label for="shop-status-0">
          <div class="title">打烊中</div>
          <div class="desc">当前餐厅处于打烊状态，仅接受营业时间内的预定订单，可点击营业中手动恢复营业状态。</div>
        </label>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { updateShopStatus } from '@/api/shop'
import { useShopStore } from '@/stores/shop'
import { Modal } from 'ant-design-vue'
import { ref, toRefs } from 'vue'

const props = defineProps<{
  open: boolean,
}>()
const { open } = toRefs(props)

const { status, getShopStatus } = useShopStore()
const shopStatus = ref<'0' | '1'>(status ? '1' : '0')

const emit = defineEmits(['ok', 'cancel'])

async function handleOk() {
  await updateShopStatus(shopStatus.value)
  await getShopStatus()
  emit('ok')
}
</script>

<style lang="scss" scoped>
.shop-status {
  &-item {
    margin-top: 20px;

    input[type="radio"]:checked + label {
      border: 1px solid #ffc200;
    }

    label {
      display: block;
      background-color: #fbfbfa;
      border: 1px solid #e5e4e4;
      border-radius: 4px;
      padding: 14px 22px;
      .title {
        font-weight: 700;
        color: #333;
      }
      .desc {
        line-height: 20px;
        padding-top: 12px;
        color: #666;
      }
    }
  }
}
</style>