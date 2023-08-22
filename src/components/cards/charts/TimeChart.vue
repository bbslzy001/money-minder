<template>
  <MyChart title="交易时间轴">
    <template #content>
      <div id="time-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#time-chart {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
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
    }
  } catch (error) {
    console.error(error);
  }
};

const getExpenseListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/count-by-time', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '支出',
    });
    if (response.status === RequestCode.SUCCESS) {
      expenseList.value = response.data.result;
    }
  } catch (error) {
    console.error(error);
  }
};

const isEmpty = (incomeList: any[], expenseList: any[]) => {
  for (let i = 0; i < incomeList.length; i++) {
    if (incomeList[i].txnCount !== 0) {
      return false;
    }
  }

  for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].txnCount !== 0) {
      return false;
    }
  }
  return true;
};

const drawChart = () => {
  let myChart = echarts.getInstanceByDom(document.getElementById('time-chart') as HTMLElement);
  if (myChart === undefined) {
    myChart = echarts.init(document.getElementById('time-chart') as HTMLElement);
  }
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
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          let str = params[0].name + '<br/>';
          params.forEach((item: any) => {
            let value = item.value ? item.value : 0;
            str += item.seriesName + ': ' + Math.abs(value) + '笔<br/>';
          });
          return str;
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
          data: expenseList.value.map((item: any) => item.txnCount !== 0 ? -item.txnCount : null),
          barMaxWidth: 60,
          itemStyle: {
            color: 'rgba(255, 106, 106, 0.5)',
            borderColor: 'rgb(255, 106, 106)',
            borderWidth: 2,
            borderRadius: 5,
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '收入',
          type: 'bar',
          stack: '总量',
          data: incomeList.value.map((item: any) => item.txnCount !== 0 ? item.txnCount : null),
          barMaxWidth: 60,
          itemStyle: {
            color: 'rgba(0, 204, 102, 0.5)',
            borderColor: 'rgb(0, 204, 102)',
            borderWidth: 2,
            borderRadius: 5,
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
    };
  }
  myChart.setOption(option, true);

  // 不允许取消所有legend
  myChart.on('legendselectchanged', (params: any) => {
    const selectedItems = Object.keys(params.selected).filter(key => params.selected[key]);
    if (selectedItems.length === 0) {
      params.selected[params.name] = true;
      myChart.setOption({legend: {selected: params.selected}});
    }
  });

  return myChart;
};

watch(props, async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
});

onMounted(async () => {
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('time-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>