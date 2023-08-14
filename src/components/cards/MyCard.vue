<template>
  <div class="my-card">
    <slot name="content"/>
  </div>
</template>

<style scoped>
.my-card {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  box-sizing: border-box;
}
</style>

<script setup lang="ts">

</script>