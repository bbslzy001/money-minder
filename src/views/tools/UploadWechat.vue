<template>
  <el-container direction="vertical" style="height: 100%;">
    <MyUpload upload-ulr="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
      <template #my-upload-tip>
        <div class="el-upload__tip">
          <div style="display: flex; align-items: center; justify-content: flex-start;">
            <div>1) 点击查看：</div>
            <el-link style="font-size: 12px;" type="primary" @click="getFileMethod">如何获取 “微信” 账单？</el-link>
          </div>
          <div style="display: flex; align-items: center; justify-content: flex-start;">
            <div>2) 请不要修改文件名或文件格式，否则将无法识别！！！</div>
            <el-tooltip placement="bottom-start">
              <template #content>文件名示例：<br/> 微信支付账单(20230101-20230301).csv</template>
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
      '<p>1）打开微信APP，点击“我”</p>' +
      '<p>2）点击“服务”</p>' +
      '<p>3）点击“钱包”</p>' +
      '<p>3）点击“账单”</p>' +
      '<p>3）点击右上角的“常见问题”</p>' +
      '<p>4）点击“下载账单”</p>' +
      '<p>5）选中“用于个人对账”</p>' +
      '<p>7）选择“全部”</p>' +
      '<p>8）自定义“时间范围”</p>' +
      '<p>9）点击“下一步”</p>' +
      '<p>10）填写“电子邮箱”</p>' +
      '<p>11）点击“下一步”，并“确认邮箱”</p>' +
      '<p>12）从“电子邮箱”中查收压缩加密文件</p>' +
      '<p>13）下载并解压缩，得到 “微信” 账单文件</p>',
      '如何获取 “微信” 账单？',
      {
        confirmButtonText: '知道了',
        dangerouslyUseHTMLString: true,
      }
  ).catch(error => {
    console.log('弹窗关闭:', error);
  });
}
</script>