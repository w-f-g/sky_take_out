<template>
  <Modal
    :open="open"
    title="订单信息"
    width="53%"
    centered
    style="min-width: 650px;"
    @cancel="emit('close')"
  >
    <div class="order-info-modal px-3 py-7">
      <div class="flex justify-between modal-header">
        <div class="flex">
          <div>
            <span class="text-[#818693] text-base">订单号：</span>
            <span class="text-base font-bold">{{ order.number }}</span>
          </div>
          <div
            :class="[
              'order-status',
              order.status === 3 || order.status === 4 ? 'bg-[#f56c6c]' : 'bg-[#333]'
            ]"
          >{{ orderStatus }}</div>
        </div>
        <div>下单时间：{{ order.orderTime }}</div>
      </div>
      <div class="order-user-info flex flex-wrap">
        <div class="flex-[60%]">
          <span class="text-[#666] mr-4">用户名：</span>
          <span>{{ order.userName }}</span>
        </div>
        <div class="flex-[40%]">
          <span class="text-[#666] mr-4">手机号：</span>
          <span>{{ order.phone }}</span>
        </div>
        <div class="flex-[100%] mt-3">
          <span class="text-[#666] mr-1">预计送达时间：</span>
          <span>{{ order.estimatedDeliveryTime }}</span>
        </div>
        <div class="flex-[100%] mt-3">
          <span class="text-[#666] mr-7">地址：</span>
          <span>{{ order.address }}</span>
        </div>
        <div v-if="order.status === 6" class="flex-[100%] order-tips cancel flex items-center">
          <span class="text-[#666] tips-label">取消原因</span>
          <span>{{ order.cancelReason || order.rejectionReason }}</span>
        </div>
        <div v-else class="flex-[100%] order-tips remark flex items-center">
          <span class="text-[#666] tips-label">备注</span>
          <span>{{ order.remark }}</span>
        </div>
      </div>
      <div class="order-dishs flex">
        <div class="text-[#666] w-[90px]">菜品</div>
        <div class="flex-1">
          <div class="flex flex-wrap mb-3">
            <div
              :key="item.id"
              v-for="item in order.orderDetailList"
              class="flex-[50%] flex"
            >
              <span class="w-32">{{ item.name }}×{{ item.number }}</span>
              <span>￥{{ item.amount }}</span>
            </div>
          </div>
          <div class="pt-[10px]">
            <span class="font-bold mr-1">菜品小计</span>
            <span class="text-[#f56c6c]">￥{{ dishAmounts }}</span>
          </div>
        </div>
      </div>
      <div class="px-10 pt-5 flex">
        <div class="text-[#666] w-[90px]">费用</div>
        <div class="flex-1 flex flex-wrap">
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">菜品小计：</span>
            <span>￥{{ dishAmounts }}</span>
          </div>
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">派送费：</span>
            <span>￥6</span>
          </div>
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">打包费：</span>
            <span>￥{{ order.packAmount }}</span>
          </div>
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">合计：</span>
            <span>￥{{ order.amount }}</span>
          </div>
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">支付渠道：</span>
            <span>{{ order.payMethod === 1 ? '微信支付' : '支付宝支付'}}</span>
          </div>
          <div class="flex-[50%] flex mb-3">
            <span class="w-[70px]">支付时间：</span>
            <span>{{ order.checkoutTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div v-if="order.status !== 6" class="modal-footer flex justify-between items-center">
        <div>
          <Checkbox
            v-if="next"
            v-model:checked="isNext"
          >处理完自动处理下一条</Checkbox>
        </div>
        <div>
          <Button
            size="large"
            class="cancel-btn"
            @click="emit('cancel', next && isNext)"
          >{{ order.status === 2 ? '拒单' : '返回' }}</Button>
          <PrimaryButton
            v-if="order.status !== 5"
            @click="handleOk"
          >{{ okText }}</PrimaryButton>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import type { IAdminOrderVO } from '@sky_take_out/types'
import { Modal, Button, Checkbox } from 'ant-design-vue'
import { computed, ref, toRefs } from 'vue'

type Props = {
  open: boolean,
  order: IAdminOrderVO,
  next?: boolean,
}
const statusMap: Record<string, string> = {
  '2': '待接单',
  '3': '待派送',
  '4': '派送中',
  '5': '已完成',
  '6': '已取消',
}

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'cancel', flag: boolean): void,
  (e: 'ok', flag: boolean): void,
}>()
const props = withDefaults(defineProps<Props>(), {
  next: false,
})
const { open, order, next } = toRefs(props)

const isNext = ref(true)
const dishAmounts = computed(() => {
  return order.value.orderDetailList.reduce((prev, item) => prev + item.amount, 0)
})
const okText = computed(() => {
  const status = order.value.status
  return status === 2
    ? '接单'
    : status === 3
      ? '派送'
      : '完成'
})
const orderStatus = computed(() => {
  const status = order.value.status
  return statusMap[status]
})

function handleOk() {
  emit('ok', next.value && isNext.value)
}
</script>

<style lang="scss" scoped>
.order-info-modal {
  height: 560px;
  color: #333;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    display: block;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(144,147,153,.5);
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  .modal-header {
    padding-bottom: 26px;
    padding-left: 22px;
    padding-right: 22px;
    border-bottom: 1px solid #e7e6e6;
  }
  .order-status {
    width: 57.25px;
    height: 27px;
    border-radius: 13.5px;
    color: #fff;
    margin-left: 20px;
    text-align: center;
    line-height: 27px;
  }
  .order-user-info {
    min-height: 140px;
    background: #fbfbfa;
    margin-top: 20px;
    padding: 20px 40px;
    .order-tips {
      min-height: 43px;
      line-height: 43px;
      border: 1px solid;
      border-radius: 4px;
      margin-top: 10px;
      padding: 6px;
      .tips-label {
        display: inline-block;
        min-width: 53px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        color: #333;
        margin-right: 30px;
      }  
      &.remark {
        background: #fffbf0;
        border-color: #fbe396;
        .tips-label {
          background: #fbe396;
          & + span {
            color: #f2a402;
            line-height: 1.15;
          }
        }
      }
      &.cancel {
        background: #ffffff;
        border-color: #b6b6b6;
        .tips-label {
          padding: 0 10px;
          background: #e5e4e4;
          & + span {
            color: #f56c6c;
            line-height: 1.15;
          }
        }
      }
    }
  }
  .order-dishs {
    padding: 20px 40px;
    border-bottom: 1px solid #e7e6e6;
  }
}
.modal-footer {
  .cancel-btn {
    font-size: 14px;
    color: #818693;
    &:hover {
      color: #ffd429;
    }
  }
}
</style>