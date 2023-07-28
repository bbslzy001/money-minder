<template>
  <el-card shadow="hover" class="card" body-style="height: calc(100% - 40px); display: flex; flex-direction: column;">
    <div class="main">
      <div class="main-content">
        <el-icon :size="32"><Calendar/></el-icon>
        <slot name="link"/>
      </div>
      <div class="extra-content" v-if="props.extraContent">{{ props.extraContent }}</div>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}

.main {
  flex: 1;
}

.main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.extra-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
}
</style>

<script setup lang="ts">
import {Calendar} from "@element-plus/icons-vue";

interface Props {
  extraContent?: string;
}

const props = defineProps<Props>();
</script>