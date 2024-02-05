import type { ColumnsType } from 'ant-design-vue/es/table'

export default {
  path: '/category',
  sort: 6,
  meta: {
    title: '分类管理',
    icon: 'icon-category',
  }
}

export const columns: ColumnsType = [
  {
    title: '分类名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '分类类型',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: '排序',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: 250,
    align: 'center',
  },
]