import type { ColumnsType } from 'ant-design-vue/es/table'

export default {
  path: '/setmeal',
  sort: 4,
  meta: {
    title: '套餐管理',
    icon: 'icon-combo',
  }
}

export const columns: ColumnsType = [
  {
    title: '套餐名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '图片',
    key: 'image',
    dataIndex: 'image',
  },
  {
    title: '套餐分类',
    key: 'categoryName',
    dataIndex: 'categoryName',
  },
  {
    title: '套餐价',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: '售卖状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '最后操作时间',
    key: 'updateTime',
    width: 200,
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 250,
    align: 'center',
    dataIndex: 'action',
  },
]