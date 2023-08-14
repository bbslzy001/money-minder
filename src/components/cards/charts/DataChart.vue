<template>
  <MyChart>
    <template #content>
      <el-row style="height: 100%;">
        <el-col :span="8">
          <el-statistic title="交易总数" :value="txnCount" :precision="0" :suffix="'笔'"></el-statistic>
        </el-col>
        <el-col :span="8">
          <el-statistic title="总收入" :value="incomeAmount" :precision="2" :suffix="'元'"></el-statistic>
        </el-col>
        <el-col :span="8">
          <el-statistic title="总支出" :value="expenseAmount" :precision="2" :suffix="'元'"></el-statistic>
        </el-col>
      </el-row>
    </template>
  </MyChart>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import MyChart from "@/components/cards/charts/MyChart.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

interface Props {
  startDate: string;
  endDate: string;
}

const props = defineProps<Props>();

const txnCount = ref();
const incomeAmount = ref();
const expenseAmount = ref();

const getCountRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/count', {
      startDate: props.startDate,
      endDate: props.endDate,
    });
    if (response.status === RequestCode.SUCCESS) {
      txnCount.value = response.data.result.txnCount;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

const getIncomeRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '收入',
    });
    if (response.status === RequestCode.SUCCESS) {
      incomeAmount.value = response.data.result.txnAmount;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

const getExpenseRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '支出',
    });
    if (response.status === RequestCode.SUCCESS) {
      expenseAmount.value = response.data.result.txnAmount;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

onMounted(() => {
  getCountRequest();
  getIncomeRequest();
  getExpenseRequest();
});
</script>