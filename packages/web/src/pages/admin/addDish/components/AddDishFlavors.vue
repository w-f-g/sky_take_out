<template>
  <div class="add-dish-flavors">
    <div class="title">口味名（3个字内）</div>
    <ul class="flavors">
      <li
        class="flavor-item"
        v-for="(item, i) in dishFlavors"
        :key="`${item.name}_${i}`"
      >
        <Select
          style="width: 150px;"
          :value="item.name"
          @change="handleSelect(i, $event)"
        >
          <SelectOption
            v-for="op in dishFlavorsOptions"
            :key="op.value"
            :value="op.value"
          >
            {{ op.label }}
          </SelectOption>
        </Select>
        <div class="flex-1 flex flex-wrap labBox">
          <div
            class="labItems"
            v-for="(lab, idx) in item.value"
            :key="`${item.name}_${i}_${lab}_${idx}`"
          >
            <span class="mr-1">{{ lab }}</span>
            <CloseOutlined @click="handleDeleteLabItem(i, idx)" />
          </div>
        </div>
        <span class="delBut" @click="handleDeleteFlavor(i)">删除</span>
      </li>
    </ul>
    <PrimaryButton
      class="submit"
      v-if="dishFlavors.length < dishFlavorsData.length"
      @click="handleAddDishFlavors"
    >添加口味</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { Select, SelectOption } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import type { TFlavors } from '../type'
import type { SelectValue } from 'ant-design-vue/es/select'

const model = defineModel<TFlavors[]>({ required: true })

const dishFlavorsData: TFlavors[] = [
  { name: '甜味', value: ['无糖', '少糖', '半糖', '多糖', '全糖'] },
  { name: '温度', value: ['热饮', '常温', '去冰', '少冰', '多冰'] },
  { name: '忌口', value: ['不要葱', '不要蒜', '不要香菜', '不要辣'] },
  { name: '辣度', value: ['不辣', '微辣', '中辣', '重辣'] }
]

const dishFlavors = ref<TFlavors[]>([])

const dishFlavorsOptions = computed(() => {
  const _flavors = dishFlavors.value
  return dishFlavorsData
    .filter(x => {
      const flag = _flavors.some(y => y.name === x.name)
      return !flag
    })
    .map(x => {
      return {
        label: x.name,
        value: x.name,
      }
    })
})

watchEffect(() => {
  dishFlavors.value = model.value
})

watch(
  dishFlavors,
  (newVal) => {
    model.value = newVal
  },
  {
    deep: true,
  }
)

function handleSelect(index: number, value: SelectValue) {
  const name = value as string
  dishFlavors.value[index].name = name
  const target = dishFlavorsData.find(x => x.name === name)!
  dishFlavors.value[index].value = target.value
}

function handleAddDishFlavors() {
  dishFlavors.value.push({
    name: '',
    value: [],
  })
}

function handleDeleteFlavor(index: number) {
  dishFlavors.value.splice(index, 1)
}

function handleDeleteLabItem(flavorIndex: number, index: number) {
  dishFlavors.value[flavorIndex].value.splice(index, 1)
}

</script>

<style lang="scss" scoped>
.add-dish-flavors {
  width: 750px;
  border: 1px solid #dfe2e8;
  border-radius: 3px;
  padding: 15px;
  background: #fafafb;
  .title {
    line-height: 40px;
    color: #606168;
  }
  .flavors {
    padding-left: 0;
    .flavor-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      :deep(.ant-select-selector) {
        height: 40px;
        border-radius: 3px;
        .ant-select-selection-search-input {
          height: 100%;
        }
        .ant-select-selection-item {
          line-height: 40px;
        }
      }
      .labBox {
        min-height: 40px;
        border-radius: 3px;
        border: 1px solid #d8dde3;
        background: #fff;
        padding: 0 5px;
        margin-left: 15px;
        .labItems {
          display: inline-block;
          color: #ffc200;
          margin: 5px;
          line-height: 26px;
          padding: 0 10px;
          background: #fffbf0;
          border: 1px solid #fbe396;
          border-radius: 4px;
          font-size: 12px;
        }
      }
      .delBut {
        cursor: pointer;
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
}
</style>