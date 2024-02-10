<template>
  <div class="sky-upload">
    <Upload
      accept="image/jpeg, image/png"
      action="/api/admin/common/upload"
      :before-upload="handleBeforeUpload"
      :maxCount="1"
      list-type="picture-card"
      :show-upload-list="false"
      :headers="headers"
      @change="handleUploadChange"
    >
      <div class="upload-image" v-if="image">
        <img :src="image" alt="image" />
        <div class="action flex flex-col justify-center items-center">
          <button @click="handleDelete">删除</button>
          <button>重新上传</button>
        </div>
      </div>
      <div v-else>
        <UploadOutlined />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </Upload>
    <p class="tips flex justify-center items-center">
      图片大小不超过2M<br />
      仅能上传 PNG JPEG JPG类型图片<br />
      建议上传200*200或300*300尺寸的图片
    </p>
  </div>
</template>

<script setup lang="ts">
import { Upload, message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { useUserInfo } from '@/hooks/user'
import { computed, ref } from 'vue'
import type { FileType, UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import type { IResponse } from '@sky_take_out/types'

const userInfo = useUserInfo()
const { employeeLogout } = useUserStore()
const route = useRoute()
const router = useRouter()

const image = defineModel<string>()
const headers = computed(() => {
  return {
    token: userInfo.token.value,
  }
})

async function handleBeforeUpload(file: FileType) {
  if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
    message.error('仅能上传 PNG JPEG JPG类型图片')
    return false
  }
  if (file.size > 1024 * 1024 * 2) {
    message.error('图片大小不超过2M')
    return false
  }
  return file
}

async function handleUploadChange({ file }: UploadChangeParam<UploadFile>) {
  const response: IResponse<string> = file.response
  image.value = URL.createObjectURL(file.originFileObj!)
  if (file.error) {
    message.error(response.msg)
    if (file.error.status === 401) {
      employeeLogout().then(() => {
        router.push('/login?redirect' + route.fullPath)
      })
    }
    return
  }
  if (file.status === 'done') {
    URL.revokeObjectURL(image.value)
    image.value = response.data
  }
}

function handleDelete(e: MouseEvent) {
  e.stopPropagation()
  image.value = ''
}

defineOptions({
  name: 'SkyUpload',
})
</script>

<style lang="scss" scoped>
.sky-upload {
  display: flex;
  :deep(.ant-upload-wrapper.ant-upload-picture-card-wrapper) {
    width: auto;
  }
  :deep(.ant-upload-select) {
    width: 200px !important;
    height: 160px !important;
  }
  .tips {
    font-size: 12px;
    color: #666;
    line-height: 17px;
    margin-left: 36px;
    margin-bottom: 0;
  }
  .upload-image {
    width: 200px;
    height: 160px;
    border-radius: 4px;
    position: relative;
    .action {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      cursor: default;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.5s;
      button {
        outline: 0;
        width: 100px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        padding: 0;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        &:first-child {
          margin-bottom: 20px;
        }
      }
    }
    img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover > .action {
      opacity: 1;
    }
  }
}
</style>