<template>
  <MyCard class="analy-card" style="display: flex; flex-direction: column;">
    <template #my-card-content>
      <div v-if="props.titleContent" class="analy-card-header">
        <div class="analy-card-header-title">
          <span>{{ props.titleContent }}</span>
          <el-tooltip v-if="props.tipContent" placement="bottom-start">
            <template #content>{{ props.tipContent }}</template>
            <el-icon :size="14"><InfoFilled/></el-icon>
          </el-tooltip>
        </div>
        <slot name="analy-card-header-tag"/>
      </div>
      <div class="analy-card-main">
        <slot name="analy-card-main-content"/>
      </div>
    </template>
  </MyCard>
</template>

<style scoped>
.analy-card {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.analy-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.analy-card-header-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
}

.analy-card-header-title span {
  margin-right: 4px;
}

.analy-card-main {
  flex: 1;
}
</style>

<script setup lang="ts">
import {InfoFilled} from "@element-plus/icons-vue";
import MyCard from "@/components/cards/MyCard.vue";

interface Props {
  titleContent?: string;
  tipContent?: string;
}

const props = defineProps<Props>();
</script>