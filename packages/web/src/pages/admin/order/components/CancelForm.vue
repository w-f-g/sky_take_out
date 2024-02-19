<template>
  <div class="p-[30px] pl-[64px]">
    <div class="flex items-center mb-5">
      <div class="form-label text-right w-[70px]">{{ props.title }}：</div>
      <Select
        class="w-[300px]"
        size="large"
        :value="_value"
        :placeholder="`请选择${props.title}`"
        @Change="handleSelectChange"
      >
        <SelectOption
          :key="x.value"
          :value="x.value"
          v-for="x in orderReasonList"
        >{{ x.label }}</SelectOption>
      </Select>
    </div>
    <div class="flex" v-if="_value === 0">
      <div class="form-label text-right w-[70px]">原因：</div>
      <Textarea
        class="w-[300px]"
        :placeholder="`请填写您的${props.title}（限20字以内）`"
        :maxLength="20"
        @update:value="handleTextareaChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TSelectOptions } from '@/api'
import { Select, SelectOption, Textarea } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import { ref } from 'vue'

const _value = ref<number>()
const props = defineProps<{
  title: string,
  orderReasonList: TSelectOptions,
}>()
const emit = defineEmits<{
  (e: 'change', value: string): void,
}>()

function handleSelectChange(val: SelectValue) {
  const _val = val as number
  if (_val > 0) {
    const target = props.orderReasonList.find(x => x.value === _val)!
    emit('change', target.label)
  }
  _value.value = _val
}

function handleTextareaChange(e: string) {
  emit('change', e)
}
</script>

<style scoped>

</style>