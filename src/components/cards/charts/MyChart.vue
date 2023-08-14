<template>
  <MyCard class="my-chart-card">
    <template #content>
      <div v-if="props.title" class="my-chart-card-header">
        <div class="my-chart-card-header-title">
          <span>{{ props.title }}</span>
          <el-tooltip v-if="props.titleTip" placement="bottom-start">
            <template #content>{{ props.titleTip }}</template>
            <el-icon :size="14"><InfoFilled/></el-icon>
          </el-tooltip>
        </div>
        <slot name="header-extra"/>
      </div>
      <div class="my-chart-card-content">
        <slot name="content"/>
      </div>
    </template>
  </MyCard>
</template>

<style scoped>
.my-chart-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.my-chart-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.my-chart-card-header-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.my-chart-card-header-title span {
  margin-right: 4px;
}

.my-chart-card-content {
  flex: 1;
}
</style>

<script setup lang="ts">
import {InfoFilled} from "@element-plus/icons-vue";
import MyCard from "@/components/cards/MyCard.vue";

interface Props {
  title?: string;
  titleTip?: string;
}

const props = defineProps<Props>();
</script>