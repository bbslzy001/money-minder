<template>
  <AnalysisTemplate title-content="date">
    <template #main-content>
      <div id="chart"/>
    </template>
  </AnalysisTemplate>
</template>

<style scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import AnalysisTemplate from "@/components/analysis/AnalysisTemplate.vue";
</script>