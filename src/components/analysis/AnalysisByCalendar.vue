<template>
  <AnalysisTemplate title-content="收支程度">
    <template #header-tag>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #main-content>
      <div id="analysis-by-calendar"/>
    </template>
  </AnalysisTemplate>
</template>

<style scoped>
#analysis-by-calendar {
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

const incomeList = ref([]);
const expenseList = ref([]);

const selectedForIncOrExp = ref('收入');

const getIncomeListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-calendar', {
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
    const response = await jsonRequest.post('/analysis/amount-by-calendar', {
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
  const myChart = echarts.init(document.getElementById('analysis-by-calendar'));
  const option = {
    tooltip: {
      position: 'top',
      confine: true,
      formatter: (params: any) => {
        console.log(params);
        return `${params.marker}${params.data[1].toFixed(2)}元<br/>${params.data[0]}`;
      },
    },
    visualMap: [
      {
        calculable: true,
        orient: 'horizontal',
        left: 'right',
        bottom: 10,
        inRange: {
          color: ['#C7DBFF', '#5291FF'],
        },
      },
    ],
    calendar: [
      {
        orient: 'vertical',
        yearLabel: {
          show: false,
        },
        monthLabel: {
          show: false,
        },
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn',
        },
        cellSize: 30,
        top: 50,
        left: 10,
        range: [props.startDate, props.endDate],
      },
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: selectedForIncOrExp.value === '收入' ? incomeList.value.map((item: any) => [item.txnDate, item.txnAmount]) : expenseList.value.map((item: any) => [item.txnDate, item.txnAmount]),
      },
    ],
  };
  myChart.setOption(option);
}

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  drawChart();

  watchEffect(() => {
    drawChart();
  });
});
</script>