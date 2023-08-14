<template>
  <el-container direction="vertical">
    <MyUpload upload-url="/upload/alipay">
      <template #my-upload-tip>
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
    </MyUpload>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {ElMessageBox} from "element-plus";
import {InfoFilled} from "@element-plus/icons-vue";
import MyUpload from "@/components/MyUpload.vue";

const getFileMethod = () => {
  ElMessageBox.alert(
      '<p>1）打开支付宝APP，点击“我的”</p>' +
      '<p>2）点击“账单”</p>' +
      '<p>3）点击右上角的“更多”按钮</p>' +
      '<p>4）点击“开具交易流水证明”</p>' +
      '<p>5）选中“用于个人对账”</p>' +
      '<p>6）点击“申请”</p>' +
      '<p>7）选择“全部交易”</p>' +
      '<p>8）自定义“时间范围”</p>' +
      '<p>9）点击“下一步”</p>' +
      '<p>10）填写“电子邮箱”</p>' +
      '<p>11）点击“发送”</p>' +
      '<p>12）从“电子邮箱”中查收压缩加密文件</p>' +
      '<p>13）下载并解压缩，得到 “支付宝” 账单文件</p>',
      '如何获取 “支付宝” 账单？',
      {
        confirmButtonText: '知道了',
        dangerouslyUseHTMLString: true,
      }
  ).catch(error => {
    console.log('弹窗关闭:', error);
  });
}
</script>