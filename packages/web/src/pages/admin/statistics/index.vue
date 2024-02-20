<template>
  <div class="statistics-page">
    <div class="actions flex justify-between items-center">
      <div class="flex items-center">
        <RadioGroup
          size="large"
          @change="handleRadioChange"
          :value="type"
        >
          <RadioButton
            :key="i"
            :value="i"
            v-for="(item, i) in radioLabels"
          >{{ item }}</RadioButton>
        </RadioGroup>
        <div class="ml-2">已选时间：{{ dateTimes[0] }} 至 {{ dateTimes[1] }}</div>
      </div>
      <Button
        class="h-[40px]"
        :icon="h(UploadOutlined)"
        @click="handleExportExecl"
      >数据导出</Button>
    </div>
    <div class="container-box">
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { ref, h, computed, toValue } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { RadioGroup, RadioButton, Button, type RadioChangeEvent, Modal } from 'ant-design-vue'
import { exportReport } from '@/api/statistics'

dayjs.extend(weekday)
const FORMAT = 'YYYY-MM-DD'
const radioLabels = ['昨日', '近7日', '近30日', '本周', '本月']
const today = dayjs()

const type = ref(1)
const dateTimes = computed(() => {
  const value = toValue(type)
  if (value === 0) {
    const begin = today.subtract(1, 'day').format(FORMAT)
    return [begin, begin]
  } else if (value === 1) {
    const begin = today.subtract(7, 'day').format(FORMAT)
    const end = today.subtract(1, 'day').format(FORMAT)
    return [begin, end]
  } else if (value === 2) {
    const begin = today.subtract(30, 'day').format(FORMAT)
    const end = today.subtract(1, 'day').format(FORMAT)
    return [begin, end]
  } else if (value === 3) {
    const begin = today.startOf('week').format(FORMAT)
    const end = today.endOf('week').format(FORMAT)
    return [begin, end]
  } else {
    const begin = today.startOf('month').format(FORMAT)
    const end = today.endOf('month').format(FORMAT)
    return [begin, end]
  }
})

function handleRadioChange({ target }: RadioChangeEvent) {
  const value = target.value
  type.value = value
}

function handleExportExecl() {
  Modal.confirm({
    title: '提示',
    centered: true,
    content: '是否确认导出最近30天运营数据?',
    onOk: async () => {
      exportReport()
    },
  })
}

defineOptions({
  name: 'StatisticsPage'
})
</script>

<style lang="scss" scoped>
.statistics-page {
  .actions {
    margin-bottom: 20px;
    .ant-radio-group {
      .ant-radio-button-wrapper {
        border-radius: 0;
        width: 80px;
        text-align: center;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        position: relative;
        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
        &.ant-radio-button-wrapper-checked {
          background-color: #ffc200;
        }
      }
    }
    .ant-btn {
      border-radius: 4px;
    }
  }
}
</style>