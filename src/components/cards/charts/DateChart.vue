<template>
  <MyChart title="收支趋势">
    <template #header-extra>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #content>
      <div id="date-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#date-chart {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import {ElMessage} from "element-plus";
import * as echarts from "echarts";
import MyChart from "@/components/cards/charts/MyChart.vue";
import {fillMissingDates} from "@/utils/fillMissingDates";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";
import resizeChart from "@/utils/resizeChart";

interface Props {
  startDate: string;
  endDate: string;
  dateRange: string;
}

const props = defineProps<Props>();

const incomeList = ref<any>([]);
const expenseList = ref<any>([]);

const selectedForIncOrExp = ref('收入');

const getIncomeListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-date', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '收入',
    });
    if (response.status === RequestCode.SUCCESS) {
      const result = response.data.result;
      if (result.length !== 0) incomeList.value = preprocessData(result);
      else if (result.length === 0 && incomeList.value.length !== 0) incomeList.value = [];
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
      const result = response.data.result;
      if (result.length !== 0) expenseList.value = preprocessData(result);
      else if (result.length === 0 && expenseList.value.length !== 0) expenseList.value = [];
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
  const myChart = echarts.init(document.getElementById('date-chart'));
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
        trigger: 'axis',
        formatter: (params: any) => {
          return params[0].name + ': ' + params[0].data + '元';
        },
      },
      grid: {
        left: '2%',
        right: '5%',
        top: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisSetting.value.dataList,
        axisLabel: {
          interval: xAxisSetting.value.interval,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}元',
        },
        minInterval: 0.01,
      },
      series: [
        {
          type: 'line',
          data: selectedForIncOrExp.value === '收入' ? incomeList.value.map((item: any) => item.txnAmount) : expenseList.value.map((item: any) => item.txnAmount),
        },
      ],
    };
  }
  myChart.setOption(option, true);
  return myChart;
};

const xAxisSetting = computed(() => {
  let dataList: string[];
  let interval: number;
  switch (props.dateRange) {
    case 'week':
      dataList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      interval = 0;
      break;
    case 'month':
      dataList = [
        '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日',
        '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日',
        '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日',
        '31日',
      ];
      interval = 2;
      break;
    case 'year':
      dataList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      interval = 0;
      break;
    default:
      dataList = [];
      interval = 0;
      break;
  }
  return {dataList, interval};
});

const preprocessData = (originDataList: any[]): any[] => {
  let dataList: any[];
  dataList = fillMissingDates(originDataList, new Date(props.startDate), new Date(props.endDate));
  if (props.dateRange === 'year') {
    // 按月份分组求和，txnDate格式为yyyy-MM-dd HH:mm:ss
    const map = new Map();
    dataList.forEach((item: any) => {
      const month = item.txnDate.split('-')[1];
      const amount = item.txnAmount;
      if (map.has(month)) {
        map.set(month, map.get(month) + amount);
      } else {
        map.set(month, amount);
      }
    });
    // 转换为数组，同时保证月份顺序，toFixed(2)保留两位小数，parseFloat去除多余的0
    dataList = [];
    map.forEach((value, key) => {
      dataList.push({
        txnAmount: parseFloat(value.toFixed(2)),
        txnDate: key
      });
    });
  }
  return dataList;
}

watch(props, async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
});

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('date-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>