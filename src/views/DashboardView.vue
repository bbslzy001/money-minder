<template>
  <MyView>
    <template #title>
      <el-icon :size="20"><PieChart/></el-icon>
      <span class="title-text">仪表板</span>
    </template>
    <template #extra>
      <MyCard style="display: flex; align-items: center; justify-content: space-evenly; width: 280px; height: 50px;">
        <template #my-card-content>
          <img src="../assets/day.png" alt="day" class="image-button" @click="$router.push('/dashboard/daily-dashboard')" :class="{selected: activeView === 'daily-dashboard'}"/>
          <img src="../assets/week.png" alt="week" class="image-button" @click="$router.push('/dashboard/weekly-dashboard')" :class="{selected: activeView === 'weekly-dashboard'}"/>
          <img src="../assets/month.png" alt="month" class="image-button" @click="$router.push('/dashboard/monthly-dashboard')" :class="{selected: activeView === 'monthly-dashboard'}"/>
          <img src="../assets/year.png" alt="year" class="image-button" @click="$router.push('/dashboard/yearly-dashboard')" :class="{selected: activeView === 'yearly-dashboard'}"/>
          <img src="../assets/all.png" alt="all" class="image-button" @click="$router.push('/dashboard/overall-dashboard')" :class="{selected: activeView === 'overall-dashboard'}"/>
        </template>
      </MyCard>
    </template>
    <template #content>
      <router-view/>
    </template>
  </MyView>
</template>

<style scoped>
.title-text {
  margin-left: 8px;
  font-size: 20px;
}

.image-button {
  width: 32px;
  height: 32px;
  filter: grayscale(100%);
  transition: filter 0.3s, transform 0.3s;
}

.image-button:hover {
  filter: grayscale(0%);
}

.image-button.selected {
  filter: grayscale(0%);
  transform: scale(1.1);
  box-shadow: 3px 3px rgb(22, 123, 223, 0.5);
}
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {PieChart} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
import MyCard from "@/components/cards/MyCard.vue";

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/dashboard/daily-dashboard') return 'daily-dashboard';
  if (route.path === '/dashboard/weekly-dashboard') return 'weekly-dashboard';
  if (route.path === '/dashboard/monthly-dashboard') return 'monthly-dashboard';
  if (route.path === '/dashboard/yearly-dashboard') return 'yearly-dashboard';
  if (route.path === '/dashboard/overall-dashboard') return 'overall-dashboard';
  return '';
});
</script>