<template>
  <MyView>
    <template #title>
      <el-icon :size="24"><DataLine/></el-icon>
      <span class="title-text">分析报告</span>
    </template>
    <template #content>
      <router-view/>
    </template>
  </MyView>
</template>

<style scoped>
.title-text {
  margin-left: 16px;
  font-size: 24px;
}
</style>

<script setup lang="ts">
import {DataLine} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
</script>