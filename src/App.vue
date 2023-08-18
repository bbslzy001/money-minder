<template>
  <el-container style="height: 100%;">
    <MySidebar/>
    <el-container direction="vertical">
      <router-view/>
    </el-container>
  </el-container>
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
</style>

<script setup lang="ts">
import MySidebar from "@/components/MySidebar.vue";
</script>