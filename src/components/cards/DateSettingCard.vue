<template>
  <MyCard class="analy-card" style="display: flex; flex-direction: column;">
    <template #my-card-content>
      <div class="analy-card-main">
        <div class="analy-card-main-content">
          <el-icon :size="32"><Calendar/></el-icon>
          <slot name="link"/>
        </div>
        <div class="analy-card-extra-content" v-if="props.extraContent">{{ props.extraContent }}</div>
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

.analy-card-main {
  flex: 1;
}

.analy-card-main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.analy-card-extra-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
}
</style>

<script setup lang="ts">
import {Calendar} from "@element-plus/icons-vue";
import MyCard from "@/components/cards/MyCard.vue";

interface Props {
  extraContent?: string;
}

const props = defineProps<Props>();
</script>