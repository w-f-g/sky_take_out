import type { ISetmealAddDTO } from '@sky_take_out/types'
import type { RuleObject } from 'ant-design-vue/es/form'

export default {
  path: '/setmeal/add',
  meta: {
    title: '添加套餐',
    hidden: true,
  }
}

type RuleKey = Omit<ISetmealAddDTO, 'status' | 'description'>

export const addSetmealFormRules: Record<keyof RuleKey, RuleObject[]> = {
  name: [
    { required: true, message: '请输入套餐名称', trigger: 'blur' },
    { pattern: /^([A-Za-z0-9\u4e00-\u9fa5]){2,20}$/, message: '名称套餐输入不符，请输入2-20个字符', trigger: 'blur' },
  ],
  categoryId: [
    { required: true, message: '请选择套餐分类', trigger: 'change' },
  ],
  price: [
    {
      required: true,
      validator(rule, value) {
        const reg = new RegExp('^([1-9]\\d{0,5}|0)(\\.\\d{1,2})?$')
        if (!reg.test(value) || Number(value) <= 0) {
          return Promise.reject('套餐价格格式有误，请输入大于零且最多保留两位小数的金额')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur',
    },
  ],
  setmealDishes: [
    { required: true, message: '请选择套餐菜品' }
  ],
  image: [
    { required: true, message: '套餐图片不能为空' },
  ],
}