<template>
  <MyCard style="padding: 20px; display: flex; flex-direction: column;">
    <template #content>
      <div style="flex: 1;">
        <div class="main-content">
          <el-icon :size="32"><Calendar/></el-icon>
          <slot name="link"/>
        </div>
        <div class="extra-content" v-if="props.extra">{{ props.extra }}</div>
      </div>
    </template>
  </MyCard>
</template>

<style scoped>
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
import MyCard from "@/components/cards/MyCard.vue";

interface Props {
  extra?: string;
}

const props = defineProps<Props>();
</script>