<template>
  <MyView>
    <template #title>
      <el-icon :size="24"><Document/></el-icon>
      <span class="title-text">交易明细</span>
    </template>
    <template #content>
      <el-container direction="vertical">
        <MyTableCard title="筛选条件" style="height: auto;">
          <template #content>
            <div class="input">
              <el-row :gutter="24" style="width: 100%;">
                <el-col :span="16">
                  <el-row :gutter="24">
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
          </template>
        </MyTableCard>
        <MyTableCard title="交易列表" style="margin-top: 24px;">
          <template #content>
            <MyTable :page-size="pageSize" :table-data="txnListForTable" :show-pagination="true" :unlimited-height="true">
              <template #table-content>
                <el-table-column prop="txnDateTime" label="交易时间" width="180"/>
                <el-table-column prop="txnTypeId" label="交易类型" width="120">
                  <template #default="scope">
                    <template v-for="o in txnTypeList" :key="o.txnTypeId">
                      <span v-if="scope.row.txnTypeId === 1 && o.txnTypeId === 1" v-text="`${o.txnTypeName}（${scope.row.originTxnType}）`"/>
                      <span v-else-if="scope.row.txnTypeId === o.txnTypeId" v-text="o.txnTypeName"/>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="txnCpty" label="交易方" width="240"/>
                <el-table-column prop="prodDesc" label="商品描述" width="auto" min-width="240"/>
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
              </template>
            </MyTable>
          </template>
        </MyTableCard>
      </el-container>
    </template>
  </MyView>

  <el-dialog v-model="updateTxnFormVisible" title="编辑交易信息" @close="resetUpdateTxnForm">
    <el-form ref="updateTxnFormRef" :model="updateTxnForm" :rules="updateTxnFormRules" label-width="100px" inline>
      <el-form-item label="交易日期" prop="txnDate">
        <el-date-picker v-model="updateTxnForm.txnDate" type="date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" placeholder="请选择交易日期"/>
      </el-form-item>
      <el-form-item label="交易时间" prop="txnTime">
        <el-time-picker v-model="updateTxnForm.txnTime" type="time" format="HH时mm分ss秒" value-format="HH:mm:ss" placeholder="请选择交易时间"/>
      </el-form-item>
      <el-form-item label="交易类型" prop="txnTypeId">
        <el-select v-model="updateTxnForm.txnTypeId" placeholder="请选择交易类型" clearable>
          <el-option v-for="o in txnTypeList" :key="o.txnTypeId" :label="o.txnTypeName" :value="o.txnTypeId"/>
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
        <el-button type="primary" plain @click="openAddRuleForm">自定义匹配规则</el-button>
        <span>
          <el-button @click="closeUpdateTxnForm">取消</el-button>
          <el-button type="primary" @click="submitUpdateTxnForm">确认</el-button>
        </span>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addRuleFormVisible" title="添加匹配规则" @close="resetAddRuleForm">
    <el-form ref="addRuleFormRef" :model="addRuleForm" :rules="addRuleFormRules" label-width="100px">
      <el-form-item label="交易类型" prop="txnTypeId">
        <el-select v-model="addRuleForm.txnTypeId" placeholder="请选择交易类型" clearable>
          <el-option v-for="o in txnTypeList" :key="o.txnTypeId" :label="o.txnTypeName" :value="o.txnTypeId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="原类型名称" prop="originTxnType">
        <el-input v-model="addRuleForm.originTxnType" autocomplete="off" placeholder="请输入原类型名称" clearable style="width: 240px;"/>
      </el-form-item>
      <el-form-item label="交易方" prop="txnCpty">
        <el-input v-model="addRuleForm.txnCpty" autocomplete="off" placeholder="请输入交易方" clearable/>
      </el-form-item>
      <el-form-item label="商品描述" prop="prodDesc">
        <el-input v-model="addRuleForm.prodDesc" autocomplete="off" placeholder="请输入商品描述" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="closeAddRuleForm">取消</el-button>
        <el-button type="primary" @click="submitAddRuleForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.title-text {
  margin-left: 16px;
  font-size: 24px;
}

.input {
  margin-bottom: 16px;
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

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {ElMessage, ElPopconfirm, FormInstance, FormRules} from "element-plus";
import {Document} from "@element-plus/icons-vue";
import MyView from "@/views/MyView.vue";
import MyTableCard from "@/components/cards/MyTableCard.vue";
import MyTable from "@/components/MyTable.vue";
import {jsonRequest} from '@/utils/request';
import {RequestCode} from '@/utils/requestCode';

interface Txn {
  txnId: number;
  txnDateTime: string;
  txnCpty: string;
  prodDesc: string;
  incOrExp: string;
  txnAmount: number;
  payMethod: string;
  txnStatus: string;
  originTxnType: string;
  txnTypeId: number;
}

interface TxnType {
  txnTypeId: number;
  txnTypeName: string;
}

interface Rule {
  ruleId: number;
  originTxnType: string;
  txnCpty: string;
  prodDesc: string;
  txnTypeId: number;
}

interface RuleConfig {
  addRuleApplyTxns: boolean;
  deleteRuleApplyTxns: boolean;
  updateRuleApplyTxns: boolean;
}

interface TxnFormValue extends Omit<Txn, 'txnDateTime'> {
  txnDate: string;
  txnTime: string;
}

const txnList = ref([]);
const txnTypeList = ref([]);
const ruleConfig = ref({});

const searchForTxnType = ref('');
const searchForTxnCpty = ref('');
const searchForProdDesc = ref('');
const selectedForIncOrExp = ref('全部');

const pageSize = ref(15);

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
  txnTypeId: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
});

