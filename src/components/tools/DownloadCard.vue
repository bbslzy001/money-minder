<template>
  <el-card shadow="hover">
    <template #header>
      <div class="header">
        <el-icon :size="18"><Download/></el-icon>
        <div class="header-title">下载账单</div>
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
import {Download} from "@element-plus/icons-vue";
</script>