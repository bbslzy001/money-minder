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
        <el-table-column prop="txnDateTime" label="交易时间" width="180"/>
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
        <el-table-column prop="payMethod" label="支付方式" width="180" :show-overflow-tooltip="true"/>
        <el-table-column prop="txnStatus" label="交易状态" width="120"/>
        <el-table-column align="right" label="操作" width="180">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openTxnForm(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="是否删除该交易" confirm-button-text="删除" @confirm="deleteTxnRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
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
        <el-date-picker v-model="txnForm.txnDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="交易时间" :label-width="formLabelWidth">
        <el-time-picker v-model="txnForm.txnTime" type="time" format="HH时mm分ss秒" value-format="HH:mm:ss" placeholder="请选择时间"/>
      </el-form-item>
      <el-form-item label="交易类型" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnType" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="交易方" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnCpty" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <el-input v-model="txnForm.prodDesc" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="收入/支出" :label-width="formLabelWidth">
        <el-select v-model="txnForm.incOrExp" placeholder="请选择">
          <el-option label="收入" value="收入"/>
          <el-option label="支出" value="支出"/>
          <el-option label="不计" value="不计"/>
        </el-select>
      </el-form-item>
      <el-form-item label="交易金额" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnAmount" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth">
        <el-input v-model="txnForm.payMethod" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="交易状态" :label-width="formLabelWidth">
        <el-input v-model="txnForm.txnStatus" autocomplete="off" placeholder="请输入" clearable/>
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
import {RequestCode} from '@/utils/requestCode';

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
  billId: number,
}

interface TxnFormValue extends Omit<Txn, 'txnDateTime'> {
  txnDate: string,
  txnTime: string,
}

const selectedForIncOrExp = ref('全部');
const searchForTxnType = ref('');
const searchForTxnCpty = ref('');
const searchForProdDesc = ref('');
const txnData = ref([]);
const currentPageForTxn = ref(1);
const pageSize = ref(10);
const txnFormVisible = ref(false);
const txnForm = ref({});
const formLabelWidth = '120px';

const getTxnRequest = async () => {
  try {
    const response = await request.jsonRequest.get('/txn/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnData.value = response.data.result;
      ElMessage.success(response.data.message);
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

  // 打开表单对话框
  txnFormVisible.value = true;
};

const updateTxnRequest = async () => {
  try {
    const {txnId, txnDate, txnTime, ...rest} = txnForm.value as TxnFormValue;
    const txnDateTime = `${txnDate} ${txnTime}`;
    const response = await request.jsonRequest.put(`/txn/update/${txnId}`, {
      ...rest,
      txnDateTime,
    });
    if (response.status === RequestCode.SUCCESS) {
      txnFormVisible.value = false;
      ElMessage.success(response.data.message);
      getTxnRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const deleteTxnRequest = async (index: number, row: Txn) => {
  try {
    const response = await request.jsonRequest.delete(`/txn/delete/${row.txnId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      getTxnRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const txnTable = computed(() => {
  if (txnData.value && txnData.value.length > 0) {
    return txnData.value.filter(
        (data: Txn) =>
            (selectedForIncOrExp.value === "全部" || data.incOrExp === selectedForIncOrExp.value) &&
            (!searchForTxnType.value || data.txnType.toLowerCase().includes(searchForTxnType.value.toLowerCase())) &&
            (!searchForTxnCpty.value || data.txnCpty.toLowerCase().includes(searchForTxnCpty.value.toLowerCase())) &&
            (!searchForProdDesc.value || data.prodDesc.toLowerCase().includes(searchForProdDesc.value.toLowerCase()))
    );
  } else {
    return [];
  }
});

const pagedTxnTable = computed(() => {
  if (txnTable.value && txnTable.value.length > 0) {
    const start = (currentPageForTxn.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return txnTable.value.slice(start, end);
  } else {
    return [];
  }
});

onMounted(() => {
  getTxnRequest();
});
</script>