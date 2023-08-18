<template>
  <div class="my-view">
    <el-affix>
      <div class="my-view-header">
        <div class="my-view-header-title">
          <slot name="title"/>
        </div>
        <div class="my-view-header-extra">
          <slot name="extra"/>
        </div>
      </div>
    </el-affix>
    <el-main class="my-view-content">
      <slot name="content"/>
    </el-main>
  </div>
</template>

<style scoped>
.my-view {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: #f9fafb;
}

.my-view-header {
  width: 100%;
  height: 70px;
  padding: 10px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fafb;
}

.my-view-header-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.my-view-content {
  width: 100%;
}
</style>

<script setup lang="ts">

</script>