<template>
  <el-card shadow="hover">
    <template #header>
      <div class="header">
        <el-icon :size="18"><Document/></el-icon>
        <div class="header-title">生成分析报告</div>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-title {
  margin-left: 8px;
}
</style>

<script setup lang="ts">
import {Document} from "@element-plus/icons-vue";
</script>