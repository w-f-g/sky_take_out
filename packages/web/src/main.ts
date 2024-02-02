import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SvgIcon from 'vue-svgicon'

import App from '@/App.vue'
import router from '@/router'
import '@/icons/components'

import '@/styles/index.scss'
import '@/styles/icon/iconfont.css'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(SvgIcon, {
  'tagName': 'svg-icon',
  'defaultWidth': '1em',
  'defaultHeight': '1em'
})

app.use(createPinia())
app.use(router)

app.mount('#app')
