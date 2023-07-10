<template>
  <el-header class="header">
    <el-icon :size="18"><Tools/></el-icon>
    <div class="header-title">工具</div>
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
  justify-content: flex-start;
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
import {Tools} from "@element-plus/icons-vue";
</script>