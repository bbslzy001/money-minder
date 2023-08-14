<template>
  <MyChart title="交易时间轴">
    <template #content>
      <div id="analysis-by-time"/>
    </template>
  </MyChart>
</template>

<style scoped>
#analysis-by-time {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {ElMessage} from "element-plus";
import * as echarts from "echarts";
import MyChart from "@/components/cards/charts/MyChart.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";
import resizeChart from "@/utils/resizeChart";

interface Props {
  startDate: string;
  endDate: string;
}

const props = defineProps<Props>();

const incomeList = ref([]);
const expenseList = ref([]);

const getIncomeListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/count-by-time', {
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
    const response = await jsonRequest.post('/analysis/count-by-time', {
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
  const myChart = echarts.init(document.getElementById('analysis-by-time'));
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      confine: true,
      formatter: (params: any) => {
        return params[0].name + '<br/>' +
            params[0].seriesName + ': ' + Math.abs(params[0].value) + '笔<br/>' +
            params[1].seriesName + ': ' + Math.abs(params[1].value) + '笔<br/>';
      },
    },
    legend: {
      data: ['支出', '收入'],
      left: 'left',
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '8%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
        boundaryGap: [0, 0.01],
        minInterval: 1,
        axisLabel: {
          formatter: (value: any) => {
            return Math.abs(value) + '笔';
          },
        },
      },
    ],
    yAxis: {
      type: 'category',
      inverse: true,
      data: incomeList.value.map((item: any) => item.timeRange),
    },
    series: [
      {
        name: '支出',
        type: 'bar',
        stack: '总量',
        data: expenseList.value.map((item: any) => -item.txnCount),
        barMaxWidth: '60',
      },
      {
        name: '收入',
        type: 'bar',
        stack: '总量',
        data: incomeList.value.map((item: any) => item.txnCount),
        barMaxWidth: '60',
      },
    ],
  };
  myChart.setOption(option);

  // 不允许取消所有legend
  myChart.on('legendselectchanged', (params: any) => {
    const selectedItems = Object.keys(params.selected).filter(key => params.selected[key]);
    if (selectedItems.length === 0) {
      params.selected[params.name] = true;
      myChart.setOption({legend: {selected: params.selected}});
    }
  });

  return myChart;
}

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('analysis-by-time'));
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>