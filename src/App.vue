<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-menu :default-active="activeView" :collapse="isCollapse" class="drawer" @click="isCollapse = false">
        <el-menu-item style="height: 64px; padding: 10px;" class="app-title">
          <div style="display: flex; justify-content: space-between; align-items: center; height: 64px; width: 196px;">
            <img src="./assets/logo.png" alt="logo" style="max-height: 100%; max-width: 100%;"/>
            <el-button style="padding: 8px 0 8px 5px;" @click.stop="isCollapse = !isCollapse" v-if="!isCollapse">
              <el-icon :size="29"><Fold/></el-icon>
            </el-button>
          </div>
        </el-menu-item>
        <el-divider style="margin: 0;"/>
        <el-menu-item index="/dashboard" @click="$router.push('/dashboard')">
          <el-icon :size="24" style="margin-right: 20px;"><Menu/></el-icon>
          <template #title>分析图表</template>
        </el-menu-item>
        <el-menu-item index="/table" @click="$router.push('/table')">
          <el-icon :size="24" style="margin-right: 20px;"><List/></el-icon>
          <template #title>交易明细</template>
        </el-menu-item>
        <el-menu-item index="/tool" @click="$router.push('/tool')">
          <el-icon :size="24" style="margin-right: 20px;"><Tools/></el-icon>
          <template #title>工具</template>
        </el-menu-item>
      </el-menu>
      <el-container direction="vertical">
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.drawer:not(.el-menu--collapse) {
  width: 196px;
}

/* 自定义类来定义不可点击项的样式 */
.app-title {
  cursor: default; /* 鼠标指针设置为默认 */
  pointer-events: none; /* 防止点击事件 */
}

/* 不可点击项的悬停样式 */
.app-title:hover {
  background-color: transparent !important; /* 确保背景颜色不变 */
}

.app-title .el-button {
  pointer-events: auto;  /* 重新启用.el-icon的点击事件 */
}
</style>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Fold, List, Menu, Tools} from "@element-plus/icons-vue";

const isCollapse = ref(true);

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/') return '/dashboard';
  if (route.path === '/dashboard' || route.path.startsWith('/dashboard/')) return '/dashboard';
  if (route.path === '/table') return '/table';
  if (route.path === '/tool' || route.path.startsWith('/tool/')) return '/tool';
  return '';
});
</script>