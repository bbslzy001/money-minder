<template>
  <MyCard class="my-table-card">
    <template #content>
      <div v-if="props.title" class="my-table-card-header">
        <div class="my-table-card-header-title">
          <span>{{ props.title }}</span>
          <el-link v-if="props.showTitleTip" :icon="QuestionFilled as string" :underline="false" type="primary" @click="props.tipHandle"/>
        </div>
        <slot name="header-extra"/>
      </div>
      <div class="my-table-card-content">
        <slot name="content"/>
      </div>
    </template>
  </MyCard>
</template>

<style scoped>
.my-table-card {
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.my-table-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.my-table-card-header-title {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.my-table-card-header-title span {
  margin-right: 8px;
  font-size: 18px;
  font-weight: bold;
}

.my-table-card-content {
  flex: 1;
}
</style>

<script setup lang="ts">
import {QuestionFilled} from "@element-plus/icons-vue";
import MyCard from "@/components/cards/MyCard.vue";

interface Props {
  title?: string;
  showTitleTip?: boolean;
  tipHandle?: () => void;
}

const props = defineProps<Props>();
</script>