<template>
  <MyChart title="收支程度">
    <template #content>
      <div id="month-calendar-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#month-calendar-chart {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
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
    const response = await jsonRequest.post('/analysis/amount-by-date', {
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
};

const getExpenseListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-date', {
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
};

const isEmpty = (incomeList: any[], expenseList: any[]) => {
  return incomeList.length === 0 && expenseList.length === 0;
};

const drawChart = () => {
  const myChart = echarts.init(document.getElementById('month-calendar-chart'));
  let option;
  if (isEmpty(incomeList.value, expenseList.value)) {
    option = {
      title: {
        text: '暂无数据',
        left: 'center',
        top: 'center',
        textStyle: {fontSize: 24, fontWeight: '100'},
      },
    };
  } else {
    option = {
      title: [
        {
          top: '0%',
          left: '20%',
          text: '收入'
        },
        {
          top: '0%',
          right: '20%',
          text: '支出'
        },
      ],
      tooltip: {
        backgroundColor: 'rgb(252,252,252)',
        confine: true,
        trigger: 'item',
        position: 'top',
        formatter: (params: any) => {
          console.log(params);
          return `${params.marker}${params.data[1]}元<br/>${params.data[0]}`;
        },
      },
      visualMap: [
        {
          seriesIndex: [0, 1],
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
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
          top: '20%',
          left: '5%',
          range: [props.startDate, props.endDate],
        },
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
          top: '20%',
          right: '5%',
          range: [props.startDate, props.endDate],
        },
      ],
      series: [
        {
          calendarIndex: 0,
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: incomeList.value.map((item: any) => [item.txnDate, item.txnAmount]),
        },
        {
          calendarIndex: 1,
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: expenseList.value.map((item: any) => [item.txnDate, item.txnAmount]),
        },
      ],
    };
  }
  myChart.setOption(option);
  return myChart;
};

watch(props, async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('month-calendar-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('month-calendar-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>