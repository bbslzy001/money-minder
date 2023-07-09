<template>
  <el-card shadow="hover">
    <template #header>
      <div class="header">
        <el-icon :size="18"><Upload/></el-icon>
        <div class="header-title">上传账单</div>
      </div>
    </template>
    <div class="upload-choice" style="padding-bottom: 20px;">
      <img src="../../assets/alipay.png" alt="alipay" style="max-height: 24px; max-width: 24px;"/>
      <el-link type="primary" @click="$router.push('/tool/upload-alipay')">上传 “支付宝” 账单</el-link>
    </div>
    <div class="upload-choice">
      <img src="../../assets/wechat.png" alt="wechat" style="max-height: 24px; max-width: 24px;"/>
      <el-link type="success" @click="$router.push('/tool/upload-wechat')">上传 “微信” 账单</el-link>
    </div>
  </el-card>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-title {
  margin-left: 8px;
}

.upload-choice {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.upload-choice img {
  margin-right: 8px;
}
</style>

<script setup lang="ts">
import {Upload} from "@element-plus/icons-vue";
</script>