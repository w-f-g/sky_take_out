import { Modal, message } from 'ant-design-vue'
import CancelForm from './CancelForm.vue'
import { cancelOrder, rejectionOrder } from '@/api'

const rejectionOrderReasonList = [
  {
    value: 1,
    label: '订单量较多，暂时无法接单',
  },
  {
    value: 2,
    label: '菜品已销售完，暂时无法接单',
  },
  {
    value: 3,
    label: '骑手不足无法配送',
  },
  {
    value: 4,
    label: '客户电话取消',
  },
  {
    value: 0,
    label: '自定义原因',
  },
]

export const cancelOrderModal = (id: number) => {
  let cancelReason = ''
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: '取消原因',
      icon: null,
      width: '42%',
      style: {
        minWidth: '560px',
      },
      content: () => {
        return (
          <CancelForm
            title="取消原因"
            orderReasonList={rejectionOrderReasonList}
            // @ts-ignore
            onChange={(val: string) => cancelReason = val}
          />
        )
      },
      onOk: async () => {
        try {
          await cancelOrder(id, cancelReason)
          message.success('操作成功')
        } catch (err: any) {
          message.error(err.message)
        }
        resolve(true)
      },
      onCancel: () => {
        reject()
      }
    })
  })
}

const cancelOrderReasonList = [
  {
    value: 1,
    label: '订单量较多，暂时无法接单',
  },
  {
    value: 2,
    label: '菜品已销售完，暂时无法接单',
  },
  {
    value: 3,
    label: '餐厅已打烊，暂时无法接单',
  },
  {
    value: 0,
    label: '自定义原因',
  },
]

export const rejectionOrderModal = (id: number) => {
  let rejectionReason = ''
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: '拒绝原因',
      icon: null,
      width: '42%',
      style: {
        minWidth: '560px',
      },
      content: () => {
        return (
          <CancelForm
            title="拒绝原因"
            orderReasonList={cancelOrderReasonList}
            // @ts-ignore
            onChange={(val: string) => rejectionReason = val}
          />
        )
      },
      onOk: async () => {
        try {
          await rejectionOrder(id, rejectionReason)
          message.success('操作成功')
        } catch (err: any) {
          message.error(err.message)
        }
        resolve(true)
      },
      onCancel: () => {
        reject()
      }
    })
  })
}