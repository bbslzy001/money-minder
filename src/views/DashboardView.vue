<template>
  <el-header class="header">
    <div style="display: flex; align-items: center; justify-content: flex-start;">
      <el-icon :size="18"><Menu/></el-icon>
      <div class="header-title">分析图表</div>
    </div>
    <div style="display: flex; height: 60px; align-items: end;">
      <el-menu :default-active="activeView" mode="horizontal" :ellipsis="false">
        <el-menu-item index="day-analyse" @click="$router.push('/dashboard/day-analyse')">
          <template #title>日分析</template>
        </el-menu-item>
        <el-menu-item index="week-analyse" @click="$router.push('/dashboard/week-analyse')">
          <template #title>周分析</template>
        </el-menu-item>
        <el-menu-item index="month-analyse" @click="$router.push('/dashboard/month-analyse')">
          <template #title>月分析</template>
        </el-menu-item>
        <el-menu-item index="year-analyse" @click="$router.push('/dashboard/year-analyse')">
          <template #title>年分析</template>
        </el-menu-item>
        <el-menu-item index="all-analyse" @click="$router.push('/dashboard/all-analyse')">
          <template #title>总分析</template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
  <el-divider class="divider"/>
  <el-main>
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
import {Menu} from "@element-plus/icons-vue";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/dashboard/day-analyse') return 'day-analyse';
  if (route.path === '/dashboard/week-analyse') return 'week-analyse';
  if (route.path === '/dashboard/month-analyse') return 'month-analyse';
  if (route.path === '/dashboard/year-analyse') return 'year-analyse';
  if (route.path === '/dashboard/all-analyse') return 'all-analyse';
  return '';
});
</script>