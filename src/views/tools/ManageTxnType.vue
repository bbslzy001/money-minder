<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="6">
        <el-card shadow="never" style="height: 100%;">
          <div class="table-title">
            <div>交易类型列表</div>
          </div>
          <el-table :data="txnTypeList" size="default" max-height="calc(100vh - 240px)" show-overflow-tooltip>
            <el-table-column prop="txnTypeName" label="类型名称" width="auto" sortable/>
            <el-table-column align="right" label="操作" width="180">
              <template #default="scope">
                <el-button size="small" type="primary" @click="openUpdateTxnTypeForm(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm title="是否删除该交易类型" confirm-button-text="删除" @confirm="deleteTxnTypeRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" plain style="width: 100%; margin-top: 16px;" @click="openAddTxnTypeForm">添加</el-button>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="never" style="height: 100%;">
          <div class="table-title">
            <div>匹配规则列表</div>
          </div>
          <el-table :data="ruleList" size="default" max-height="calc(100vh - 240px)" show-overflow-tooltip>
            <el-table-column prop="txnTypeId" label="交易类型" width="180" sortable>
              <template #default="scope">
                <template v-for="o in txnTypeList" :key="o.txnTypeId">
                  <span v-if="scope.row.txnTypeId === o.txnTypeId" v-text="o.txnTypeName"/>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="originTxnType" label="原类型名称" width="180"/>
            <el-table-column prop="txnCpty" label="交易方" width="240"/>
            <el-table-column prop="prodDesc" label="商品描述" width="auto"/>
            <el-table-column align="right" label="操作" width="180">
              <template #default="scope">
                <el-button size="small" type="primary" @click="openUpdateRuleForm(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm title="是否删除该匹配规则" confirm-button-text="删除" @confirm="deleteRuleRequest(scope.$index, scope.row)" cancel-button-text="取消" width="200">
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" plain style="width: 100%; margin-top: 16px;" @click="openAddRuleForm">添加</el-button>
        </el-card>
      </el-col>
    </el-row>
  </el-container>

  <el-dialog v-model="addTxnTypeFormVisible" title="添加交易类型" @close="resetAddTxnTypeForm">
    <el-form ref="addTxnTypeFormRef" :model="addTxnTypeForm" :rules="addTxnTypeFormRules" label-width="100px">
      <el-form-item label="类型名称" prop="txnTypeName">
        <el-input v-model="addTxnTypeForm.txnTypeName" autocomplete="off" placeholder="请输入类型名称" clearable style="width: 240px;"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeAddTxnTypeForm">取消</el-button>
        <el-button type="primary" @click="submitAddTxnTypeForm">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateTxnTypeFormVisible" title="编辑交易类型" @close="resetUpdateTxnTypeForm">
    <el-form ref="updateTxnTypeFormRef" :model="updateTxnTypeForm" :rules="updateTxnTypeFormRules" label-width="100px">
      <el-form-item label="类型名称" prop="txnTypeName">
        <el-input v-model="updateTxnTypeForm.txnTypeName" autocomplete="off" placeholder="请输入类型名称" clearable style="width: 240px;"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUpdateTxnTypeForm">取消</el-button>
        <el-button type="primary" @click="submitUpdateTxnTypeForm">确认</el-button>
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
      <span class="dialog-footer">
        <el-button @click="closeAddRuleForm">取消</el-button>
        <el-button type="primary" @click="submitAddRuleForm">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updateRuleFormVisible" title="编辑匹配规则" @close="resetUpdateRuleForm">
    <el-form ref="updateRuleFormRef" :model="updateRuleForm" :rules="updateRuleFormRules" label-width="100px">
      <el-form-item label="交易类型" prop="txnTypeId">
        <el-select v-model="updateRuleForm.txnTypeId" placeholder="请选择交易类型" clearable>
          <el-option v-for="o in txnTypeList" :key="o.txnTypeId" :label="o.txnTypeName" :value="o.txnTypeId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="原类型名称" prop="originTxnType">
        <el-input v-model="updateRuleForm.originTxnType" autocomplete="off" placeholder="请输入原类型名称" clearable style="width: 240px;"/>
      </el-form-item>
      <el-form-item label="交易方" prop="txnCpty">
        <el-input v-model="updateRuleForm.txnCpty" autocomplete="off" placeholder="请输入交易方" clearable/>
      </el-form-item>
      <el-form-item label="商品描述" prop="prodDesc">
        <el-input v-model="updateRuleForm.prodDesc" autocomplete="off" placeholder="请输入商品描述" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUpdateRuleForm">取消</el-button>
        <el-button type="primary" @click="submitUpdateRuleForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.table-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.el-dialog .el-input {
  width: 480px;
}

.el-dialog .el-select {
  width: 240px;
}
</style>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import request from "@/utils/request";
import {RequestCode} from "@/utils/requestCode";

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

const txnTypeList = ref([]);
const ruleList = ref([]);

const addTxnTypeFormVisible = ref(false);
const addTxnTypeForm = ref({});
const addTxnTypeFormRef = ref<FormInstance>();
const addTxnTypeFormRules = reactive<FormRules>({
  txnTypeName: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
});

