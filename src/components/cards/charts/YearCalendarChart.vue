<template>
  <MyChart title="收支程度">
    <template #header-extra>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #content>
      <div id="year-calendar-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#year-calendar-chart {
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

const selectedForIncOrExp = ref('收入');

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
  const myChart = echarts.init(document.getElementById('year-calendar-chart'));
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
          cellSize: ['auto', 25],
          top: '8%',
          left: '2%',
          right: '1%',
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
  }
  myChart.setOption(option, true);
  return myChart;
};

watch(props, () => {
  getIncomeListRequest();
  getExpenseListRequest();
});

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('year-calendar-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>