<template>
  <div class="table" ref="table">
    <el-table
        :data="props.showPagination ? pagedTableData : props.tableData"
        :max-height="tableHeight"
        size="default"
        show-overflow-tooltip>
      <slot name="table-content"/>
    </el-table>
    <el-pagination
        v-if="props.showPagination"
        style="margin-top: 16px;"
        background layout="total, prev, pager, next"
        :total="props.tableData.length"
        v-model:current-page="currentPage"
        :page-size="props.pageSize ? props.pageSize : 10"/>
    <slot name="table-extra-content"/>
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
import {computed, ref} from 'vue';

interface Props {
  tableData: object[];
  pageSize?: number;
  showPagination?: boolean;
  bottomSpace?: number;
}

const props = defineProps<Props>();

const table = ref<HTMLElement | null>(null);

const currentPage = ref(1);
const paginationHeight = ref(48);

const pagedTableData = computed(() => {
  if (props.tableData && props.pageSize && props.tableData.length > 0) {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return props.tableData.slice(start, end);
  } else {
    return [];
  }
});

const tableHeight = computed(() => {
  if (table.value) {
    const spaceHeight = props.bottomSpace ? props.bottomSpace : 0;

    if (props.showPagination) {
      return `${table.value.clientHeight - paginationHeight.value - spaceHeight}px`;
    }
    return `${table.value.clientHeight - spaceHeight}px`;
  }
  return 'auto';
});
</script>