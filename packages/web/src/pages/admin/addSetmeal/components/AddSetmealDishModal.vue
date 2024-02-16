<template>
  <Modal
    :open="open"
    centered
    width="60%"
    ok-text="添加"
    class="add-setmeal-dish-modal"
    :closable="false"
    @cancel="open = false"
    @ok="handleOk"
  >
    <template #title>
      <div class="modal-title">
        <h1>添加菜品</h1>
      </div>
    </template>
    <div class="modal-content flex">
      <div class="left-btns">
        <ul class="tabs">
          <li class="tab-item" v-for="item in dishTypes" :key="item.value">
            <input
              type="radio"
              hidden
              v-model="dishType"
              name="dishType"
              :value="item.value"
              :id="`dish_type_${item.value}`"
            />
            <label :for="`dish_type_${item.value}`">
              {{ item.label }}
            </label>
          </li>
        </ul>
      </div>
      <div class="dish-list flex-1 p-[15px]">
        <CheckboxGroup
          v-if="dishList.length > 0"
          :value="groupChecks"
          class="flex flex-col dish-table"
        >
          <Checkbox
            :key="item.id"
            v-for="item in dishList"
            :value="item.id"
            @change="handleCheckboxChange($event, item)"
          >
            <div class="w-full h-full flex items-center text-center">
              <div class="flex-[3_1_0%] text-left">{{ item.name }}</div>
              <div class="flex-1">{{ item.status === 1 ? '在售' : '停售' }}</div>
              <div class="flex-1">{{ item.price }}</div>
            </div>
          </Checkbox>
        </CheckboxGroup>
        <Empty v-else :image="simpleImage" />
      </div>
      <div class="check-list flex flex-col w-2/5 pl-[15px]">
        <div class="title font-bold px-5 leading-10">已选菜品({{ setmealDishs.size }})</div>
        <ul class="flex-1 overflow-auto pt-2 pr-[15px]">
          <li class="check-list-item" v-for="[k, v] in setmealDishs" :key="k">
            <span>{{ v.name}}</span>
            <span>￥{{ v.price }}</span>
            <img src="@/assets/icons/btn_clean@2x.png" alt="" @click="setmealDishs.delete(k)">
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { getCategoryByType, getDishListByCategoryId, type TSelectOptions } from '@/api'
import type { IDishEntity } from '@sky_take_out/types'
import { Modal, CheckboxGroup, Checkbox } from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface'
import { computed, onMounted, reactive, ref, toRaw, watch } from 'vue'
import { Empty } from 'ant-design-vue'
import type { TSetmealDish } from '../type'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const dishTypes = ref<TSelectOptions>([])
const dishType = ref<number>()
const dishList = ref<IDishEntity[]>([])
const setmealDishs = reactive(new Map<string, TSetmealDish>())

const open = defineModel<boolean>('open', { required: true })
const setmealDishList = defineModel<TSetmealDish[]>('setmealDishs', { required: true })

const groupChecks = computed(() => {
  return Array.from(setmealDishs).map(([k]) => k)
})

watch(dishType, async value => {
  if (value) {
    const res = await getDishListByCategoryId(value)
    dishList.value = res
  }
})

watch(
  setmealDishList,
  (value) => {
    setmealDishs.clear()
    value.forEach(x => {
      setmealDishs.set(x.dishId + '', x)
    })
  },
  { deep: true }
)

watch(open, (val) => {
  if (val) {
    setmealDishs.clear()
    setmealDishList.value.forEach(x => {
      setmealDishs.set(x.dishId + '', x)
    })
  }
})

function handleOk() {
  const value = toRaw(setmealDishs)
  setmealDishList.value = Array.from(value).map(([, v]) => v)
  open.value = false
}

function handleCheckboxChange({ target }: CheckboxChangeEvent, dish: IDishEntity) {
  if (target.checked) {
    const setmealDish = {
      dishId: dish.id,
      price: dish.price,
      name: dish.name,
      copies: 1,
    }
    setmealDishs.set(target.value, setmealDish)
  } else {
    setmealDishs.delete(target.value)
  }
}

onMounted(async () => {
  const list = await getCategoryByType(1)
  dishTypes.value = list
  dishType.value = list[0].value
})
</script>

<style lang="scss">
.add-setmeal-dish-modal {
  min-width: 568px;
  .ant-modal {
    &-content {
      padding: 0;
    }
    &-header {
      background: #fbfbfa;
      padding: 20px 30px;
      margin-bottom: 0;
    }
    &-footer {
      margin-top: 0;
      padding: 27px 30px 30px;
      border-top: 1px solid #efefef;
      .ant-btn {
        height: 40px;
        padding: 0 20px;
      }
    }
  }
  .modal-title {
    h1 {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
  .modal-content {
    padding: 0 20px;
    height: 400px;
    box-sizing: border-box;
    .dish-list {
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: rgba(144,147,153,.5);
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
      .dish-table {
        border-left: 1px solid #f4f4f4;
        border-top: 1px solid #f4f4f4;
        .ant-checkbox-wrapper {
          height: 40px;
          padding: 0 10px;
          border-right: 1px solid #f4f4f4;
          border-bottom: 1px solid #f4f4f4;
          .ant-checkbox + span {
            flex: 1;
            display: block;
            height: 100%;
          }
        }
      }
    }
  }
  .left-btns {
    height: 100%;
    overflow: hidden auto;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      display: none;
    }
    &:hover::-webkit-scrollbar {
      display: block;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: rgba(144,147,153,.5);
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    .tabs {
      width: 110px;
      line-height: 40px;
    }
    .tab-item {
      input[type="radio"] {
        & + label {
          width: 100%;
          display: block;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
          color: #333;
          position: relative;
        }
        &:checked + label {
          color: #ffc200;
          border-color: #ffc200;
          &::before {
            content: "";
            display: block;
            position: absolute;
            width: 2px;
            height: 100%;
            background-color: #ffc200;
            left: 0;
          }
        }
      }
    }
  }
  .check-list {
    border-left: 1px solid #efefef;
    ul {
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: rgba(144,147,153,.5);
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
    }
    &-item {
      box-shadow: 0 1px 4px 3px rgba(0,0,0,.03);
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 10px;
      margin-bottom: 20px;
      border-radius: 6px;
      color: #333;
      line-height: 40px;
      text-align: left;
      span {
        flex: 70%;
      }
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>