<template>
  <div class="container">
    <div class="select">
      <div class="select-title">筛选条件</div>
      <div class="input">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input v-model="searchForTxnType" clearable size="default" placeholder="交易类型..."/>
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchForTxnCpty" clearable size="default" placeholder="交易方..."/>
              </el-col>
              <el-col :span="12">
                <el-input v-model="searchForProdDesc" clearable size="default" placeholder="商品描述..."/>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="radio">
        <el-radio-group v-model="selectedForIncOrExp">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收入">收入</el-radio-button>
          <el-radio-button label="支出">支出</el-radio-button>
          <el-radio-button label="不计">不计</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="table">
      <el-table :data="pagedTxnTable" size="default" table-layout="auto">
        <el-table-column prop="txnDateTime" label="交易时间" sortable width="180"/>
        <el-table-column prop="txnType" label="交易类型" width="120"/>
        <el-table-column prop="txnCpty" label="交易方" width="240" :show-overflow-tooltip="true"/>
        <el-table-column prop="prodDesc" label="商品描述" width="auto" :show-overflow-tooltip="true"/>
        <el-table-column prop="incOrExp" label="收入/支出" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.incOrExp === '收入'" type="success">收入</el-tag>
            <el-tag v-else-if="scope.row.incOrExp === '支出'" type="danger">支出</el-tag>
            <el-tag v-else-if="scope.row.incOrExp === '不计'" type="info">不计</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="txnAmount" label="交易金额" width="120"/>
        <el-table-column prop="payMethod" label="支付方式" width="180"/>
        <el-table-column prop="txnStatus" label="交易状态" width="120"/>
        <el-table-column align="right" label="操作" width="180">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openTxnForm(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="是否要删除本条交易" confirm-button-text="删除" @confirm="deleteTxnRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next" :total="txnTable.length" v-model:current-page="currentPageForTxn" :page-size="pageSize"/>
    </div>
  </div>

  <el-dialog v-model="txnFormVisible" title="编辑交易信息">
    <el-form :model="txnForm" :inline="true">
      <el-form-item label="交易日期" :label-width="formLabelWidth">
        <el-date-picker v-model="txnForm.txnDate" type="date" format="YYYY年MM月DD日" value-format="YYYY/MM/DD" placeholder="选择日期" clearable/>
      </el-form-item>
      <el-form-item label="交易时间" :label-width="formLabelWidth">
        <el-time-picker v-model="txnForm.txnTime" type="time" format="HH时mm分" value-format="HH:mm" placeholder="选择时间" clearable/>
      </el-form-item>
      <el-form-item label="交易类型" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnType" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="交易方" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnCpty" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <el-input v-model="txnForm.prodDesc" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="收入/支出" :label-width="formLabelWidth">
        <el-select v-model="txnForm.incOrExp" placeholder="请选择" clearable>
          <el-option label="收入" value="收入"/>
          <el-option label="支出" value="支出"/>
          <el-option label="不计" value="不计"/>
        </el-select>
      </el-form-item>
      <el-form-item label="交易金额" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnAmount" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth">
        <el-input v-model="txnForm.payMethod" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="交易状态" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnStatus" autocomplete="off" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="txnFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateTxnRequest">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.select {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  margin: 5px 0 20px;
}

.select-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input {
  margin-bottom: 10px;
}

.radio {
}

