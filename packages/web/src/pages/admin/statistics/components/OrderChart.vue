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
    formatter: (params) => {
      if (!Array.isArray(params)) return ''
      return `
        <div style="color: #333; font-size: 12px; font-weight: 300;">
          ${params[0].name}
          ${
            params.map(data => {
              return `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="margin-right: 10px;">${data.marker}<span>${data.seriesName}</span></div>
                  <span>${data.value}</span>
                </div>
              `
            }).join('')
          }
       </div>
      `
    },
    // backgroundColor: '#fff', //背景颜色（此时为默认色）
    // borderRadius: 2, //边框圆角
    // textStyle: {
    //   color: '#333', //字体颜色
    //   fontSize: 12, //字体大小
    //   fontWeight: 300,
    // },
  },
  grid: {
    top: '5%',
    left: '20',
    right: '50',
    bottom: '12%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: false,
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
    min: 0,
    //max: 500,
    interval: 50,
    axisLabel: {
      color: '#666',
      fontSize: '12px',
    },
  }, //左侧值
  series: [
    {
      name: '订单总数',
      data: [],
      type: 'line',
      smooth: false, //否平滑曲线
      showSymbol: false, //未显示鼠标上移的圆点
      symbolSize: 10,
      lineStyle: {
        color: '#FFD000',
      },
      itemStyle: {
        color: '#FFD000',
      },
      emphasis: {
        itemStyle: {
          color: '#fff',
          borderWidth: 5,
          borderColor: '#FFC100',
        }
      },
    },
    {
      name: '有效订单',
      type: 'line',
      data: [],
      // stack: 'Total',
      smooth: false, //否平滑曲线
      showSymbol: false, //未显示鼠标上移的圆点
      symbolSize: 10, //圆点大小
      // symbol:"circle", //设置折线点定位实心点
      lineStyle: {
        color: '#FD7F7F',
      },
      itemStyle: {
        color: '#FD7F7F',
      },
      emphasis: {
        itemStyle: {
          // 圆点颜色
          color: '#fff',
          borderWidth: 5,
          borderColor: '#FD7F7F',
        }
      },
    }
  ],
}

const { node } = useChart(props, _options)
</script>

<style scoped>

</style>