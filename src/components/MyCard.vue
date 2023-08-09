<template>
  <div class="my-card">
    <slot name="my-card-content"/>
  </div>
</template>

<style scoped>
.my-card {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1); /* 阴影效果 */
  backdrop-filter: blur(3px); /* 毛玻璃效果 */
}
</style>

<script setup lang="ts">

</script>