<template>
  <MyView>
    <template #title>
      <el-icon :size="20"><Document/></el-icon>
      <span class="title-text">交易明细</span>
    </template>
    <template #content>
      <MyTable/>
    </template>
  </MyView>
</template>

<style scoped>
.title-text {
  margin-left: 8px;
  font-size: 20px;
}
</style>

<script setup lang="ts">
import {Document} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
import MyTable from "@/components/MyTable.vue";
</script>