const addRuleFormVisible = ref(false);
const addRuleForm = ref({});
const addRuleFormRef = ref<FormInstance>();
const addRuleFormRules = reactive<FormRules>({
  txnTypeId: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  originTxnType: [
    {
      validator: (rule: any, value: any, callback: any) => {
        const {txnCpty, prodDesc} = addRuleForm.value as Rule;
        if (!value && !txnCpty && !prodDesc) {
          callback(new Error('"原类型名称"、"交易方"、"商品描述"至少有一个不能为空'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    }
  ],
  txnCpty: [
    {
      validator: (rule: any, value: any, callback: any) => {
        const {originTxnType, prodDesc} = addRuleForm.value as Rule;
        if (!value && !originTxnType && !prodDesc) {
          callback(new Error('"原类型名称"、"交易方"、"商品描述"至少有一个不能为空'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  prodDesc: [
    {
      validator: (rule: any, value: any, callback: any) => {
        const {originTxnType, txnCpty} = addRuleForm.value as Rule;
        if (!value && !originTxnType && !txnCpty) {
          callback(new Error('"原类型名称"、"交易方"、"商品描述"至少有一个不能为空'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
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

const openAddRuleForm = () => {
  const txn = updateTxnForm.value as Txn;
  addRuleForm.value = {
    'originTxnType': txn.originTxnType,
    'txnCpty': txn.txnCpty,
    'prodDesc': txn.prodDesc,
    'txnTypeId': txn.txnTypeId,
  };
  addRuleFormVisible.value = true;
};

const closeAddRuleForm = () => {
  addRuleFormVisible.value = false;
};

const submitAddRuleForm = () => {
  addRuleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await addRuleRequest();
    }
  });
};

const resetAddRuleForm = () => {
  addRuleForm.value = {};
  addRuleFormRef.value?.resetFields();
};

const getRuleConfigRequest = async () => {
  try {
    const response = await jsonRequest.get('/config/get/1');
    if (response.status === RequestCode.SUCCESS) {
      ruleConfig.value = response.data.result.configValue;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTxnRequest = async (index: number, row: Txn) => {
  try {
    const response = await jsonRequest.delete(`/txn/delete/${row.txnId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success('删除成功');
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
    const response = await jsonRequest.put(`/txn/update/${txnId}`, {
      ...rest,
      txnDateTime,
      payMethod,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeUpdateTxnForm();
      ElMessage.success('更新成功');
      await getTxnRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('更新失败');
  }
};

const getTxnRequest = async () => {
  try {
    const response = await jsonRequest.get('/txn/getall');
    if (response.status === RequestCode.SUCCESS) {
      txnList.value = response.data.result;
    }
  } catch (error) {
    console.error(error);
  }
};

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

const addRuleRequest = async () => {
  try {
    const {originTxnType: tempOriginTxnType, txnCpty: tempTxnCpty, prodDesc: tempProdDesc, ...rest} = addRuleForm.value as Rule;
    const originTxnType = !tempOriginTxnType || tempOriginTxnType === '' ? '/' : tempOriginTxnType;
    const txnCpty = !tempTxnCpty || tempTxnCpty === '' ? '/' : tempTxnCpty;
    const prodDesc = !tempProdDesc || tempProdDesc === '' ? '/' : tempProdDesc;
    const arg = (ruleConfig.value as RuleConfig).addRuleApplyTxns ? '/apply-txns' : '';
    const response = await jsonRequest.post(`/rule/add${arg}`, {
      ...rest,
      originTxnType,
      txnCpty,
      prodDesc,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeAddRuleForm();
      closeUpdateTxnForm();
      ElMessage.success('添加成功');
      if ((ruleConfig.value as RuleConfig).addRuleApplyTxns) {
        await getTxnRequest();
      }
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('添加失败');
  }
};

const txnListForTable = computed(() => {
  if (txnList.value && txnList.value.length > 0) {
    return txnList.value.filter(
        (data: Txn) => {
          const txnType = (txnTypeList.value as TxnType[]).find((o) => o.txnTypeId === data.txnTypeId) as TxnType;
          return (selectedForIncOrExp.value === "全部" || data.incOrExp === selectedForIncOrExp.value) &&
              (!searchForTxnType.value || txnType.txnTypeName.toLowerCase().includes(searchForTxnType.value.toLowerCase())) &&
              (!searchForTxnCpty.value || data.txnCpty.toLowerCase().includes(searchForTxnCpty.value.toLowerCase())) &&
              (!searchForProdDesc.value || data.prodDesc.toLowerCase().includes(searchForProdDesc.value.toLowerCase()));
        }
    );
  } else {
    return [];
  }
});

onMounted(() => {
  getRuleConfigRequest();
  getTxnTypeRequest();
  getTxnRequest();
});
</script>