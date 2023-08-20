<template>
  <el-container direction="vertical" style="height: calc(100vh - 128px);  padding: calc((100vh - 128px) / 10);">
    <el-row :gutter="60" style="height: calc(50% - 30px); margin-bottom: 60px">
      <el-col :span="6">
        <MyImageCard title="日分析报告" action-text="生成“日”分析报告" action-path="/report/daily-report"
                     :background-color-style="{ backgroundColor: 'rgb(61, 204, 245)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/report.png')})` }"/>
      </el-col>
      <el-col :span="6">
        <MyImageCard title="周分析报告" action-text="生成“周”分析报告" action-path="/report/weekly-report"
                     :background-color-style="{ backgroundColor: 'rgb(61, 204, 245)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/report.png')})` }"/>
      </el-col>
      <el-col :span="6">
        <MyImageCard title="月分析报告" action-text="生成“月”分析报告" action-path="/report/monthly-report"
                     :background-color-style="{ backgroundColor: 'rgb(61, 204, 245)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/report.png')})` }"/>
      </el-col>
      <el-col :span="6">
        <MyImageCard title="年分析报告" action-text="生成“年”分析报告" action-path="/report/yearly-report"
                     :background-color-style="{ backgroundColor: 'rgb(61, 204, 245)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/report.png')})` }"/>
      </el-col>
    </el-row>
    <el-row :gutter="60" style="height: calc(50% - 30px)">
      <el-col :span="6">
        <MyImageCard title="自定义分析报告" action-text="生成“自定义”分析报告" action-path="/report/custom-report"
                     :background-color-style="{ backgroundColor: 'rgb(61, 204, 245)' }"
                     :image-style="{ backgroundImage: `url(${require('@/assets/report.png')})` }"/>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import MyImageCard from "@/components/cards/MyImageCard.vue";
</script>