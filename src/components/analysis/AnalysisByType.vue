<template>
  <AnalysisTemplate title-content="各类型交易金额" tip-content="按照各交易类型的总金额进行排序">
    <template #header-tag>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
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
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";
import AnalysisTemplate from "@/components/analysis/AnalysisTemplate.vue";

interface Props {
  startDate: string;
  endDate: string;
}

const props = defineProps<Props>();

const incomeList = ref([]);
const expenseList = ref([]);

const selectedForIncOrExp = ref('收入');

const getIncomeListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-type', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '收入',
    });
    if (response.status === RequestCode.SUCCESS) {
      incomeList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
}

const getExpenseListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-type', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '支出',
    });
    if (response.status === RequestCode.SUCCESS) {
      expenseList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
}

onMounted(() => {
  getIncomeListRequest();
  getExpenseListRequest();
});
</script>