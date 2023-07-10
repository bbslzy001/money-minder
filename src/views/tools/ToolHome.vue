<template>
  <el-row :gutter="20">
    <el-col :span="8">
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
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <el-icon :size="18"><Download/></el-icon>
            <div class="header-title">下载账单</div>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <el-icon :size="18"><Document/></el-icon>
            <div class="header-title">生成分析报告</div>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

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
import {Document, Download, Upload} from "@element-plus/icons-vue";
</script>