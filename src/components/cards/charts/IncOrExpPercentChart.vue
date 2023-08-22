<template>
  <MyChart title="收支占比">
    <template #content>
      <div id="inc-or-exp-percent-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#inc-or-exp-percent-chart {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
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

const incomeAmount = ref(0);
const expenseAmount = ref(0);

const getIncomeRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount/1', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '收入',
    });
    if (response.status === RequestCode.SUCCESS) {
      incomeAmount.value = response.data.result.txnAmount;
    }
  } catch (error) {
    console.error(error);
  }
};

const getExpenseRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount/1', {
      startDate: props.startDate,
      endDate: props.endDate,
      incOrExp: '支出',
    });
    if (response.status === RequestCode.SUCCESS) {
      expenseAmount.value = response.data.result.txnAmount;
    }
  } catch (error) {
    console.error(error);
  }
};

const isEmpty = (incomeAmount: any, expenseAmount: any) => {
  return incomeAmount === 0 && expenseAmount === 0;
};

const drawChart = () => {
  const myChart = echarts.init(document.getElementById('inc-or-exp-percent-chart'));
  let option;
  if (isEmpty(incomeAmount.value, expenseAmount.value)) {
    option = {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {fontSize: 24, fontWeight: '100'},
      },
    };
  } else {
    option = {
      tooltip: {
        backgroundColor: 'rgb(252,252,252)',
        confine: true,
        trigger: 'item',
        formatter: (params: any) => {
          return params.name + ': ' + params.value + '元 (' + params.percent + '%)';
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
            {
              value: incomeAmount.value === 0 ? null : incomeAmount.value,
              name: '收入'
            },
            {
              value: expenseAmount.value === 0 ? null : expenseAmount.value,
              name: '支出'
            },
          ],
          itemStyle: {
            normal: {
              color: (colors: { dataIndex: number; }) => {
                const colorList = [
                  'rgba(0, 204, 102)',
                  'rgba(255, 106, 106)',
                ];
                return colorList[colors.dataIndex];
              }
            },
          },
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
  }
  myChart.setOption(option, true);
  return myChart;
};

watch(props, async () => {
  await getIncomeRequest();
  await getExpenseRequest();
});

onMounted(async () => {
  await getIncomeRequest();
  await getExpenseRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('inc-or-exp-percent-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>