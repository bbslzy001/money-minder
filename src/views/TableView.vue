<template>
  <el-header style="display: flex; align-items: center; justify-content: flex-start;">
    <el-icon :size="18"><List /></el-icon>
    <div style="margin-left: 8px;">统计数据</div>
  </el-header>
  <el-divider style="margin: 4px 0 0 0;"/>
  <el-main>
    <Table/>
  </el-main>
</template>

<style>

</style>

<script setup lang="ts">
import {List} from "@element-plus/icons-vue";
import Table from "@/components/Table.vue";
</script>