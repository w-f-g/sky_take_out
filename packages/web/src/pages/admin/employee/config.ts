import type { ColumnsType } from 'ant-design-vue/es/table'

export default {
  path: '/employee',
  sort: 7,
  meta: {
    title: '员工管理',
    icon: 'icon-employee',
  }
}

export const columns: ColumnsType = [
  {
    title: '员工姓名',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '账号',
    key: 'username',
    dataIndex: 'username',
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '账号状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '最后操作时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    align: 'center',
  },
]