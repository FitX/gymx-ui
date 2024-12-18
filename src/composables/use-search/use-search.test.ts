import { describe, it, expect } from 'vitest';
import { computed, ref, toValue } from 'vue';
import { type FilterOption, useSearch, defaultSearch } from './index';

interface Item {
  name: string;
  job: number;
}

const data: Item[] = [
  { name: 'Jessica', job: 'product owner' },
  { name: 'Frank', job: 'developer' },
  { name: 'Micha', job: 'developer' },
  { name: 'Owner', job: '' },
];

const dataSorted: Item[] = [
  { name: 'Frank', job: 'developer' },
  { name: 'Micha', job: 'developer' },
  { name: 'Jessica', job: 'product owner' },
  { name: 'Owner', job: '' },
];

// Beispiel Filteroptionen
const filterOptions: FilterOption<Item>[] = [
  {
    key: 'job',
    value: 'developer',
    predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
  },
];

describe('defaultSearch', () => {
  it('should filter data based on filter options', () => {
    const result = defaultSearch(data, filterOptions);
    expect(result).toEqual([
      { name: 'Frank', job: 'developer' },
      { name: 'Micha', job: 'developer' },
    ]);
  });

  it('should return all data when no filters are provided', () => {
    const result = defaultSearch(data, []);
    expect(result).toEqual(data);
  });
});

describe('useSearch', () => {
  it('should return filtered data based on searchOptions', () => {
    const searchOptionsRef = ref(filterOptions);
    const initialDataRef = ref(data);

    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: searchOptionsRef,
    });

    expect(filtered.value).toEqual([
      { name: 'Frank', job: 'developer' },
      { name: 'Micha', job: 'developer' },
    ]);
  });

  it('should return all data when no searchOptions are provided', () => {
    const initialDataRef = ref(data);

    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: ref([]),
    });

    expect(filtered.value).toEqual(data);
  });

  it('filtered should return updated data, searchOptions as computed', () => {
    /* const searchOptionsRef = ref<FilterOption<Item>[]>([
      {
        key: 'job',
        value: '',
        predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
      },
    ]); */
    const searchOptionsRef = computed<FilterOption<Item>[]>(() => ([
      {
        key: 'job',
        value: '',
        predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
      },
    ]));
    const initialDataRef = ref(data);

    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: searchOptionsRef,
    });

    expect(filtered.value).toEqual(data);

    initialDataRef.value = dataSorted;

    expect(filtered.value).toEqual([
      { name: 'Frank', job: 'developer' },
      { name: 'Micha', job: 'developer' },
      { name: 'Jessica', job: 'product owner' },
      { name: 'Owner', job: '' },
    ]);


  });

  it('filtered should return updated data, searchOptions as ref', () => {
    const searchOptionsRef = ref<FilterOption<Item>[]>([
      {
        key: 'job',
        value: '',
        predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
      },
    ]);
    const initialDataRef = ref(data);

    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: searchOptionsRef,
    });

    expect(filtered.value).toEqual(data);

    initialDataRef.value = dataSorted;

    expect(filtered.value).toEqual([
      { name: 'Frank', job: 'developer' },
      { name: 'Micha', job: 'developer' },
      { name: 'Jessica', job: 'product owner' },
      { name: 'Owner', job: '' },
    ]);


  });

  it('filtered should return updated data, initialData as computed', () => {
    const searchOptionsRef = ref<FilterOption<Item>[]>([
      {
        key: 'job',
        value: '',
        predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
      },
    ]);
    const justATest = ref(true);
    const initialDataRef = computed(() => {
      if (justATest.value) return data;
      return dataSorted;
    });

    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: searchOptionsRef,
    });

    expect(filtered.value).toEqual(data);

    justATest.value = false;

    expect(filtered.value).toEqual([
      { name: 'Frank', job: 'developer' },
      { name: 'Micha', job: 'developer' },
      { name: 'Jessica', job: 'product owner' },
      { name: 'Owner', job: '' },
    ]);
  });

  it('should use customSearch function when provided', () => {
    const initialDataRef = ref(data);
    const searchTerm = ref('Owne');
    const keysToSearch = ['name', 'job'];
    const customSearch = (items: Item[]) =>
      items.filter((item) =>
        keysToSearch.some((key) =>
          String(item[key])
            .toLowerCase()
            .includes(String(toValue(searchTerm).toLowerCase()).toLowerCase()),
        ),
      );

    const { filtered } = useSearch({
      initialData: initialDataRef,
      customSearch,
    });

    expect(filtered.value).toEqual([
      { name: 'Jessica', job: 'product owner' },
      { name: 'Owner', job: '' },
    ]);
  });
});
