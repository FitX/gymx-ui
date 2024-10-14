<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import {
  type Config,
  uniqueNamesGenerator,
  names,
} from 'unique-names-generator';
import {
  type SortOption,
  type FilterOption,
  type PaginationOption,
  useTable,
} from '@/composables/use-table';

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
  { id: 1, name: 'Jessica' },
  { id: 2, name: 'Frank' },
  { id: 3, name: 'Timmy' },
  { id: 4, name: 'Paul' },
  { id: 5, name: 'Danny' },
  { id: 6, name: 'Micha' },
  ...generateDemoItems(1_000), // 130.000 ms 1million 1000 100.000
]);

const sortOptions = ref<SortOption<DataItem>[]>([{ key: 'id', order: 'asc' }]);

const updateSortOrder = (option: SortOption<DataItem>) => {
  start.value = performance.now();
  sortOptions.value[0] = option; // { key: 'id', order: val }
  // sortOptions.value[0] = { key: 'id', order: 'asc' }; // { key: 'id', order: val }
  // currentPage.value = 1;
};

const filterValue = ref('');
const filterOptions = computed<FilterOption<DataItem>[]>(() => [
  {
    key: 'name',
    value: filterValue.value,
    predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
  },
]);

const perPage = 20;
const currentPage = ref(1);

const paginationOption = computed<PaginationOption>(() => ({
  page: currentPage.value,
  perPage,
}));

const { processedData } = useTable({
  initialData,
  sortOptions,
  filterOptions,
  paginationOption,
});

const totalPages = computed<number>(() => {
  const filteredData = initialData.value.filter((item) =>
    filterOptions.value.every((option) => {
      console.log(option);
      return option.predicate(item[option.key], option.value);
    })
  );
  return Math.ceil(filteredData.length / perPage);
});

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

watch(totalPages, (val) => {
  if (val < currentPage.value) {
    currentPage.value = 1;
  }
});

watch(processedData, (val) => {
  end.value = performance.now();
});

const demoPerformance = computed(() => end.value - start.value);

</script>

<template>
  <div>
    <h1>
      {{ initialData.length }} -
      {{ sortOptions }} - {{ totalPages }} - {{ filterValue }}
      {{ demoPerformance }}
    </h1>

    <input v-model="filterValue" placeholder="Filter by Nme" type="search" />

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
      <tr v-for="item in processedData" :key="item.id">
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
