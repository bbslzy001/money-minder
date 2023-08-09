<template>
  <div class="view-content">
    <el-affix>
      <div class="header">
        <div style="display: flex; align-items: center; justify-content: flex-start;">
          <el-icon :size="20"><Menu/></el-icon>
          <div class="header-title">分析图表</div>
        </div>
        <MyCard style="display: flex; align-items: center; justify-content: space-evenly; width: 280px; height: 50px;">
          <template #my-card-content>
            <img src="../assets/day.png" alt="day" class="image-button" @click="$router.push('/dashboard/day-analysis')" :class="{selected: activeView === 'day-analysis'}"/>
            <img src="../assets/week.png" alt="week" class="image-button" @click="$router.push('/dashboard/week-analysis')" :class="{selected: activeView === 'week-analysis'}"/>
            <img src="../assets/month.png" alt="month" class="image-button" @click="$router.push('/dashboard/month-analysis')" :class="{selected: activeView === 'month-analysis'}"/>
            <img src="../assets/year.png" alt="year" class="image-button" @click="$router.push('/dashboard/year-analysis')" :class="{selected: activeView === 'year-analysis'}"/>
            <img src="../assets/all.png" alt="all" class="image-button" @click="$router.push('/dashboard/all-analysis')" :class="{selected: activeView === 'all-analysis'}"/>
          </template>
        </MyCard>
      </div>
    </el-affix>
    <el-main>
      <router-view/>
    </el-main>
  </div>
</template>

<style scoped>
.view-content {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(to bottom, rgba(250, 250, 250, 1) 0%, rgba(210, 220, 230, 1) 100%);
}

.header {
  width: 100%;
  height: 70px;
  padding: 10px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(250, 250, 250);
}

.header-title {
  margin-left: 8px;
  font-size: 20px;
}

.el-main {
  width: 100%;
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
import {Menu} from "@element-plus/icons-vue";
import MyCard from "@/components/MyCard.vue";

const route = useRoute();

const activeView = computed(() => {
  if (route.path === '/dashboard/day-analysis') return 'day-analysis';
  if (route.path === '/dashboard/week-analysis') return 'week-analysis';
  if (route.path === '/dashboard/month-analysis') return 'month-analysis';
  if (route.path === '/dashboard/year-analysis') return 'year-analysis';
  if (route.path === '/dashboard/all-analysis') return 'all-analysis';
  return '';
});
</script>