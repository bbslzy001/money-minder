<template>
  <el-header class="header">
    <div style="display: flex; align-items: center; justify-content: flex-start;">
      <el-icon :size="18"><Menu/></el-icon>
      <div class="header-title">分析图表</div>
    </div>
    <div style="display: flex; height: 60px; align-items: end;">
      <el-menu :default-active="activeView" mode="horizontal" :ellipsis="false">
        <el-menu-item index="day-analysis" @click="$router.push('/dashboard/day-analysis')">
          <template #title>日分析</template>
        </el-menu-item>
        <el-menu-item index="week-analysis" @click="$router.push('/dashboard/week-analysis')">
          <template #title>周分析</template>
        </el-menu-item>
        <el-menu-item index="month-analysis" @click="$router.push('/dashboard/month-analysis')">
          <template #title>月分析</template>
        </el-menu-item>
        <el-menu-item index="year-analysis" @click="$router.push('/dashboard/year-analysis')">
          <template #title>年分析</template>
        </el-menu-item>
        <el-menu-item index="all-analysis" @click="$router.push('/dashboard/all-analysis')">
          <template #title>总分析</template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
  <el-divider class="divider"/>
  <el-main style="overflow-y: auto;">
    <router-view/>
  </el-main>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.header-title {
  margin-left: 8px;
}

.divider {
  margin: 0;
}

.el-main {
  background-color: #fcfcfc;
}
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {Menu} from "@element-plus/icons-vue";

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/dashboard/day-analysis') return 'day-analysis';
  if (route.path === '/dashboard/week-analysis') return 'week-analysis';
  if (route.path === '/dashboard/month-analysis') return 'month-analysis';
  if (route.path === '/dashboard/year-analysis') return 'year-analysis';
  if (route.path === '/dashboard/all-analysis') return 'all-analysis';
  return '';
});
</script>