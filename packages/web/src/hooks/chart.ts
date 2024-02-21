import { init } from 'echarts'
import type { EChartsType, EChartsOption } from 'echarts'
import { debounce } from 'lodash-es'
import { onMounted, onUnmounted, ref, watch } from 'vue'

type Props = {
  options: EChartsOption,
}

export const useChart = (props: Props, _options: EChartsOption) => {
  const node = ref<HTMLDivElement>()
  let chart: EChartsType | null = null
  // tips: 不要用 composition api 来代理 echarts 实例，有大坑，图表首次渲染的时候无法显示tooltip，但是热更新之后就会显示
  // const chart = ref<EChartsType | null>(null)

  const resize = debounce(() => {
    chart?.resize()
  }, 500)
  const ob = new ResizeObserver(() => {
    resize()
  })

  watch(
    () => props.options,
    val => {
      chart?.setOption(val)
      resize()
    }
  )

  onMounted(() => {
    const _c = init(node.value!)
    _c.setOption(_options)
    _c.setOption(props.options)
    chart = _c
    ob.observe(node.value!)
  })
  
  onUnmounted(() => {
    ob.disconnect()
  })

  return {
    node,
    // chart,
  }
}