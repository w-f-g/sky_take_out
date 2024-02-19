import type { ColumnsType } from 'ant-design-vue/es/table'

export default {
  path: '/order',
  sort: 3,
  meta: {
    title: '订单管理',
    icon: 'icon-order',
  }
}

export const columns0: ColumnsType = [
  {
    title: '订单号',
    key: 'number',
    dataIndex: 'number',
  },
  {
    title: '订单状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '用户名',
    key: 'consignee',
    dataIndex: 'consignee',
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '下单时间',
    key: 'orderTime',
    dataIndex: 'orderTime',
  },
  {
    title: '实收金额',
    key: 'amount',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
    width: 230,
  },
]

export const columns2: ColumnsType = [
  {
    title: '订单号',
    key: 'number',
    dataIndex: 'number',
  },
  {
    title: '订单菜品',
    key: 'orderDishes',
    dataIndex: 'orderDishes',
    width: 200,
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '预计送达时间',
    key: 'estimatedDeliveryTime',
    dataIndex: 'estimatedDeliveryTime',
  },
  {
    title: '实收金额',
    key: 'amount',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '餐具数量',
    key: 'tablewareNumber',
    dataIndex: 'tablewareNumber',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
    width: 230,
  },
]

export const columns3: ColumnsType = [
  {
    title: '订单号',
    key: 'number',
    dataIndex: 'number',
  },
  {
    title: '订单菜品',
    key: 'orderDishes',
    dataIndex: 'orderDishes',
    width: 200,
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '预计送达时间',
    key: 'estimatedDeliveryTime',
    dataIndex: 'estimatedDeliveryTime',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '餐具数量',
    key: 'tablewareNumber',
    dataIndex: 'tablewareNumber',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
    width: 230,
  },
]

export const columns4: ColumnsType = columns3

export const columns5: ColumnsType = [
  {
    title: '订单号',
    key: 'number',
    dataIndex: 'number',
  },
  {
    title: '用户名',
    key: 'consignee',
    dataIndex: 'consignee',
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '送达时间',
    key: 'deliveryTime',
    dataIndex: 'deliveryTime',
  },
  {
    title: '实收金额',
    key: 'amount',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
  },
]

export const columns6: ColumnsType = [
  {
    title: '订单号',
    key: 'number',
    dataIndex: 'number',
  },
  {
    title: '用户名',
    key: 'consignee',
    dataIndex: 'consignee',
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '下单时间',
    key: 'orderTime',
    dataIndex: 'orderTime',
  },
  {
    title: '取消时间',
    key: 'cancelTime',
    dataIndex: 'cancelTime',
  },
  {
    title: '取消原因',
    key: 'cancelReason',
    dataIndex: 'cancelReason',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
  },
]