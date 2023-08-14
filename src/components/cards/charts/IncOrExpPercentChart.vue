<template>
  <MyChart title="收支占比">
    <template #content>
      <div id="analysis-by-inc-or-exp-percent"/>
    </template>
  </MyChart>
</template>

<style scoped>
#analysis-by-inc-or-exp-percent {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {ElMessage} from "element-plus";
import * as echarts from 'echarts';
import MyChart from "@/components/cards/charts/MyChart.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";
import resizeChart from "@/utils/resizeChart";

interface Props {
  startDate: string;
  endDate: string;
}

const props = defineProps<Props>();

const incomeAmount = ref();
const expenseAmount = ref();

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

const drawChart = () => {
  const myChart = echarts.init(document.getElementById('analysis-by-inc-or-exp-percent'));
  const option = {
    tooltip: {
      trigger: 'item',
      confine: true,
      formatter: (params: any) => {
        return params.name + ': ' + params.value.toFixed(2) + '元 (' + params.percent.toFixed(2) + '%)';
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        name: '收支占比',
        type: 'pie',
        radius: '75%',
        data: [
          {value: incomeAmount.value, name: '收入'},
          {value: expenseAmount.value, name: '支出'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  myChart.setOption(option);
  return myChart;
};

onMounted(async () => {
  await getIncomeRequest();
  await getExpenseRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('analysis-by-inc-or-exp-percent'));
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>