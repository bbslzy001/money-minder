<template>
  <el-container direction="vertical">
    <el-row :gutter="24" style="margin-bottom: 24px;">
      <el-col :span="18" style="height: 160px;">
        <DataChart :start-date="startDate" :end-date="endDate" date-range="day"/>
      </el-col>
      <el-col :span="6" style="height: 160px;">
        <DateSettingCard :extra="currentDate[1]">
          <template #link>
            <el-link type="primary" @click="" style="font-size: 32px;">{{ currentDate[0] }}</el-link>
          </template>
        </DateSettingCard>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="14">
        <el-row :gutter="24" style="margin-bottom: 24px;">
          <el-col :span="16" style="height: 350px;">
            <IncOrExpRankChart :start-date="startDate[1]" :end-date="endDate[1]"/>
          </el-col>
          <el-col :span="8" style="height: 350px;">
            <IncOrExpPercentChart :start-date="startDate[1]" :end-date="endDate[1]"/>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 500px;">
            <TypeChart :start-date="startDate[1]" :end-date="endDate[1]"/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" style="height: 800px;">
        <TimeChart :start-date="startDate[1]" :end-date="endDate[1]"/>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import DateSettingCard from "@/components/cards/DateSettingCard.vue";
import DataChart from "@/components/cards/charts/DataChart.vue";
import IncOrExpPercentChart from "@/components/cards/charts/IncOrExpPercentChart.vue";
import IncOrExpRankChart from "@/components/cards/charts/IncOrExpRankChart.vue";
import TimeChart from "@/components/cards/charts/TimeChart.vue";
import TypeChart from "@/components/cards/charts/TypeChart.vue";

const startDate = ['2023-07-12 00:00:00', '2023-07-13 00:00:00'];
const endDate = ['2023-07-12 23:59:59', '2023-07-13 23:59:59'];

const currentDate = ['13日', '2023年07月'];
</script>