const updateTxnTypeFormVisible = ref(false);
const updateTxnTypeForm = ref({});
const updateTxnTypeFormRef = ref<FormInstance>();
const updateTxnTypeFormRules = reactive<FormRules>({
  txnTypeName: [
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

const updateRuleFormVisible = ref(false);
const updateRuleForm = ref({});
const updateRuleFormRef = ref<FormInstance>();
const updateRuleFormRules = reactive<FormRules>({
  txnTypeId: [
    {required: true, message: '不能为空', trigger: 'blur'},
  ],
  originTxnType: [
    {
      validator: (rule: any, value: any, callback: any) => {
        const {txnCpty, prodDesc} = updateRuleForm.value as Rule;
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
        const {originTxnType, prodDesc} = updateRuleForm.value as Rule;
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
        const {originTxnType, txnCpty} = updateRuleForm.value as Rule;
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

const openAddTxnTypeForm = () => {
  addTxnTypeFormVisible.value = true;
};

const closeAddTxnTypeForm = () => {
  addTxnTypeFormVisible.value = false;
};

const submitAddTxnTypeForm = () => {
  addTxnTypeFormRef.value?.validate(async (valid) => {
    if (valid) {
      await addTxnTypeRequest();
    }
  });
};

const resetAddTxnTypeForm = () => {
  addTxnTypeForm.value = {};
  addTxnTypeFormRef.value?.resetFields();
};

const openUpdateTxnTypeForm = (index: number, row: TxnType) => {
  updateTxnTypeForm.value = {...row};
  updateTxnTypeFormVisible.value = true;
};

const closeUpdateTxnTypeForm = () => {
  updateTxnTypeFormVisible.value = false;
};

const submitUpdateTxnTypeForm = () => {
  updateTxnTypeFormRef.value?.validate(async (valid) => {
    if (valid) {
      await updateTxnTypeRequest();
    }
  });
};

const resetUpdateTxnTypeForm = () => {
  updateTxnTypeForm.value = {};
  updateTxnTypeFormRef.value?.resetFields();
};

const openAddRuleForm = () => {
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

const openUpdateRuleForm = (index: number, row: Rule) => {
  updateRuleForm.value = {...row};
  updateRuleFormVisible.value = true;
};

const closeUpdateRuleForm = () => {
  updateRuleFormVisible.value = false;
};

const submitUpdateRuleForm = () => {
  updateRuleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await updateRuleRequest();
    }
  });
};

const resetUpdateRuleForm = () => {
  updateRuleForm.value = {};
  updateRuleFormRef.value?.resetFields();
};

const addTxnTypeRequest = async () => {
  try {
    const response = await request.jsonRequest.post('/txn-type/add', addTxnTypeForm.value);
    if (response.status === RequestCode.SUCCESS) {
      closeAddTxnTypeForm();
      ElMessage.success(response.data.message);
      await getTxnTypeRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('添加失败');
  }
};

const deleteTxnTypeRequest = async (index: number, row: TxnType) => {
  try {
    const response = await request.jsonRequest.delete(`/txn-type/delete/${row.txnTypeId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      await getTxnTypeRequest();
      await getRuleRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('删除失败');
  }
};

const updateTxnTypeRequest = async () => {
  try {
    const {txnTypeId, ...rest} = updateTxnTypeForm.value as TxnType;
    const response = await request.jsonRequest.put(`/txn-type/update/${txnTypeId}`, {
      ...rest,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeUpdateTxnTypeForm();
      ElMessage.success(response.data.message);
      await getTxnTypeRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('更新失败');
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

const addRuleRequest = async () => {
  try {
    const {originTxnType: tempOriginTxnType, txnCpty: tempTxnCpty, prodDesc: tempProdDesc, ...rest} = addRuleForm.value as Rule;
    const originTxnType = !tempOriginTxnType || tempOriginTxnType === '' ? '/' : tempOriginTxnType;
    const txnCpty = !tempTxnCpty || tempTxnCpty === '' ? '/' : tempTxnCpty;
    const prodDesc = !tempProdDesc || tempProdDesc === '' ? '/' : tempProdDesc;
    const response = await request.jsonRequest.post('/rule/add', {
      ...rest,
      originTxnType,
      txnCpty,
      prodDesc,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeAddRuleForm();
      ElMessage.success(response.data.message);
      await getRuleRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('添加失败');
  }
};

const deleteRuleRequest = async (index: number, row: Rule) => {
  try {
    const response = await request.jsonRequest.delete(`/rule/delete/${row.ruleId}`);
    if (response.status === RequestCode.SUCCESS) {
      ElMessage.success(response.data.message);
      await getRuleRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('删除失败');
  }
};

const updateRuleRequest = async () => {
  try {
    const {ruleId, originTxnType: tempOriginTxnType, txnCpty: tempTxnCpty, prodDesc: tempProdDesc, ...rest} = updateRuleForm.value as Rule;
    const originTxnType = tempOriginTxnType === '' ? '/' : tempOriginTxnType;
    const txnCpty = tempTxnCpty === '' ? '/' : tempTxnCpty;
    const prodDesc = tempProdDesc === '' ? '/' : tempProdDesc;
    const response = await request.jsonRequest.put(`/rule/update/${ruleId}`, {
      ...rest,
      originTxnType,
      txnCpty,
      prodDesc,
    });
    if (response.status === RequestCode.SUCCESS) {
      closeUpdateRuleForm();
      ElMessage.success(response.data.message);
      await getRuleRequest();
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('更新失败');
  }
};

const getRuleRequest = async () => {
  try {
    const response = await request.jsonRequest.get('/rule/getall');
    if (response.status === RequestCode.SUCCESS) {
      ruleList.value = response.data.result;
      ElMessage.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取失败');
  }
};

onMounted(() => {
  getTxnTypeRequest();
  getRuleRequest();
});
</script>