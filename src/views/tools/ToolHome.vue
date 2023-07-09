<template>
  <el-row :gutter="20">
    <el-col :span="8"><UploadCard/></el-col>
    <el-col :span="8"><DownloadCard/></el-col>
    <el-col :span="8"><ReportCard/></el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>

<script setup lang="ts">
import UploadCard from "@/components/tools/UploadCard.vue";
import DownloadCard from "@/components/tools/DownloadCard.vue";
import ReportCard from "@/components/tools/ReportCard.vue";
</script>