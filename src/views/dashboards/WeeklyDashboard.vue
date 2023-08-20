<template>
  <el-container direction="vertical">
    <el-row :gutter="24" style="margin-bottom: 24px;">
      <el-col :span="18" style="height: 160px;">
        <DataChart :start-date="dateRange.startDate" :end-date="dateRange.endDate" date-range="week"/>
      </el-col>
      <el-col :span="6" style="height: 160px;">
        <DateSettingCard :extra="dateRange.currentDate[1]">
          <template #link>
            <el-link type="primary" @click="" style="font-size: 32px;">{{ dateRange.currentDate[0] }}</el-link>
          </template>
        </DateSettingCard>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="10">
        <el-row :gutter="24" style="margin-bottom: 24px;">
          <el-col :span="24" style="height: 350px;">
            <DateChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]" date-range="week"/>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 800px;">
            <TimeChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]"/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <el-row :gutter="24" style="margin-bottom: 24px;">
          <el-col :span="14" style="height: 350px;">
            <IncOrExpRankChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]"/>
          </el-col>
          <el-col :span="10" style="height: 350px;">
            <IncOrExpPercentChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]"/>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 500px;">
            <TypeChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import DateSettingCard from "@/components/cards/DateSettingCard.vue";
import DataChart from "@/components/cards/charts/DataChart.vue";
import DateChart from "@/components/cards/charts/DateChart.vue";
import IncOrExpPercentChart from "@/components/cards/charts/IncOrExpPercentChart.vue";
import IncOrExpRankChart from "@/components/cards/charts/IncOrExpRankChart.vue";
import TimeChart from "@/components/cards/charts/TimeChart.vue";
import TypeChart from "@/components/cards/charts/TypeChart.vue";
import {getDateRange} from "@/utils/getDateRange";

const dateRange = getDateRange('week');
</script>