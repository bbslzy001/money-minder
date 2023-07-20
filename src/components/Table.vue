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
      <el-table :data="txnListForPagedTable" size="default" show-overflow-tooltip>
        <el-table-column prop="txnDateTime" label="交易时间" width="180"/>
        <el-table-column prop="txnType" label="交易类型" width="120"/>
        <el-table-column prop="txnCpty" label="交易方" width="240"/>
        <el-table-column prop="prodDesc" label="商品描述" width="auto"/>
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
            <el-button size="small" type="primary" @click="openUpdateTxnForm(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="是否删除该交易" confirm-button-text="删除" @confirm="deleteTxnRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next" :total="txnListForTable.length" v-model:current-page="currentPage" :page-size="pageSize"/>
    </div>
  </div>

  <el-dialog v-model="updateTxnFormVisible" title="编辑交易信息" @close="resetUpdateTxnForm">
    <el-form ref="updateTxnFormRef" :model="updateTxnForm" :rules="updateTxnFormRules" label-width="100px" inline>
      <el-form-item label="交易日期" prop="txnDate">
        <el-date-picker v-model="updateTxnForm.txnDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择交易日期"/>
      </el-form-item>
      <el-form-item label="交易时间" prop="txnTime">
        <el-time-picker v-model="updateTxnForm.txnTime" type="time" format="HH时mm分ss秒" value-format="HH:mm:ss" placeholder="请选择交易时间"/>
      </el-form-item>
      <el-form-item label="交易类型" prop="txnType">
        <el-select v-model="updateTxnForm.txnType" placeholder="请选择交易类型" clearable>
          <el-option v-for="o in txnTypeList" :key="o.txnTypeId" :label="o.txnTypeName" :value="o.txnTypeName"/>
        </el-select>
      </el-form-item>
      <el-form-item label="收入/支出" prop="incOrExp">
        <el-select v-model="updateTxnForm.incOrExp" placeholder="请选择收支类型" clearable>
          <el-option label="收入" value="收入"/>
          <el-option label="支出" value="支出"/>
          <el-option label="不计" value="不计"/>
        </el-select>
      </el-form-item>
      <el-form-item label="交易方" prop="txnCpty">
        <el-input v-model="updateTxnForm.txnCpty" autocomplete="off" placeholder="请输入交易方" clearable/>
      </el-form-item>
      <el-form-item label="商品描述" prop="prodDesc">
        <el-input v-model="updateTxnForm.prodDesc" autocomplete="off" placeholder="请输入商品描述" clearable/>
      </el-form-item>
      <el-form-item label="交易金额" prop="txnAmount">
        <el-input v-model="updateTxnForm.txnAmount" autocomplete="off" placeholder="请输入交易金额" clearable style="width: 240px;"/>
      </el-form-item>
      <el-form-item label="支付方式" prop="payMethod">
        <el-input v-model="updateTxnForm.payMethod" autocomplete="off" placeholder="请输入支付方式" clearable style="width: 240px;"/>
      </el-form-item>
      <el-form-item label="交易状态" prop="txnStatus">
        <el-input v-model="updateTxnForm.txnStatus" autocomplete="off" placeholder="请输入交易状态" clearable style="width: 240px;"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUpdateTxnForm">取消</el-button>
        <el-button type="primary" @click="submitUpdateTxnForm">确认</el-button>
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

.el-dialog .el-form {
  --el-form-inline-content-width: 240px;
}

.el-dialog .el-form .el-input {
  --el-form-inline-content-width: 480px;
}

::v-deep(.el-date-editor) {
  min-width: 240px;
}
</style>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {ElMessage, ElPopconfirm, FormInstance, FormRules} from "element-plus";
import request from '@/utils/request';
import {RequestCode} from '@/utils/requestCode';

interface Txn {
  txnId: number;
  txnDateTime: string;
  txnType: string;
  txnCpty: string;
  prodDesc: string;
  incOrExp: string;
  txnAmount: number;
  payMethod: string;
  txnStatus: string;
  billId: number;
}

interface TxnFormValue extends Omit<Txn, 'txnDateTime'> {
  txnDate: string;
  txnTime: string;
}

const txnList = ref([]);
const txnTypeList = ref([]);

const searchForTxnType = ref('');
const searchForTxnCpty = ref('');
const searchForProdDesc = ref('');
const selectedForIncOrExp = ref('全部');

const currentPage = ref(1);
const pageSize = ref(10);

const updateTxnFormVisible = ref(false);
const updateTxnForm = ref({});
const updateTxnFormRef = ref<FormInstance>();
const updateTxnFormRules = reactive<FormRules>({
  txnDate: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  txnTime: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  txnType: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  txnCpty: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  prodDesc: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  incOrExp: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  txnAmount: [
    {required: true, message: '不能为空', trigger: 'blur'},
    {
      validator: (rule: any, value: any, callback: any) => {
        if (isNaN(value) || parseFloat(value) <= 0) {
          callback(new Error('必须为正有理数'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  txnStatus: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
});

const openUpdateTxnForm = (index: number, row: Txn) => {
  const {txnDateTime, ...rest} = row;
  const dateTime = txnDateTime.split(' ');

  updateTxnForm.value = {
    ...rest,
    'txnDate': dateTime[0],
    'txnTime': dateTime[1],
  };

  updateTxnFormVisible.value = true;
};

const closeUpdateTxnForm = () => {
  updateTxnFormVisible.value = false;
}

const submitUpdateTxnForm = async () => {
  updateTxnFormRef.value?.validate(async (valid) => {
    if (valid) {
      await updateTxnRequest();
    }
  });
};

const resetUpdateTxnForm = () => {
  updateTxnForm.value = {};
  updateTxnFormRef.value?.resetFields();
}

const deleteTxnRequest = async (index: number, row: Txn) => {
  try {
    const response = await request.jsonRequest.delete(`/txn/delete/${row.txnId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      await getTxnRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('删除失败');
  }
};

const updateTxnRequest = async () => {
  try {
    const {txnId, txnDate: tempTxnDate, txnTime: tempTxnTime, payMethod: tempPayMethod, ...rest} = updateTxnForm.value as TxnFormValue;
    const txnDateTime = `${tempTxnDate} ${tempTxnTime}`;
    const payMethod = tempPayMethod === '' ? '/' : tempPayMethod;
    const response = await request.jsonRequest.put(`/txn/update/${txnId}`, {
      ...rest,
      txnDateTime,
      payMethod,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeUpdateTxnForm();
      ElMessage.success(response.data.message);
      await getTxnRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('更新失败');
  }
};

const getTxnRequest = async () => {
  try {
    const response = await request.jsonRequest.get('/txn/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

const getTxnTypeRequest = async () => {
  try {
    const response = await request.jsonRequest.get('/txn-type/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnTypeList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

const txnListForTable = computed(() => {
  if (txnList.value && txnList.value.length > 0) {
    return txnList.value.filter(
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

const txnListForPagedTable = computed(() => {
  if (txnListForTable.value && txnListForTable.value.length > 0) {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return txnListForTable.value.slice(start, end);
  } else {
    return [];
  }
});

onMounted(() => {
  getTxnRequest();
  getTxnTypeRequest();
});
</script>