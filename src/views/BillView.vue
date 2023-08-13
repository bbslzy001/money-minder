<template>
  <MyView>
    <template #title>
      <el-icon :size="20"><Files/></el-icon>
      <span class="title-text">管理账单</span>
    </template>
    <template #content>
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
          <el-table :data="billListForTable" size="default" table-layout="auto" max-height="calc(100vh - 210px)" show-overflow-tooltip>
            <el-table-column prop="billName" label="账单名称" sortable min-width="180"/>
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
                <el-button size="small" type="primary" @click="openUpdateBillForm(scope.$index, scope.row)">编辑</el-button>
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
    </template>
  </MyView>

  <el-dialog v-model="updateBillFormVisible" title="编辑交易信息" @close="resetUpdateBillForm">
    <el-form ref="updateBillFormRef" :model="updateBillForm" :rules="updateBillFormRules" label-width="100px" inline>
      <el-form-item label="账单名称" prop="billName">
        <el-input v-model="updateBillForm.billName" autocomplete="off" placeholder="请输入账单名称" clearable/>
      </el-form-item>
      <el-form-item label="起始日期" prop="startDate">
        <el-date-picker v-model="updateBillForm.startDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择起始日期"/>
      </el-form-item>
      <el-form-item label="截止日期" prop="endDate">
        <el-date-picker v-model="updateBillForm.endDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择截止日期"/>
      </el-form-item>
      <el-form-item label="账单类型" prop="billType">
        <el-select v-model="updateBillForm.billType" placeholder="请选择账单类型" clearable>
          <el-option label="支付宝" value="alipay"/>
          <el-option label="微信" value="wechat"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUpdateBillForm">取消</el-button>
        <el-button type="primary" @click="submitUpdateBillForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.title-text {
  margin-left: 8px;
  font-size: 20px;
}

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
import {Files} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
import {jsonRequest} from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

interface Bill {
  billId: number;
  billName: string;
  startDate: string;
  endDate: string;
  billType: string;
}

const billList = ref([]);

const selectedForBillType = ref('all');

const updateBillFormVisible = ref(false);
const updateBillForm = ref({});
const updateBillFormRef = ref<FormInstance>();
const updateBillFormRules = reactive<FormRules>({
  billName: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  startDate: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  endDate: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  billType: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
});

const openUpdateBillForm = (index: number, row: Bill) => {
  updateBillForm.value = {...row};
  updateBillFormVisible.value = true;
};

const closeUpdateBillForm = () => {
  updateBillFormVisible.value = false;
}

const submitUpdateBillForm = async () => {
  updateBillFormRef.value?.validate(async (valid) => {
    if (valid) {
      await updateBillRequest();
    }
  });
};

const resetUpdateBillForm = () => {
  updateBillForm.value = {};
  updateBillFormRef.value?.resetFields();
}

const deleteBillRequest = async (index: number, row: Bill) => {
  try {
    const response = await jsonRequest.delete(`/bill/delete/${row.billId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      await getBillRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('删除失败');
  }
};

const updateBillRequest = async () => {
  try {
    const {billId, ...rest} = updateBillForm.value as Bill
    const response = await jsonRequest.put(`/bill/update/${billId}`, {
      ...rest,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeUpdateBillForm();
      ElMessage.success(response.data.message);
      await getBillRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('更新失败');
  }
};

const getBillRequest = async () => {
  try {
    const response = await jsonRequest.get('/bill/getall');
    if (response.status === RequestCode.SUCCESS) {
      billList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
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