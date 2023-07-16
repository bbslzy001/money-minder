<template>
  <FileUpload
      ref="fileUploadRef"
      upload-url="#"
      upload-type=".csv"
      upload-text="将 账单 拖拽至此处或 "
      :upload-method="uploadMethod"
      :upload-check-method="uploadCheckMethod">
    <template #upload-tip>
      <slot name="my-upload-tip"/>
    </template>
  </FileUpload>
</template>

<script setup lang="ts">
import {ref} from "vue";
import FileUpload from '@/components/FileUpload.vue';
import {UploadFile, UploadRawFile} from "element-plus";
import request from '@/utils/request';
import {RequestCode} from "@/utils/requestCode";

interface Props {
  uploadUrl: string;
}

const props = defineProps<Props>();

const fileUploadRef = ref<typeof FileUpload>();

const uploadMethod = (fileList: UploadFile[]) => {
  fileList.forEach((file) => {
    setTimeout(() => {
      file.status = 'uploading';
      uploadFileRequest(file);
    }, 500);
  });
}

const uploadFileRequest = async (file: UploadFile) => {
  try {
    const rawFile = file.raw;
    if (rawFile) {
      const formData = new FormData();
      formData.append('file', rawFile);
      const response = await request.fileRequest.post(`${props.uploadUrl}`, formData);
      if (response.status === RequestCode.SUCCESS) {
        uploadSuccess(file, response.data.message);
      } else if (response.status === RequestCode.ERROR) {
        uploadFail(file, response.data.error);
      }
    }
    else {
      uploadFail(file, '无效文件');
    }
  } catch (error) {
    uploadFail(file, error);
  }
}

const uploadSuccess = (file: UploadFile, message: string | any) => {
  file.status = 'success';
  if (fileUploadRef.value) {
    fileUploadRef.value.handleSuccess(message);
  }
  console.log(message);
}

const uploadFail = (file: UploadFile, message: string | any) => {
  file.status = 'fail';
  if (fileUploadRef.value) {
    fileUploadRef.value.handleError(message);
  }
  console.error(message);
}

const uploadCheckMethod = (file: UploadFile, rawFile: UploadRawFile) => {
  if (rawFile.type !== 'text/csv') {
    if (fileUploadRef.value) {
      fileUploadRef.value.handleError('只允许上传CSV文件，请重新上传');
      fileUploadRef.value.updateFileList(file);
    }
    return;
  }

  if (rawFile.size > 1024 * 1024 * 10) {
    if (fileUploadRef.value) {
      fileUploadRef.value.handleError('文件大小不能超过 10MB，请重新上传');
      fileUploadRef.value.updateFileList(file);
    }
    return;
  }
}
</script>