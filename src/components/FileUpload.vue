<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-upload
        ref="uploadRef"
        :action="props.uploadUlr"
        v-model:file-list="fileList"
        drag
        :multiple="true"
        :auto-upload="false"
        :show-file-list="false"
        :accept="props.uploadType"
        :on-change="fileListChange"
        :on-remove="fileListRemove">
      <el-icon class="el-icon--upload"><upload-filled/></el-icon>
      <div class="el-upload__text">{{ props.uploadText }}<em>点击上传</em></div>
      <template #tip>
        <slot name="upload-tip"/>
      </template>
    </el-upload>
    <el-divider style="margin: 10px 0 30px;"/>
    <div class="table">
      <div class="table-title">
        <div>文件列表</div>
        <div style="display: flex; align-items: center; justify-content: flex-start;">
          <el-button :disabled="!hasFailedFiles" type="warning" size="default" @click="retryAllUpload">重新上传所有失败文件</el-button>
          <el-button :disabled="!hasReadyFiles" type="primary" size="default" @click="uploadRequest">开始上传</el-button>
        </div>
      </div>
      <el-table :data="fileList" size="default" table-layout="auto" :max-height="'480px'">
        <el-table-column prop="name" label="文件名"/>
        <el-table-column prop="size" label="文件大小"/>
        <el-table-column prop="status" label="上传状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 'ready'" type="info">等待</el-tag>
            <el-tag v-else-if="scope.row.status === 'uploading'" type="info">上传中</el-tag>
            <el-tag v-else-if="scope.row.status === 'success'" type="success">成功</el-tag>
            <el-tag v-else-if="scope.row.status === 'fail'" type="danger">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.status === 'fail'" size="small" type="warning" @click="retryUpload(scope.$index)">重试</el-button>
            <el-popconfirm v-if="scope.row.status !== 'uploading' && scope.row.status !== 'success'"
                           title="是否撤销本文件" confirm-button-text="确认" @confirm="fileListRemove(scope.$index)" cancel-button-text="取消" width="200">
              <template #reference>
                <el-button size="small" type="danger">撤销</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<style scoped>
.table {
  padding: 20px;
  background-color: white;
}

.table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {
  ElNotification,
  ElPopconfirm,
  UploadFile,
  UploadProps, UploadRawFile,
} from "element-plus";
import type {UploadInstance} from 'element-plus'
import {UploadFilled} from "@element-plus/icons-vue";
import SparkMD5 from "spark-md5";

interface Props {
  uploadUlr: string;
  uploadType?: string;
  uploadText?: string;
  uploadCheckMethod?: (file: UploadFile, rawFile: UploadRawFile) => void;
  uploadSuccessMethod?: (file: UploadFile) => void;
  uploadFailMethod?: (file: UploadFile) => void;
  fileRemoveMethod?: (index: number) => void;
}

const props = defineProps<Props>();

const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadFile[]>([]);
const fileMD5List = ref<any[]>([]);

const hasReadyFiles = computed(() => {
  return fileList.value.some(file => file.status === 'ready');
});

const hasFailedFiles = computed(() => {
  return fileList.value.some(file => file.status === 'fail');
});

// 解析文件过程中所有的异常均通过 handleError 方法抛出
const handleError = (message: string, file: UploadFile) => {
  ElNotification({
    title: '解析错误',
    message: message,
    type: 'error',
    duration: 2000,
  });
  fileList.value = fileList.value.filter((f) => f.uid !== file.uid);  // 从 fileList 中删除该 UploadFile
};

// 将方法暴露给外部调用
defineExpose({
  handleError,
});

// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const fileListChange: UploadProps['onChange'] = async (file) => {
  // 添加文件时调用
  if (file.status === 'ready') {
    const rawFile = file.raw;

    if (!rawFile) {
      handleError('无效文件，请重试', file);
      return;
    }

    if (props.uploadCheckMethod) {
      props.uploadCheckMethod(file, rawFile);
    }

    try {
      const md5 = await computeMD5(rawFile);

      if (fileMD5List.value.includes(md5)) {
        handleError('文件已存在', file);
        return;
      }

      fileMD5List.value.push(md5);  // 将文件的 MD5 值添加到 fileMD5List
    } catch (error) {
      handleError('MD5计算错误，请重试', file);
      return;
    }

    return;
  }

  // 上传文件成功时调用
  if(file.status === 'success') {
    if (props.uploadSuccessMethod) {
      props.uploadSuccessMethod(file);
    }

    return;
  }

  // 上传文件失败时调用
  if(file.status === 'fail') {
    if(props.uploadFailMethod) {
      props.uploadFailMethod(file);
    }

    return;
  }
};

const fileListRemove = (index: number) => {
  if (index >= 0 && index < fileList.value.length) {
    fileList.value.splice(index, 1);
    fileMD5List.value.splice(index, 1);
  } else {
    console.error('Invalid index provided for removal');
  }

  // 移除文件时调用
  if (props.fileRemoveMethod) {
    props.fileRemoveMethod(index);
  }
}

const uploadRequest = () => {
  if (uploadRef.value) {
    uploadRef.value.submit();  // 手动上传需要调用 submit 方法，只上传状态为 ready 的文件
  }
}

const retryAllUpload = () => {
  fileList.value.forEach((file) => {
    if (file.status === 'fail') {
      file.status = 'ready';
    }
  });
  uploadRequest();
}

const retryUpload = (index: number) => {
  const file = fileList.value[index];
  if (file.status === 'fail') {
    file.status = 'ready';
  }
  uploadRequest();
}

// 计算文件 MD5
const computeMD5 = async (file: File): Promise<string> => {
  const fileReader = new FileReader();
  const spark = new SparkMD5.ArrayBuffer();

  return new Promise((resolve, reject) => {
    fileReader.onload = (event) => {
      if (event.target && event.target.result) {
        spark.append(event.target.result as ArrayBuffer);
        const hash = spark.end();
        resolve(hash);
      } else {
        reject(new DOMException('FileReader result is null.'));
      }
    };
    fileReader.onerror = (error) => {
      if (error.target && error.target.error) {
        reject(error.target.error);
      } else {
        reject(new DOMException('Unknown FileReader error.'));
      }
    };
    fileReader.readAsArrayBuffer(file);
  });
}
</script>