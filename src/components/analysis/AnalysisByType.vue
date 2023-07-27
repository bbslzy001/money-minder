<template>
  <AnalysisTemplate title-content="各类型交易金额" tip-content="按照各交易类型的总金额进行排序">
    <template #header-tag>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #main-content>
      <div id="analysis-by-type"/>
    </template>
  </AnalysisTemplate>
</template>

<style scoped>
#analysis-by-type {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {ElMessage} from "element-plus";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";
import AnalysisTemplate from "@/components/analysis/AnalysisTemplate.vue";
import * as echarts from "echarts";

interface Props {
  startDate: string;
  endDate: string;
}

const props = defineProps<Props>();

const txnTypeList = ref([]);
const incomeList = ref([]);
const expenseList = ref([]);

const selectedForIncOrExp = ref('收入');

const getTxnTypeRequest = async () => {
  try {
    const response = await jsonRequest.get('/txn-type/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnTypeList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

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

const drawChart = () => {
  const myChart = echarts.init(document.getElementById('analysis-by-type'));
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      confine: true,
      formatter: (params: any) => {
        return params[0].name + ': ' + params[0].data.toFixed(2) + '元';
      },
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 元',
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: selectedForIncOrExp.value === '收入' ?
          incomeList.value.map((item: any) => {
            const type = txnTypeList.value.find((typeItem: any) => typeItem.txnTypeId === item.txnTypeId) as any;
            return type ? type.txnTypeName : '未知';
          }) :
          expenseList.value.map((item: any) => {
            const type = txnTypeList.value.find((typeItem: any) => typeItem.txnTypeId === item.txnTypeId) as any;
            return type ? type.txnTypeName : '未知';
          }),
    },
    series: [
      {
        type: 'bar',
        data: selectedForIncOrExp.value === '收入' ? incomeList.value.map((item: any) => item.txnAmount) : expenseList.value.map((item: any) => item.txnAmount),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
              0, 0, 1, 0,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'},
              ],
          ),
        },
      },
    ],
  };
  myChart.setOption(option);
}

onMounted(async () => {
  await getTxnTypeRequest();
  await getIncomeListRequest();
  await getExpenseListRequest();
  drawChart();

  watchEffect(() => {
    drawChart();
  });
});
</script>