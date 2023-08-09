<template>
  <AnalysisTemplate title-content="收支排行" tip-content="按收支金额从高到低排，取前五个交易">
    <template #analy-card-header-tag>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #analy-card-main-content>
      <el-table :data="selectedForIncOrExp == '收入' ? incomeList : expenseList" style="width: 100%" size="default" show-overflow-tooltip>
        <el-table-column prop="txnCpty" label="交易方" width="auto"/>
        <el-table-column prop="txnAmount" label="交易金额" align="right" width="120"/>
      </el-table>
    </template>
  </AnalysisTemplate>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import AnalysisTemplate from "@/components/analysis/AnalysisTemplate.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

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
    const response = await jsonRequest.post('/analysis/txns-by-amount-rank', {
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
    const response = await jsonRequest.post('/analysis/txns-by-amount-rank', {
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