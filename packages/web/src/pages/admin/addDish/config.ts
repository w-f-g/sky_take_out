import type { IAddDish } from '@sky_take_out/types'
import type { RuleObject } from 'ant-design-vue/es/form'

export default {
  path: '/dish/add',
  meta: {
    title: '添加菜品',
    hidden: true,
  }
}

type RuleKey = Omit<IAddDish, 'status' | 'description' | 'flavors'>

export const addDishFormRules: Record<keyof RuleKey, RuleObject[]> = {
  name: [
    { required: true, message: '请输入菜品名称', trigger: 'blur' },
    { pattern: /^([A-Za-z0-9\u4e00-\u9fa5]){2,20}$/, message: '菜品名称输入不符，请输入2-20个字符', trigger: 'blur' },
  ],
  categoryId: [
    { required: true, message: '请选择菜品分类', trigger: 'change' },
  ],
  price: [
    {
      required: true,
      validator(rule, value) {
        const reg = new RegExp('^([1-9]\\d{0,5}|0)(\\.\\d{1,2})?$')
        if (!reg.test(value) || Number(value) <= 0) {
          return Promise.reject('菜品价格格式有误，请输入大于零且最多保留两位小数的金额')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur',
    },
  ],
  image: [
    { required: true, message: '菜品图片不能为空' },
  ],
}