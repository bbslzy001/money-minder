<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="8">
        <MyStatisticCard :title="titles[1]" :footer-title="titles[0]" :footer-value="getPercent(txnCount.lastValue, txnCount.currentValue)"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-default.png')})` }">
          <template #content>
            <el-statistic :value="txnCount.currentValue" :precision="0" :suffix="'笔'"/>
          </template>
        </MyStatisticCard>
      </el-col>
      <el-col :span="8">
        <MyStatisticCard color="green" :title="titles[2]" :footer-title="titles[0]" :footer-value="getPercent(incomeAmount.lastValue, incomeAmount.currentValue)"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-green.png')})` }">
          <template #content>
            <el-statistic :value="incomeAmount.currentValue" :precision="2" :suffix="'元'"/>
          </template>
        </MyStatisticCard>
      </el-col>
      <el-col :span="8">
        <MyStatisticCard color="red" :title="titles[3]" :footer-title="titles[0]" :footer-value="getPercent(expenseAmount.lastValue, expenseAmount.currentValue)"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-red.png')})` }">
          <template #content>
            <el-statistic :value="expenseAmount.currentValue" :precision="2" :suffix="'元'"/>
          </template>
        </MyStatisticCard>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import MyStatisticCard from "@/components/cards/MyStatisticCard.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

interface Props {
  startDate: string[];
  endDate: string[];
  dateRange: string;
}

const props = defineProps<Props>();

const txnCount = ref({
  lastValue: 0,
  currentValue: 0,
});
const incomeAmount = ref({
  lastValue: 0,
  currentValue: 0,
});
const expenseAmount = ref({
  lastValue: 0,
  currentValue: 0,
});

const getCountRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/count/2', {
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
    const response = await jsonRequest.post('/analysis/amount/2', {
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
    const response = await jsonRequest.post('/analysis/amount/2', {
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

const titles = computed(() => {
  switch (props.dateRange) {
    case 'day':
      return ['相较昨日','本日交易数','本日收入','本日支出'];
    case 'week':
      return ['相较上周','本周交易数','本周收入','本周支出'];
    case 'month':
      return ['相较上月','本月交易数','本月收入','本月支出'];
    case 'year':
      return ['相较去年','本年交易数','本年收入','本年支出'];
    default:
      return ['','总交易数','总收入','总支出'];
  }
});

const getPercent = (lastValue: number, currentValue: number) => {
  if (lastValue === 0) {
    return 0;
  }
  return parseFloat(((currentValue - lastValue) / lastValue * 100).toFixed(2));
};

onMounted(() => {
  getCountRequest();
  getIncomeRequest();
  getExpenseRequest();
});
</script>