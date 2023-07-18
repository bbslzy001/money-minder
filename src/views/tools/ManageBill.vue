<template>
  <el-container direction="vertical" style="height: 100%;">
    <div class="table">
      <div class="table-title">
        <div>账单列表</div>
        <div class="radio">
          <el-radio-group v-model="selectedForBillType">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="alipay">支付宝</el-radio-button>
            <el-radio-button label="wechat">微信</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-table :data="billListForTable" size="default" table-layout="auto" max-height="calc(100vh - 210px)">
        <el-table-column prop="billName" label="账单名称" sortable :show-overflow-tooltip="true"/>
        <el-table-column prop="startDate" label="起始日期" sortable/>
        <el-table-column prop="endDate" label="截止日期" sortable/>
        <el-table-column prop="billType" label="账单类型">
          <template #default="scope">
            <el-tag v-if="scope.row.billType === 'alipay'">支付宝</el-tag>
            <el-tag v-else-if="scope.row.billType === 'wechat'" type="success">微信</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openBillForm(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="是否删除该账单" confirm-button-text="删除" @confirm="deleteBillRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-container>

  <el-dialog v-model="billFormVisible" title="编辑交易信息" @close="resetBillForm(billFormRef)">
    <el-form ref="billFormRef" :model="billForm" :rules="billFormRules" :inline="true">
      <el-form-item label="账单名称" prop="billName" :label-width="formLabelWidth">
        <el-input v-model="billForm.billName" autocomplete="off" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="账单类型" prop="billType" :label-width="formLabelWidth">
        <el-select v-model="billForm.billType" placeholder="请选择" clearable>
          <el-option label="支付宝" value="alipay"/>
          <el-option label="微信" value="wechat"/>
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期" prop="startDate" :label-width="formLabelWidth">
        <el-date-picker v-model="billForm.startDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="截止日期" prop="endDate" :label-width="formLabelWidth">
        <el-date-picker v-model="billForm.endDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择日期"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="billFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBillForm(billFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.table {
  padding: 20px;
  background-color: white;
}

.table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.radio {
}
</style>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {ElMessage, ElPopconfirm, FormInstance, FormRules} from "element-plus";
import request from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

interface Bill {
  billId: number,
  billName: string,
  startDate: string,
  endDate: string,
  billType: string,
}

const selectedForBillType = ref('all');
const billList = ref([
  {
    'billId': 1,
    'billName': 'alipay123564111111111111111111111111111111111113',
    'startDate': '2023-01-01',
    'endDate': '2023-06-06',
    'billType': 'alipay'
  },
  {
    'billId': 2,
    'billName': 'alipay1236656413',
    'startDate': '2023-04-01',
    'endDate': '2023-06-01',
    'billType': 'alipay'
  },
  {
    'billId': 3,
    'billName': 'alipay1235116413',
    'startDate': '2023-01-01',
    'endDate': '2023-05-05',
    'billType': 'alipay'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
  {
    'billId': 4,
    'billName': 'wechat1235677413',
    'startDate': '2023-03-03',
    'endDate': '2023-06-06',
    'billType': 'wechat'
  },
]);
const billFormVisible = ref(false);
const billFormRef = ref<FormInstance>();
const billForm = reactive({
  billId: 0,
  billName: '',
  startDate: '',
  endDate: '',
  billType: '',
});
const formLabelWidth = '120px';
const billFormRules = reactive<FormRules>({
  billName: [
    { required: true, message: '请输入账单名称', trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: '请选择起始日期', trigger: 'blur' }
  ],
  endDate: [
    { required: true, message: '请选择截止日期', trigger: 'blur' }
  ],
  billType: [
    { required: true, message: '请选择账单类型', trigger: 'blur' }
  ],
});

const getBillRequest = async () => {
  try {
    const response = await request.jsonRequest.get('/bill/getall');
    if (response.status === RequestCode.SUCCESS) {
      billList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const openBillForm = (index: number, row: Bill) => {
  billForm.billId = row.billId;
  billForm.billName = row.billName;
  billForm.startDate = row.startDate;
  billForm.endDate = row.endDate;
  billForm.billType = row.billType;
  billFormVisible.value = true;
};

const submitBillForm = async (form: FormInstance | undefined) => {
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      updateBillRequest();
    }
  });
};

const resetBillForm = (form: FormInstance | undefined) => {
  if (!form) return
  form.resetFields()
}

const updateBillRequest = async () => {
  try {
    const response = await request.jsonRequest.put(`/bill/update/${billForm.billId}`, {
      'billName': billForm.billName,
      'startDate': billForm.startDate,
      'endDate': billForm.endDate,
      'billType': billForm.billType,
    });
    if (response.status === RequestCode.SUCCESS) {
      billFormVisible.value = false;
      ElMessage.success(response.data.message);
      getBillRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const deleteBillRequest = async (index: number, row: Bill) => {
  try {
    const response = await request.jsonRequest.delete(`/bill/delete/${row.billId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      getBillRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('未知错误');
  }
};

const billListForTable = computed(() => {
  if (billList.value && billList.value.length > 0) {
    return billList.value.filter(
        (data: Bill) =>
            (selectedForBillType.value === "all" || data.billType === selectedForBillType.value)
    );
  } else {
    return [];
  }
});
onMounted(() => {
  getBillRequest();
});
</script>