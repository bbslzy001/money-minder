<template>
  <el-header style="display: flex; align-items: center; justify-content: flex-start;">
    <el-icon :size="18"><Menu /></el-icon>
    <div style="margin-left: 8px;">分析图表</div>
  </el-header>
  <el-divider style="margin: 4px 0 0 0;"/>
  <el-main>Main</el-main>
</template>

<style scoped>
.el-main {
  background-color: #fcfcfc;
}
</style>

<script setup lang="ts">
import {Menu} from "@element-plus/icons-vue";
</script>