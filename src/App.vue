<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside style="width: auto; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: center; align-items: center; height: 64px;">
          <img src="./assets/logo.png" alt="logo" style="max-height: 100%; max-width: 100%;"/>
        </div>
        <el-divider style="margin: 0;"/>
        <el-menu :default-active="activeView" :collapse="true" style="flex: 1; background-color: #f5f6f8;">
          <el-menu-item index="/dashboard" @click="$router.push('/dashboard')">
            <el-icon :size="28"><Menu/></el-icon>
            <template #title>分析图表</template>
          </el-menu-item>
          <el-menu-item index="/table" @click="$router.push('/table')">
            <el-icon :size="28"><List/></el-icon>
            <template #title>交易明细</template>
          </el-menu-item>
          <el-menu-item index="/tool" @click="$router.push('/tool')">
            <el-icon :size="28"><Tools/></el-icon>
            <template #title>工具</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="flex-direction: column;">
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import {List, Menu, Tools} from "@element-plus/icons-vue";
import {computed} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/') return '/dashboard';
  if (route.path === '/dashboard' || route.path.startsWith('/dashboard/')) return '/dashboard';
  if (route.path === '/table') return '/table';
  if (route.path === '/tool' || route.path.startsWith('/tool/')) return '/tool';
  return '';
});
</script>