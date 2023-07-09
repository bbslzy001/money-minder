<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-upload
        ref="uploadRef"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        v-model:file-list="fileList"
        drag
        :multiple="true"
        :auto-upload="false"
        :show-file-list="false"
        accept=".csv"
        :on-change="fileListChange"
        :on-remove="fileListRemove"
        :on-success="uploadSuccess"
        :on-error="uploadError">
      <el-icon class="el-icon--upload"><upload-filled/></el-icon>
      <div class="el-upload__text">将 账单 拖拽至此处或<em> 点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          <div style="display: flex; align-items: center; justify-content: flex-start;">
            <div>1) 点击查看：</div>
            <el-link style="font-size: 12px;" type="primary" @click="getFileMethod">如何获取 “支付宝” 账单？</el-link>
          </div>
          <div style="display: flex; align-items: center; justify-content: flex-start;">
            <div>2) 请不要修改文件名或文件格式，否则将无法识别！！！</div>
            <el-tooltip placement="bottom-start">
              <template #content>文件名示例：<br/> alipay_record_20230101_230040.csv</template>
              <el-icon :size="14"><InfoFilled/></el-icon>
            </el-tooltip>
          </div>
          <div>3) 文件大小必须小于等于 10 MB</div>
        </div>
      </template>
    </el-upload>
    <el-divider style="margin: 10px 0 30px;"/>
    <div class="table">
      <div class="table-title">
        <div>文件列表</div>
        <el-button type="primary" size="default" @click="uploadRequest">开始上传</el-button>
      </div>
      <el-table :data="tableData" size="default" table-layout="auto" :max-height="'480px'">
        <el-table-column prop="fileName" label="文件名"/>
        <el-table-column prop="fileSize" label="文件大小"/>
        <el-table-column prop="uploadStatus" label="上传状态">
          <template #default="scope">
            <el-tag v-if="scope.row.uploadStatus === '成功'" type="success">成功</el-tag>
            <el-tag v-else-if="scope.row.uploadStatus === '失败'" type="danger">失败</el-tag>
            <el-tag v-else-if="scope.row.uploadStatus === '等待'" type="info">等待</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template #default="scope">
            <el-popconfirm title="是否撤销本文件" confirm-button-text="确认" @confirm="fileListRemove(scope.$index)" cancel-button-text="取消" width="200">
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
import {ref} from 'vue';
import {
  ElMessageBox,
  ElNotification,
  ElPopconfirm,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import type { UploadInstance } from 'element-plus'
import {UploadFilled, InfoFilled} from "@element-plus/icons-vue";

interface FileInfo {
  fileName: string,
  fileSize: string,
  uploadStatus: string,
}

const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const tableData = ref<FileInfo[]>([]);

const getFileMethod = () => {
  ElMessageBox.alert(
      '<p>1）打开支付宝APP，点击“我的”</p><p>2）点击“账单”</p><p>3）点击右上角的“更多”按钮</p><p>4）点击“开具交易流水证明”</p><p>5）选中“用于个人对账”</p><p>6）点击“申请”</p><p>7）选择“全部交易”</p><p>8）自定义“时间范围”</p><p>9）点击“下一步”</p><p>10）填写“电子邮箱”</p><p>11）点击“发送”</p><p>12）从“电子邮箱”中查收压缩加密文件</p><p>13）下载并解压缩，得到 “支付宝” 账单文件</p>',
      '如何获取 “支付宝” 账单？',
      {
        confirmButtonText: '知道了',
        dangerouslyUseHTMLString: true,
      }
  );
}

const fileListChange: UploadProps['onChange'] = (file) => {
  // 检查文件有效性
  const rawFile = file.raw;
  if(!rawFile) return;

  // 检查文件是否已经存在
  if (tableData.value.some((item) => item.fileName === rawFile.name)) {
    ElNotification({
      title: '解析错误',
      message: '文件已存在',
      type: 'error',
      duration: 2000,
    });
    return;
  }

  // 检查文件类型
  if (rawFile.type !== 'text/csv') {
    ElNotification({
      title: '解析错误',
      message: '只允许上传CSV文件',
      type: 'error',
      duration: 2000,
    });
    return;
  }

  // 检查文件大小
  if (rawFile.size > 1024 * 1024 * 10) {
    ElNotification({
      title: '解析错误',
      message: '文件大小不能超过 10MB',
      type: 'error',
      duration: 2000,
    });
    return;
  }

  // 添加到 tableData 中
  tableData.value.push({
    fileName: rawFile.name,
    fileSize: (rawFile.size / 1024 / 1024).toFixed(2) + ' MB',
    uploadStatus: "等待",
  });
  return;
}

const fileListRemove = (index: number) => {
  fileList.value.splice(index, 1);
  tableData.value.splice(index, 1);
}

const uploadRequest = () => {
  fileList.value.forEach((file) => {
    const index = tableData.value.findIndex(item => item.fileName === file.name);
    if (index !== -1) {
      tableData.value[index].uploadStatus = "上传中";
    }
  })
  if (uploadRef.value) {
    uploadRef.value.submit();
  }
}

const uploadSuccess: UploadProps['onSuccess'] = (response, file) => {
  const index = tableData.value.findIndex(item => item.fileName === file.name);
  if (index !== -1) {
    tableData.value[index].uploadStatus = "成功";
  }
};

const uploadError: UploadProps['onError'] = (err, file) => {
  const index = tableData.value.findIndex(item => item.fileName === file.name);
  if (index !== -1) {
    tableData.value[index].uploadStatus = "失败";
  }
};
</script>