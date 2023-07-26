<template>
  <el-card shadow="hover" class="card" body-style="height: calc(100% - 40px); display: flex; flex-direction: column;">
    <div v-if="props.titleContent" class="header">
      <div class="header-title">
        <span>{{ props.titleContent }}</span>
        <el-tooltip v-if="props.tipContent" placement="bottom-start">
          <template #content>{{ props.tipContent }}</template>
          <el-icon :size="14"><InfoFilled/></el-icon>
        </el-tooltip>
      </div>
      <slot name="header-tag"/>
    </div>
    <div class="main">
      <slot name="main-content"/>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
}

.header-title span {
  margin-right: 4px;
}

.main {
  flex: 1;
}
</style>

<script setup lang="ts">
import {InfoFilled} from "@element-plus/icons-vue";

interface Props {
  titleContent?: string;
  tipContent?: string;
}

const props = defineProps<Props>();
</script>