<script setup lang="ts">
import { type SortOption, useSort } from '@/composables/use-sort';
import { computed, ref } from 'vue';

type DemoData = { id: number; name: string };
const data = ref<DemoData[]>([
  { id: 3, name: 'C' },
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
]);

const sortOptions = ref<SortOption<DemoData>[]>([
  { key: 'id', order: 'asc' }, // Sort by id in ascending order
]);

const customSortFunction = (data: DemoData[]) => data.reverse();

const customSort = computed(() =>
  sortOptions.value?.[0].key === 'id' ? undefined : customSortFunction,
);

const { sorted } = useSort({ initialData: data, sortOptions, customSort });

const updateSortOrder = (key: keyof DemoData) => {
  sortOptions.value[0] = { key, order: 'asc' };
};
</script>

<template>
  <main>
    <h1>GymX UI</h1>
    <pre>data {{ data }}</pre>
    <pre>sorted {{ sorted }}</pre>
    <button @click="updateSortOrder('id')">änder key id</button>
    <button @click="updateSortOrder('name')">änder key name</button>
    <pre>customSort computed: {{ customSort }}</pre>
  </main>
</template>

<style scoped></style>
