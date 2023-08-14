<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="8">
        <MyStatisticCard title="交易总数" footer-title="相较昨日" :footer-value="20"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-default.png')})` }">
          <template #content>
            <el-statistic :value="txnCount" :precision="0" :suffix="'笔'"/>
          </template>
        </MyStatisticCard>
      </el-col>
      <el-col :span="8">
        <MyStatisticCard color="green" title="总收入" footer-title="相较昨日" :footer-value="20"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-green.png')})` }">
          <template #content>
            <el-statistic :value="incomeAmount" :precision="2" :suffix="'元'"/>
          </template>
        </MyStatisticCard>
      </el-col>
      <el-col :span="8">
        <MyStatisticCard color="red" title="总支出" footer-title="相较昨日" :footer-value="-20"
                         :image-style="{ backgroundImage: `url(${require('@/assets/statistics-red.png')})` }">
          <template #content>
            <el-statistic :value="expenseAmount" :precision="2" :suffix="'元'"/>
          </template>
        </MyStatisticCard>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import MyStatisticCard from "@/components/cards/MyStatisticCard.vue";
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