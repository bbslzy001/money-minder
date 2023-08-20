<template>
  <MyView>
    <template #title>
      <el-icon :size="24"><Upload/></el-icon>
      <span class="title-text">上传</span>
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
import {Upload} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
</script>