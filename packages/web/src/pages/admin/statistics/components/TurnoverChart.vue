<template>
  <div class="h-full" ref="node"></div>
</template>

<script setup lang="ts">
import { useChart } from '@/hooks/chart'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  options: EChartsOption,
}>()

const _options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '5%',
    left: '10',
    right: '40',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLabel: {
      //X轴字体颜色
      color: '#666',
      fontSize: '12px',
    },
    axisLine: {
      //X轴线颜色
      lineStyle: {
        color: '#E5E4E4',
        width: 1, //x轴线的宽度
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#666',
      fontSize: '12px',
    }
  },
  series: [
    {
      name: '营业额',
      type: 'line',
      data: [],
      smooth: false, //否平滑曲线
      showSymbol: false, //未显示鼠标上移的圆点
      symbolSize: 10,
      lineStyle: {
        color: '#FFD000',
      },
      itemStyle: {
        color: '#F29C1B',
      },
      emphasis: {
        itemStyle: {
          color: '#fff',
          borderWidth: 5,
          borderColor: '#FFC100',
        }
      }
    },
  ],
}

const { node } = useChart(props, _options)
</script>

<style scoped>

</style>