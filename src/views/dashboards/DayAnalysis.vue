<template>
  <el-row :gutter="20" style="height: 100%;">
    <el-col :span="18">
      <el-row :gutter="20" style="height: calc(40% - 10px); margin-bottom: 20px;">
        <el-col :span="8">
          <AnalysisByIncOrExpPercent :start-date="startDate" :end-date="endDate"/>
        </el-col>
        <el-col :span="16">
          <AnalysisByIncOrExpRank :start-date="startDate" :end-date="endDate"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: calc(60% - 10px);">
        <el-col :span="16">
          <AnalysisByType :start-date="startDate" :end-date="endDate"/>
        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row style="height: calc(25% - 10px); margin-bottom: 20px;">
        <AnalysisData :start-date="startDate" :end-date="endDate"/>
      </el-row>
      <el-row style="height: calc(75% - 10px);">
        <AnalysisByTime :start-date="startDate" :end-date="endDate"/>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>

<script setup lang="ts">
import AnalysisByIncOrExpRank from "@/components/analysis/AnalysisByIncOrExpRank.vue";
import AnalysisByIncOrExpPercent from "@/components/analysis/AnalysisByIncOrExpPercent.vue";
import AnalysisByTime from "@/components/analysis/AnalysisByTime.vue";
import AnalysisData from "@/components/analysis/AnalysisData.vue";
import AnalysisByType from "@/components/analysis/AnalysisByType.vue";

const startDate = '2023-07-13 00:00:00';
const endDate = '2023-07-13 23:59:59';
</script>