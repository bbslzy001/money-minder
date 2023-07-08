<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside style="width: auto; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: center; align-items: center; height: 64px;">
          <img src="./assets/logo.png" alt="logo" style="max-height: 100%; max-width: 100%;"/>
        </div>
        <el-divider style="margin: 0;"/>
        <el-menu default-active="1" :collapse="true" style="flex: 1; background-color: #f5f6f8;">
          <el-menu-item index="1" @click="$router.push('/dashboard')">
            <el-icon><Menu /></el-icon>
            <template #title>分析图表</template>
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push('/table')">
            <el-icon><List /></el-icon>
            <template #title>统计数据</template>
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push('/tool')">
            <el-icon><Tools /></el-icon>
            <template #title>工具</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
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

.el-main {
  padding: 0 !important;
}
</style>

<script setup lang="ts">
import {Menu, List, Tools} from "@element-plus/icons-vue";
</script>