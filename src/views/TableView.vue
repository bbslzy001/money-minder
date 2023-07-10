<template>
  <el-header class="header">
    <el-icon :size="18"><List/></el-icon>
    <div class="header-title">交易明细</div>
  </el-header>
  <el-divider class="divider"/>
  <el-main>
    <Table/>
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
</style>

<script setup lang="ts">
import {List} from "@element-plus/icons-vue";
import Table from "@/components/Table.vue";
</script>