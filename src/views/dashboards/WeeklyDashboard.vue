<template>
  <el-container direction="vertical" style="height: calc((100vh - 110px) * 1.25);">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="10">
        <el-row style="height: calc(32% - 10px); margin-bottom: 20px;">
          <DateChart :start-date="startDate[1]" :end-date="endDate[1]" date-range="week"/>
        </el-row>
        <el-row style="height: calc(68% - 10px);">
          <TimeChart :start-date="startDate[1]" :end-date="endDate[1]"/>
        </el-row>
      </el-col>
      <el-col :span="14">
        <el-row :gutter="20" style="height: calc(12% - 10px); margin-bottom: 20px;">
          <el-col :span="16">
            <DataChart :start-date="startDate" :end-date="endDate" date-range="week"/>
          </el-col>
          <el-col :span="8">
            <DateSettingCard :extra="currentDate[1]">
              <template #link>
                <el-link type="primary" @click="" style="font-size: 32px;">{{ currentDate[0] }}</el-link>
              </template>
            </DateSettingCard>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: calc(32% - 10px); margin-bottom: 20px;">
          <el-col :span="14">
            <IncOrExpRankChart :start-date="startDate[1]" :end-date="endDate[1]"/>
          </el-col>
          <el-col :span="10">
            <IncOrExpPercentChart :start-date="startDate[1]" :end-date="endDate[1]"/>
          </el-col>
        </el-row>
        <el-row style="height: calc(48% - 10px);">
          <TypeChart :start-date="startDate[1]" :end-date="endDate[1]"/>
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

const startDate = ['2023-07-01 00:00:00', '2023-07-08 00:00:00'];
const endDate = ['2023-07-07 23:59:59', '2023-07-14 23:59:59'];

const currentDate = ['08日-14日', '2023年07月'];
</script>