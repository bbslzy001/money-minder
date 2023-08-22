<template>
  <el-container direction="vertical">
    <el-row :gutter="24" style="margin-bottom: 24px;">
      <el-col :span="18" style="height: 160px;">
        <DataChart :start-date="dateRange.startDate" :end-date="dateRange.endDate" date-range="custom"/>
      </el-col>
      <el-col :span="6" style="height: 160px;">
        <DateSettingCard :date="'日期范围'" :date-extra="`自：${dateRange.currentDate[1]}<br/>至：${dateRange.currentDate[2]}`" :date-value="dateRange.currentDate[0]" date-type="custom" @handle-date-change="updateDate"/>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 24px;">
      <el-col :span="24" style="height: 400px;">
        <DateChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]" date-range="custom"/>
      </el-col>
    </el-row>
    <el-row :gutter="24">
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
      <el-col :span="10">
        <el-row :gutter="24">
          <el-col :span="24" style="height: 800px;">
            <TimeChart :start-date="dateRange.startDate[1]" :end-date="dateRange.endDate[1]"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {computed, ref} from "vue";
import DataChart from "@/components/cards/charts/DataChart.vue";
import DateSettingCard from "@/components/cards/DateSettingCard.vue";
import IncOrExpPercentChart from "@/components/cards/charts/IncOrExpPercentChart.vue";
import IncOrExpRankChart from "@/components/cards/charts/IncOrExpRankChart.vue";
import TimeChart from "@/components/cards/charts/TimeChart.vue";
import DateChart from "@/components/cards/charts/DateChart.vue";
import TypeChart from "@/components/cards/charts/TypeChart.vue";
import {getDateRange} from "@/utils/getDateRange";

const currentDate = ref([(new Date()).toLocaleDateString(), (new Date()).toLocaleDateString()]);
const dateRange = computed(() => {
  return getDateRange('custom', currentDate.value);
});

const updateDate = (newDate: string[]) => {
  currentDate.value = newDate;
};
</script>