<template>
  <div class="image-card">
    <div class="image-background" :style="props.backgroundColorStyle">
      <div class="image" :style="props.imageStyle">
        <div class="image-title">
          <span>{{ props.title }}</span>
        </div>
      </div>
    </div>
    <div class="action">
      <el-link type="primary" @click="$router.push(props.actionPath)" style="font-size: 16px;">{{ props.actionText }}</el-link>
    </div>
  </div>
</template>

<style scoped>
.image-card {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 24px 4px 24px 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.image-card .image-background {
  width: 100%;
  height: 75%;
  border-radius: 24px 4px 0 0;
  z-index: 1;
}

.image-card .image {
  width: 100%;
  height: 100%;
  background-position: right top;
  background-size: auto 60%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;
}

.image-card .image-title {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: flex-start;
  padding: 8px 16px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  color: #ffffff;
}

.image-card .action {
  width: 100%;
  height: 25%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

<script setup lang="ts">
interface Props {
  title: string;
  actionPath: string;
  actionText: string;
  imageStyle: Object;
  backgroundColorStyle: Object;
}

const props = defineProps<Props>();
</script>