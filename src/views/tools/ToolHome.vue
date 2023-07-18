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
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/alipay.png" alt="alipay" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="primary" @click="$router.push('/tool/upload-alipay')">上传 “支付宝” 账单</el-link>
        </div>
        <div class="choice">
          <img src="../../assets/wechat.png" alt="wechat" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="success" @click="$router.push('/tool/upload-wechat')">上传 “微信” 账单</el-link>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <el-icon :size="18"><Files/></el-icon>
            <div class="header-title">管理账单</div>
          </div>
        </template>
        <div class="choice">
          <img src="../../assets/manage.png" alt="manage" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="danger" @click="$router.push('/tool/manage-bill')">管理账单</el-link>
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
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <el-icon :size="18"><Document/></el-icon>
            <div class="header-title">生成分析报告</div>
          </div>
        </template>
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/day.png" alt="report" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="success" @click="$router.push('/tool/generate-day-report')">生成 “日” 分析报告</el-link>
        </div>
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/week.png" alt="report" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="primary" @click="$router.push('/tool/generate-week-report')">生成 “周” 分析报告</el-link>
        </div>
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/month.png" alt="report" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="warning" @click="$router.push('/tool/generate-month-report')">生成 “月” 分析报告</el-link>
        </div>
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/year.png" alt="report" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="danger" @click="$router.push('/tool/generate-year-report')">生成 “年” 分析报告</el-link>
        </div>
        <div class="choice">
          <img src="../../assets/custom.png" alt="report" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="info" @click="$router.push('/tool/generate-custom-report')">生成 “自定义” 分析报告</el-link>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <el-icon :size="18"><Tickets/></el-icon>
            <div class="header-title">自定义交易类型匹配规则</div>
          </div>
        </template>
        <div class="choice" style="padding-bottom: 20px;">
          <img src="../../assets/alipay.png" alt="alipay" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="primary" @click="$router.push('/tool/customize-alipay-rules')">自定义 “支付宝” 交易类型匹配规则</el-link>
        </div>
        <div class="choice">
          <img src="../../assets/wechat.png" alt="wechat" style="max-height: 24px; max-width: 24px;"/>
          <el-link type="success" @click="$router.push('/tool/customize-wechat-rules')">自定义 “微信” 交易类型匹配规则</el-link>
        </div>
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

.choice {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.choice img {
  margin-right: 8px;
}
</style>

<script setup lang="ts">
import {Document, Download, Files, Tickets, Upload} from "@element-plus/icons-vue";
</script>