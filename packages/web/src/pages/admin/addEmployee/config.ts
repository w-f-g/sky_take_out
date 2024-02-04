import type { IAddEmployeeDTO } from '@sky_take_out/types'
import type { RuleObject } from 'ant-design-vue/es/form'

export default {
  path: '/employee/add',
  meta: {
    title: '添加员工',
    hidden: true,
  }
}

export const addEmployeeFormRules: Record<keyof Omit<IAddEmployeeDTO, 'sex'>, RuleObject[]> = {
  name: [
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{1,12}$/, message: '姓名输入不符，请输入1-12个字符', trigger: 'blur' },
  ],
  idNumber: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码不正确', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号!', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^([a-z]|[0-9]){3,20}$/, message: '账号输入不符，请输入3-20个字符', trigger: 'blur' },
  ]
}