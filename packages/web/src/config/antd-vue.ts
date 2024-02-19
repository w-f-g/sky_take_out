import type { ConfigProviderProps, ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const antdThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#FFC200',
  }
}

const antdConfig: ConfigProviderProps = {
  theme: antdThemeConfig,
  locale: zhCN,
}
export default antdConfig