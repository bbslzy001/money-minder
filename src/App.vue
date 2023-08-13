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
        <el-divider style="margin-top: 0;"/>
        <el-menu-item index="/upload" @click="$router.push('/upload')">
          <el-icon :size="24" style="margin-right: 20px;"><Upload/></el-icon>
          <template #title>上传</template>
        </el-menu-item>
        <el-divider content-position="left">{{ !isCollapse ? '分析' : '' }}</el-divider>
        <el-menu-item index="/dashboard" @click="$router.push('/dashboard')">
          <el-icon :size="24" style="margin-right: 20px;"><PieChart/></el-icon>
          <template #title>仪表板</template>
        </el-menu-item>
        <el-menu-item index="/report" @click="$router.push('/report')">
          <el-icon :size="24" style="margin-right: 20px;"><DataLine/></el-icon>
          <template #title>分析报告</template>
        </el-menu-item>
        <el-divider content-position="left">{{ !isCollapse ? '管理' : '' }}</el-divider>
        <el-menu-item index="/txn" @click="$router.push('/txn')">
          <el-icon :size="24" style="margin-right: 20px;"><Document/></el-icon>
          <template #title>交易明细</template>
        </el-menu-item>
        <el-menu-item index="/bill" @click="$router.push('/bill')">
          <el-icon :size="24" style="margin-right: 20px;"><Files/></el-icon>
          <template #title>账单</template>
        </el-menu-item>
        <el-menu-item index="/txn-type-rule" @click="$router.push('/txn-type-rule')">
          <el-icon :size="24" style="margin-right: 20px;"><CollectionTag/></el-icon>
          <template #title>匹配规则</template>
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
import {CollectionTag, DataLine, Document, Files, Fold, PieChart, Upload} from "@element-plus/icons-vue";

const isCollapse = ref(true);

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/') return '/dashboard';
  if (route.path === '/dashboard' || route.path.startsWith('/dashboard/')) return '/dashboard';
  if (route.path === '/report' || route.path.startsWith('/report/')) return '/report';
  if (route.path === '/upload' || route.path.startsWith('/upload/')) return '/upload';
  if (route.path === '/bill') return '/bill';
  if (route.path === '/txn') return '/txn';
  if (route.path === '/txn-type-rule') return '/txn-type-rule';
  return '';
});
</script>