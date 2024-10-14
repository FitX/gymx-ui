<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import {
  type Config,
  uniqueNamesGenerator,
  names,
} from 'unique-names-generator';
import {
  type SortOption,
  useSort,
} from '@/composables/use-sort';

import {
  type FilterOption,
  useSearch,
} from '@/composables/use-filter';

interface DataItem {
  id: number;
  name: string;
}

const config: Config = {
  dictionaries: [names],
};

const start = ref();
const end = ref();

const generateDemoItems = (count: number) => {
  const dataItems = [];

  for (let i = 1; i <= count; i++) {
    dataItems.push({
      id: i,
      name: `${uniqueNamesGenerator(config)} ${i}`,
    });
  }

  return dataItems;
};

const initialData = ref<DataItem[]>([
  { id: 1_9999999999, name: 'Jessica' },
  { id: 2_9999999999, name: 'Frank' },
  { id: 3_9999999999, name: 'Timmy' },
  { id: 4_9999999999, name: 'Paul' },
  { id: 5_9999999999, name: 'Danny' },
  { id: 6_9999999999, name: 'Micha' },
  ...generateDemoItems(1_000), // 130.000 ms 1million 1000 100.000
]);

const searchTerm = ref('');

const sortOptions = ref<SortOption<DataItem>[]>([{ key: 'id', order: 'asc' }]);
const searchOptions = computed<FilterOption<DataItem>[]>(() => (
  [{
    key: 'name',
    value: searchTerm.value,
    predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
  }]
));

const updateSortOrder = (option: SortOption<DataItem>) => {
  start.value = performance.now();
  sortOptions.value[0] = option;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const {
  sorted,
} = useSort({ initialData, sortOptions });

const {
  filtered,
} = useSearch({initialData: sorted, searchOptions});

// watch(processedData, (val) => {
watch(sorted, (val) => {
  end.value = performance.now();
});

const demoPerformance = computed(() => end.value - start.value);

</script>

<template>
  <div>
    <h1>
      {{ initialData?.length }} -
      {{ sortOptions }} <!-- - {{ totalPages }} - {{ filterValue }} -->
      {{ demoPerformance }}
    </h1>

    <input v-model="searchTerm" placeholder="Filter by Nme" type="search" />

    <!--<button @click="updateSortOrder('asc')">Ascending</button>
    <button @click="updateSortOrder('desc')">Descending</button>-->
    <button @click="updateSortOrder({ key: 'name', order: 'asc' })">
      ascending
    </button>
    <button @click="updateSortOrder({ key: 'name', order: 'desc' })">
      Descendiing
    </button>

    <div>
      <button @click="prevPage" :disabled="currentPage <= 1">Prevv</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>

    <table class="table">
      <thead>
      <tr class="table__row">
        <th>
          ID
          <button @click="updateSortOrder({ key: 'id', order: 'asc' })">
            asc
          </button>
          <button @click="updateSortOrder({ key: 'id', order: 'desc' })">
            desc
          </button>
        </th>
        <th>
          Name
          <button @click="updateSortOrder({ key: 'name', order: 'asc' })">
            asc
          </button>
          <button @click="updateSortOrder({ key: 'name', order: 'desc' })">
            desc
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in filtered" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          {{ item.name }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