.table {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {ElMessage, ElPopconfirm} from "element-plus";
import request from '@/utils/request';
import {Code} from '@/utils/code';

interface Txn {
  txnId: number,
  txnDateTime: string,
  txnType: string,
  txnCpty: string,
  prodDesc: string,
  incOrExp: string,
  txnAmount: number,
  payMethod: string,
  txnStatus: string,
}

interface TxnFormValue extends Omit<Txn, 'txnDateTime'> {
  txnDate: string;
  txnTime: string;
}

const selectedForIncOrExp = ref("全部");
const searchForTxnType = ref('');
const searchForTxnCpty = ref('');
const searchForProdDesc = ref('');
const txnData = ref([
  {
    "txnId": 1,
    "txnDateTime": "2023/05/29 18:47",
    "txnType": "餐饮美食",
    "txnCpty": "烧饼焖烤鸡腿",
    "prodDesc": "收钱码收款",
    "incOrExp": "支出",
    "txnAmount": 23.5,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 2,
    "txnDateTime": "2023/05/29 14:50",
    "txnType": "生活服务",
    "txnCpty": "巡物社",
    "prodDesc": "巡物社(巡物社河南大学店)",
    "incOrExp": "支出",
    "txnAmount": 7.6,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 3,
    "txnDateTime": "2023/05/29 11:44",
    "txnType": "餐饮美食",
    "txnCpty": "示范区雷雪艳餐馆",
    "prodDesc": "河南大学_食堂",
    "incOrExp": "支出",
    "txnAmount": 13,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 4,
    "txnDateTime": "2023/05/29 0:53",
    "txnType": "转账红包",
    "txnCpty": "淘宝（中国）软件有限公司",
    "prodDesc": "淘宝签到提现",
    "incOrExp": "收入",
    "txnAmount": 0.11,
    "payMethod": "/",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 5,
    "txnDateTime": "2023/05/29 0:07",
    "txnType": "商业服务",
    "txnCpty": "上海顺显实业有限公司",
    "prodDesc": "自助设备消费",
    "incOrExp": "支出",
    "txnAmount": 0.05,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 6,
    "txnDateTime": "2023/05/29 0:07",
    "txnType": "商业服务",
    "txnCpty": "上海顺显实业有限公司",
    "prodDesc": "自助设备消费",
    "incOrExp": "支出",
    "txnAmount": 0.05,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 7,
    "txnDateTime": "2023/05/28 18:20",
    "txnType": "餐饮美食",
    "txnCpty": "河南大学",
    "prodDesc": "河南大学_食堂_南苑1楼29号山东杂粮煎饼",
    "incOrExp": "支出",
    "txnAmount": 7,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 8,
    "txnDateTime": "2023/05/28 13:40",
    "txnType": "日用百货",
    "txnCpty": "悦来悦喜",
    "prodDesc": "河南悦来悦喜-消费",
    "incOrExp": "支出",
    "txnAmount": 19,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 9,
    "txnDateTime": "2023/05/28 13:38",
    "txnType": "日用百货",
    "txnCpty": "学长超市",
    "prodDesc": "收钱码收款",
    "incOrExp": "支出",
    "txnAmount": 13,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 10,
    "txnDateTime": "2023/05/28 13:24",
    "txnType": "退款",
    "txnCpty": "美团",
    "prodDesc": "退款-美团订单-23052811100400000020948974010961",
    "incOrExp": "不计",
    "txnAmount": 44.1,
    "payMethod": "余额",
    "txnStatus": "退款成功"
  },
  {
    "txnId": 11,
    "txnDateTime": "2023/05/28 13:19",
    "txnType": "餐饮美食",
    "txnCpty": "美团",
    "prodDesc": "美团订单-23052811100400000020948974010961",
    "incOrExp": "支出",
    "txnAmount": 44.1,
    "payMethod": "余额",
    "txnStatus": "交易关闭"
  },
  {
    "txnId": 12,
    "txnDateTime": "2023/05/28 12:10",
    "txnType": "餐饮美食",
    "txnCpty": "河南大学",
    "prodDesc": "河南大学_食堂_东苑2楼5号摇滚炒鸡",
    "incOrExp": "支出",
    "txnAmount": 9,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 13,
    "txnDateTime": "2023/05/28 0:52",
    "txnType": "服饰装扮",
    "txnCpty": "周**",
    "prodDesc": "日本正品totoro宫崎骏龇牙提粽子龙猫公仔玩偶毛绒包挂件书包挂饰",
    "incOrExp": "支出",
    "txnAmount": 96.82,
    "payMethod": "余额",
    "txnStatus": "交易成功"
  },
  {
    "txnId": 14,
    "txnDateTime": "2023/05/28 0:29",
    "txnType": "转账红包",
    "txnCpty": "淘宝（中国）软件有限公司",
    "prodDesc": "淘宝签到提现",
    "incOrExp": "收入",
    "txnAmount": 0.12,
    "payMethod": "/",
    "txnStatus": "交易成功"
  }
]);
const currentPageForTxn = ref(1);
const pageSize = ref(10);
const txnFormVisible = ref(false);
const txnForm = ref({});
const formLabelWidth = '120px';

const getTxnRequest = async () => {
  try {
    const response = await request.get('/txn/getalldata');
    if (response.data.code === Code.GET_OK) {
      txnData.value = response.data.data;
      ElMessage.success(response.data.msg);
    } else if (response.data.code === Code.GET_ERR) {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const openTxnForm = (index: number, row: Txn) => {
  // 分割日期和时间
  const dateTime = row.txnDateTime.split(' ');
  const txnDate = dateTime[0];
  const txnTime = dateTime[1];

  // 删除 txnDateTime 字段
  const {txnDateTime, ...rest} = row;

  // 构建表单数据
  txnForm.value = {
    ...rest,
    txnDate,
    txnTime,
  };

  console.log(txnForm.value)

  // 打开表单对话框
  txnFormVisible.value = true;
};

const updateTxnRequest = async () => {
  try {
    const {txnDate, txnTime, ...rest} = txnForm.value as TxnFormValue;
    const txnDateTime = `${txnDate} ${txnTime}`;

    console.log(txnDateTime)

    const response = await request.put('/txn/update', {
      ...rest,
      txnDateTime,
    });
    if (response.data.code === Code.UPDATE_OK) {
      txnFormVisible.value = false;
      ElMessage.success(response.data.msg);
      getTxnRequest();
    } else if (response.data.code === Code.UPDATE_ERR) {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const deleteTxnRequest = async (index: number, row: Txn) => {
  try {
    const response = await request.delete('/txn/delete', {
      data: {
        txnId: row.txnId,
      },
    });
    if (response.data.code === Code.DELETE_OK) {
      ElMessage.success(response.data.msg);
      getTxnRequest();
    } else if (response.data.code === Code.DELETE_ERR) {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const txnTable = computed(() =>
    txnData.value.filter(
        (data: Txn) =>
            (selectedForIncOrExp.value === "全部" || data.incOrExp === selectedForIncOrExp.value) &&
            (!searchForTxnType.value || data.txnType.toLowerCase().includes(searchForTxnType.value.toLowerCase())) &&
            (!searchForTxnCpty.value || data.txnCpty.toLowerCase().includes(searchForTxnCpty.value.toLowerCase())) &&
            (!searchForProdDesc.value || data.prodDesc.toLowerCase().includes(searchForProdDesc.value.toLowerCase()))
    )
);

const pagedTxnTable = computed(() => {
  const start = (currentPageForTxn.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return txnTable.value.slice(start, end);
});

onMounted(() => {
  getTxnRequest();
});
</script>