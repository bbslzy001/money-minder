<template>
  <FileUpload
      ref="fileUploadRef"
      :upload-ulr="props.uploadUlr"
      upload-type=".csv"
      upload-text="将 账单 拖拽至此处或 "
      :upload-check-method="uploadCheckMethod">
    <template #upload-tip>
      <slot name="my-upload-tip"/>
    </template>
  </FileUpload>
</template>

<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue';
import {UploadFile, UploadRawFile} from "element-plus";
import {ref} from "vue";

interface Props {
  uploadUlr: string;
}

const props = defineProps<Props>();

const fileUploadRef = ref<any>(null);

const uploadCheckMethod = (file: UploadFile, rawFile: UploadRawFile) => {
  if (rawFile.type !== 'text/csv') {
    fileUploadRef.handleError('只允许上传CSV文件', file);
    return;
  }

  if (rawFile.size > 1024 * 1024 * 10) {
    fileUploadRef.handleError('文件大小不能超过 10MB', file);
    return;
  }
}
</script>