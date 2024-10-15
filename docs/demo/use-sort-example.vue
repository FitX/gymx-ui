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
} from '@/composables/use-search';
import {
  usePagination,
} from '@/composables/use-pagination';

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
const searchKey = ref('name');

const sortOptions = ref<SortOption<DataItem>[]>([{ key: 'id', order: 'asc' }]);
const searchOptions = computed<FilterOption<DataItem>[]>(() => (
  [{
    key: searchKey.value,
    value: searchTerm.value,
    predicate: (a, b) => (String(a)).toLowerCase().includes((String(b)).toLowerCase()),
  }]
));

const updateSortOrder = (option: SortOption<DataItem>) => {
  end.value = null;
  start.value = performance.now();
  sortOptions.value[0] = option;
};

const {
  sorted,
} = useSort({ initialData, sortOptions });

const {
  filtered,
} = useSearch({initialData: sorted, searchOptions});

const {
  paginated,
  totalPages,
  currentPage,
  nextPage,
  prevPage,
} = usePagination(filtered);

// watch(processedData, (val) => {
watch(paginated, (val) => {
  console.log(val);
  end.value = performance.now();
});

const demoPerformance = computed(() => end.value - start.value);

const isKeyCurrentlySorted = (key: SortOption['key'], order?: SortOption['order']) => {
  const isCurrentKey = sortOptions.value[0]?.key === key;
  if (!order) return isCurrentKey;
  return isCurrentKey && sortOptions.value[0]?.order === order;
};

const getAriaSortDirection = (key: SortOption['key']) => {
  const isCurrentKey = sortOptions.value[0]?.key === key;
  if (!isCurrentKey) return 'none';
  return isCurrentKey && sortOptions.value.find((option) => option.key === key)?.order === 'asc' ? 'ascending' : 'descending';
};
</script>

<template>
  <div class="table-wrapper">
    <h1>
      Search / Filter / Pagination
    </h1>

    <div class="filter">
      <input v-model="searchTerm" :placeholder="`Filter by ${searchKey}`" type="search" />
      <label v-for="key in ['name', 'id']" :key="key" :aria-label="`Change search key to ${key}`">
        <input type="radio" name="sort" :value="key" v-model="searchKey" />
        {{ key }}
      </label>
    </div>

    <table class="table">
      <caption class="sr-only">
        Demo table to present the functionalities use-sort, use-search and use-pagination.
        (column headers with buttons are sortable).
      </caption>
      <thead>
      <tr class="table__row">
        <th :aria-sort="getAriaSortDirection('id')">
          <span class="table-sort">
            <span class="table-sort__title">ID</span>
            <span class="table-sort__buttons">
              <button
                @click="updateSortOrder({ key: 'id', order: 'asc' })"
                aria-label="Sort by id ascending"
                :disabled="isKeyCurrentlySorted('id', 'asc')">
              asc
            </button>
            <button
              @click="updateSortOrder({ key: 'id', order: 'desc' })"
              aria-label="Sort by id descending"
              :disabled="isKeyCurrentlySorted('id', 'desc')">
              desc
            </button>
            </span>
          </span>
        </th>
        <th :aria-sort="getAriaSortDirection('name')">
          <span class="table-sort">
            <span class="table-sort__title">Name</span>
            <span class="table-sort__buttons">
            <button
              @click="updateSortOrder({ key: 'name', order: 'asc' })"
              aria-label="Sort by name ascending"
              :disabled="isKeyCurrentlySorted('name', 'asc')">
              asc
            </button>
            <button
              @click="updateSortOrder({ key: 'name', order: 'desc' })"
              aria-label="Sort by name descending"
              :disabled="isKeyCurrentlySorted('name', 'desc')">
              desc
            </button>
            </span>
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in paginated" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          {{ item.name }}
        </td>
      </tr>
      </tbody>
    </table>
    <nav class="pagination" aria-label="Table Pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">Prev</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </nav>
    <p>
      <small>All Items {{ initialData?.length }}</small><br />
      <small v-if="demoPerformance">Performance (Filter Time in ms): {{ demoPerformance }}</small>
    </p>
    <div aria-live="polite" aria-atomic="false" class="sr-only">
      {{ filtered.length }} Results found for "{{ searchTerm }}"
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.filter,
.pagination {
  display: flex;
  gap: 1rem;
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

.table-sort {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  &__buttons {
    display: flex;
    gap: 1rem;
  }
}

.sr-only:not(:focus):not(:active) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
