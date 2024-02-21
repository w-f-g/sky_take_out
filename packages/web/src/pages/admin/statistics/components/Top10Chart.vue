<template>
  <div class="h-full" ref="node"></div>
</template>

<script setup lang="ts">
import { useChart } from '@/hooks/chart'
import { graphic } from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  options: EChartsOption,
}>()

const _options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#fff', //背景颜色（此时为默认色）
    textStyle: {
      color: '#333', //字体颜色
      fontSize: 12, //字体大小
      fontWeight: 300,
    },
  },
  grid: {
    top: '-10px',
    left: '0',
    right: '10px',
    bottom: '10',
    containLabel: true,
  },
  xAxis: {
    show: false,
    type: 'value',
  },
  yAxis: {
    // 隐藏y轴坐标轴
    axisLine: {
      show: false,
    },
    // 隐藏y轴刻度线
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    data: [],
    type: 'category',
    axisLabel: {
      color: '#666',
      fontSize: '12px',
    },
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: '#F3F4F7',
      },
      data: [],
      barWidth: 20,
      barGap: '80%' /*多个并排柱子设置柱子之间的间距*/,
      barCategoryGap: '80%' /*多个并排柱子设置柱子之间的间距*/,
      itemStyle: {
        borderRadius: [0, 10, 10, 0], // 圆角
        color: new graphic.LinearGradient( // 渐变色
          1,
          0,
          0,
          0, // 渐变色的起止位置, 右/下/左/上
          [
            // offset 位置
            { offset: 0, color: '#FFBD00' },
            { offset: 1, color: '#FFD000' },
          ]
        ),
      },
      label: {
        //内容样式
        show: true,
        formatter: '{@score}',
        color: '#333',
        position: ['8', '5'], //自定义位置第一个参数为x轴方向，第二个参数为y轴方向，左上角为起点，向右向下为正数，向上向左为负数
      },
    },
  ],
}
const { node } = useChart(props, _options)
</script>

<style scoped>

</style>