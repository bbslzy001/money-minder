<template>
  <MyChart title="各类型交易金额" title-tip="按照各交易类型的总金额进行排序">
    <template #header-extra>
      <el-radio-group v-model="selectedForIncOrExp">
        <el-radio-button label="收入">收入</el-radio-button>
        <el-radio-button label="支出">支出</el-radio-button>
      </el-radio-group>
    </template>
    <template #content>
      <div id="type-chart"/>
    </template>
  </MyChart>
</template>

<style scoped>
#type-chart {
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

const txnTypeList = ref([]);
const incomeList = ref([]);
const expenseList = ref([]);

const selectedForIncOrExp = ref('收入');

const getTxnTypeRequest = async () => {
  try {
    const response = await jsonRequest.get('/txn-type/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnTypeList.value = response.data.result;
    }
  } catch (error) {
    console.error(error);
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
    }
  } catch (error) {
    console.error(error);
  }
};

const getExpenseListRequest = async () => {
  try {
    const response = await jsonRequest.post('/analysis/amount-by-type', {
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
  return incomeList.length === 0 && expenseList.length === 0;
};

const drawChart = () => {
  let myChart = echarts.getInstanceByDom(document.getElementById('type-chart') as HTMLElement);
  if (myChart === undefined) {
    myChart = echarts.init(document.getElementById('type-chart') as HTMLElement);
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
        type: 'value',
        axisLabel: {
          formatter: '{value}元',
        },
        minInterval: 0.01,
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
          barMaxWidth: 60,
          itemStyle: {
            color: 'rgba(0, 153, 255, 0.5)',
            borderColor: 'rgb(0, 153, 255)',
            borderWidth: 2,
            borderRadius: 5,
          },
        },
      ],
    };
  }
  myChart.setOption(option, true);
  return myChart;
};

watch(props, async () => {
  await getTxnTypeRequest();
  await getIncomeListRequest();
  await getExpenseListRequest();
});

onMounted(async () => {
  await getTxnTypeRequest();
  await getIncomeListRequest();
  await getExpenseListRequest();
  const myChart = drawChart();
  resizeChart.observe(myChart, document.getElementById('type-chart'));

  // 监听响应式数据变化
  watchEffect(() => {
    drawChart();
  });
});

onUnmounted(() => {
  resizeChart.unobserve();
});
</script>