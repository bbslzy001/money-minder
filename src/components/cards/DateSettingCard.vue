<template>
  <MyCard style="padding: 20px; display: flex; flex-direction: column; background-color: rgb(227, 219, 237);">
    <template #content>
      <div class="my-date-setting-card">
        <div class="my-date-setting-card-content">
          <el-popover :visible="dateSettingFormVisible" placement="left-start" :width="props.dateType !== 'custom' ? 300 : 600" @close="resetDateSettingForm">
            <template #reference>
              <el-link @click="openDateSettingForm" style="font-size: 36px; color: rgb(126, 94, 139);">{{ props.date }}</el-link>
            </template>
            <div style="padding: 4px 4px 20px;">
              <div style="font-size: 16px; margin-bottom: 16px;">{{ dateSettingFormData.title }}</div>
              <el-date-picker
                  v-model="dateSettingForm[0]"
                  :type="dateSettingFormData.type"
                  :format="dateSettingFormData.format"
                  value-format="YYYY-MM-DD"
                  :placeholder="props.dateType !== 'custom' ? '请选择日期范围' : '请选择起始日期'"
              />
              <span v-if="props.dateType === 'custom'" style="padding: 0 20px;">至</span>
              <el-date-picker
                  v-if="props.dateType === 'custom'"
                  v-model="dateSettingForm[1]"
                  :type="dateSettingFormData.type"
                  :format="dateSettingFormData.format"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择截止日期"
              />
            </div>
            <div style="padding: 4px; display: flex; flex-direction: row; justify-content: flex-end;">
              <el-button @click="closeDateSettingForm">取消</el-button>
              <el-button type="primary" @click="submitDateSettingForm">确定</el-button>
            </div>
          </el-popover>
        </div>
        <div class="my-date-setting-card-extra" v-if="props.dateExtra" v-html="props.dateExtra"/>
      </div>
    </template>
  </MyCard>
</template>

<style scoped>
.my-date-setting-card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  background-position: right top;
  background-size: auto 75%;
  background-repeat: no-repeat;
  background-image: url("../../assets/calendar.png");
}

.my-date-setting-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.my-date-setting-card-extra {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  color: var(--el-text-color-regular);
}

.el-link {
  --el-link-hover-text-color: rgb(126, 94, 139);
}
</style>

<script setup lang="ts">
import MyCard from "@/components/cards/MyCard.vue";
import {computed, ref} from "vue";

interface Props {
  date: string;
  dateExtra?: string;
  dateValue: string[];
  dateType: 'day' | 'week' | 'month' | 'year' | 'custom';
}

const props = defineProps<Props>();

const emit = defineEmits(['handle-date-change']);

const dateSettingFormVisible = ref<boolean>(false);
const dateSettingForm = ref<string[]>([]);

const openDateSettingForm = () => {
  dateSettingForm.value = props.dateValue;
  dateSettingFormVisible.value = true;
};

const closeDateSettingForm = () => {
  dateSettingFormVisible.value = false;
};

const submitDateSettingForm = () => {
  emit('handle-date-change', dateSettingForm.value);
  dateSettingFormVisible.value = false;
};

const resetDateSettingForm = () => {
  dateSettingForm.value = [];
};

const dateSettingFormData = computed(() => {
  let title: string;
  let type: string;
  let format: string;
  switch (props.dateType) {
    case "day":
      title = "日历";
      type = "date";
      format = "YYYY年MM月DD日";
      break;
    case "week":
      title = "周历";
      type = "week";
      format = "YYYY年第ww周";
      break;
    case "month":
      title = "月历";
      type = "month";
      format = "YYYY年MM月";
      break;
    case "year":
      title = "年历";
      type = "year";
      format = "YYYY年";
      break;
    case "custom":
      title = "自定义日期范围";
      type = "date";
      format = "YYYY年MM月DD日";
      break;
  }
  return {title, type, format};
});
</script>