<template>
  <MyCard style="padding: 20px; display: flex; flex-direction: column; background-color: rgb(227, 219, 237);">
    <template #content>
      <div class="my-date-setting-card">
        <div class="my-date-setting-card-content">
          <el-popover :visible="dateSettingFormVisible" placement="left-start" :width="300" @close="resetDateSettingForm">
            <template #reference>
              <el-link @click="openDateSettingForm" style="font-size: 36px; color: rgb(126, 94, 139);">{{ props.date }}</el-link>
            </template>
            <div style="padding: 4px 4px 20px;">
              <div style="font-size: 16px; margin-bottom: 16px;">{{ dateSettingFormData.title }}</div>
              <el-date-picker
                  v-model="dateSettingForm[0]"
                  :type="dateSettingFormData.type"
                  :format = "dateSettingFormData.format"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择日期范围"
              />
            </div>
            <div style="padding: 4px; display: flex; flex-direction: row; justify-content: flex-end;">
              <el-button @click="closeDateSettingForm">取消</el-button>
              <el-button type="primary" @click="submitDateSettingForm">保存</el-button>
            </div>
          </el-popover>
        </div>
        <div class="my-date-setting-card-extra" v-if="props.dateExtra">{{ props.dateExtra }}</div>
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
  dateValue: string;
  dateType: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['handle-date-change']);

const dateSettingFormVisible = ref<boolean>(false);
const dateSettingForm = ref<string[]>([]);

const openDateSettingForm = () => {
  dateSettingForm.value = [props.dateValue];
  dateSettingFormVisible.value = true;
};

const closeDateSettingForm = () => {
  dateSettingFormVisible.value = false;
};

const submitDateSettingForm = () => {
  emit('handle-date-change', (dateSettingForm.value as string[])[0]);
  dateSettingFormVisible.value = false;
};

const resetDateSettingForm = () => {
  dateSettingForm.value = [];
};

const dateSettingFormData = computed(() => {
  let title;
  let type = props.dateType;
  let format;
  switch (props.dateType) {
    case "day":
      title = "日历";
      type = "date";
      format = "YYYY年MM月DD日";
      break;
    case "week":
      title = "周历";
      format = "YYYY年第ww周";
      break;
    case "month":
      title = "月历";
      format = "YYYY年MM月";
      break;
    case "year":
      title = "年历";
      format = "YYYY年";
      break;
    default:
      title = "日历";
      format = "YYYY年MM月DD日";
      break;
  }
  return {title, type, format};
});
</script>