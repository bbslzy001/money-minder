<template>
  <MyChart :style="`background-color: ${colorStyle.backgroundColor};`">
    <template #content>
      <div class="my-statistics-card" :style="props.imageStyle">
        <div class="my-statistics-card-header">
          <span>{{ props.title }}</span>
        </div>
        <slot name="content"/>
        <div class="my-statistics-card-footer">
          <span>{{ props.footerTitle }}</span>
          <span v-if="props.footerValue !== 0" class="my-statistics-card-footer-extra" :style="`color: ${colorStyle.textColor};`">
            <span>{{ props.footerValue }}%</span>
            <el-icon><component :is="iconComponent"/></el-icon>
          </span>
        </div>
      </div>
    </template>
  </MyChart>
</template>

<style scoped>
.my-statistics-card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  background-position: right top;
  background-size: auto 75%;
  background-repeat: no-repeat;
}

.my-statistics-card-header {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.my-statistics-card-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.my-statistics-card-footer-extra {
  background-color: white;
  padding: 4px;
  margin-left: 4px;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
import {computed} from "vue";
import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
import MyChart from "@/components/cards/charts/MyChart.vue";

interface Props {
  color?: string;
  title: string;
  footerTitle: string;
  footerValue: number;
  imageStyle: object;
}

const props = defineProps<Props>();

const colorStyle = computed(() => {
  let backgroundColor;
  let textColor;
  switch (props.color) {
    case 'green':
      backgroundColor = 'rgb(218, 234, 234)';
      textColor = 'rgb(66, 129, 129)';
      break;
    case 'red':
      backgroundColor = 'rgb(249, 224, 225)';
      textColor = 'rgb(199, 94, 99)';
      break;
    default:
      backgroundColor = 'rgb(216,226,252)';
      textColor = 'rgb(66, 102, 196)';
      break;
  }
  return {backgroundColor, textColor};
});

const iconComponent = computed(() => {
  return props.footerValue > 0 ? CaretTop : CaretBottom;
});
</script>