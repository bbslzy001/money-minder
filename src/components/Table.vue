<template>
  <div class="table">
    <el-table :data="pagedTxnTable" max-height="60vh" size="default">
      <el-table-column prop="txnTime" label="交易时间" width="120"/>
      <el-table-column prop="txnType" label="交易类型" width="180"/>
      <el-table-column prop="txnCpty" label="交易方" width="180"/>
      <el-table-column prop="prodDesc" label="商品说明" width="180"/>
      <el-table-column prop="incOrExp" label="收入/支出" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.incOrExp === '收入'" type="success">收入</el-tag>
          <el-tag v-else-if="scope.row.incOrExp === '支出'" type="info">支出</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="txnAmount" label="交易金额" width="120"/>
      <el-table-column prop="payMethod" label="支付方式" width="120"/>
      <el-table-column prop="txnStatus" label="交易状态" width="120"/>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="searchForTxn" size="default" placeholder="按交易类型查询"/>
        </template>
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
</template>

<style scoped>
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
  txnTime: string,
  txnType: string,
  txnCpty: string,
  prodDesc: string,
  incOrExp: string,
  txnAmount: number,
  payMethod: string,
  txnStatus: string,
}

const searchForTxn = ref('');
const txnData = ref([]);
const currentPageForTxn = ref(1);
const pageSize = ref(10);
const txnFormVisible = ref(false);
const txnForm = ref({});

const getTxnDataRequest = async () => {
  try {
    const response = await request.get('/specificdata/getalldata');
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
  txnForm.value = {...row};
  txnFormVisible.value = true;
};

const updateTxnRequest = async () => {
  try {
    const response = await request.put('/specificdata/update', txnForm.value);
    if (response.data.code === Code.UPDATE_OK) {
      txnFormVisible.value = false;
      ElMessage.success(response.data.msg);
      getTxnDataRequest();
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
    const response = await request.delete(`/specificdata/delete/${row.txnId}`);
    if (response.data.code === Code.DELETE_OK) {
      ElMessage.success(response.data.msg);
      getTxnDataRequest();
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
            !searchForTxn.value ||
            data.txnType.toLowerCase().includes(searchForTxn.value.toLowerCase())
    )
)

const pagedTxnTable = computed(() => {
  const start = (currentPageForTxn.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return txnTable.value.slice(start, end);
});

onMounted(() => {
  getTxnDataRequest();
});
</script>