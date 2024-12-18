import { describe, it, expect } from 'vitest';
import { computed, nextTick, ref, toValue } from 'vue';
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

  it('should use customSearch function when provided', async () => {
    const initialDataRef = ref(data);
    const searchTerm = ref('Owne');
    const keysToSearch = ['name', 'job'] as const;
    const customSearch = (items: Item[]) =>
      items?.filter((item) =>
        keysToSearch.some((key) =>
          String(item[key])
            .toLowerCase()
            .includes(String(toValue(searchTerm).toLowerCase()).toLowerCase()),
        ),
      );

    const { filtered } = useSearch({
      initialData: initialDataRef,
      customSearch: () => customSearch,
    });

    expect(filtered.value).toEqual([
      { name: 'Jessica', job: 'product owner' },
      { name: 'Owner', job: '' },
    ]);
  });

  it('should return an empty array if initialData is undefined', () => {
    // @ts-expect-error undefined
    const { filtered } = useSearch({ initialData: undefined });

    expect(filtered.value).toEqual([]);
  });

  it('should return initialData if provided as a ref', () => {
    const initialDataRef = ref([{ name: 'Item 1' }, { name: 'Item 2' }]);
    // @ts-expect-error undefined
    const { filtered } = useSearch({ initialData: initialDataRef });

    expect(filtered.value).toEqual([{ name: 'Item 1' }, { name: 'Item 2' }]);
  });

  it('should return initialData if provided as a raw array', () => {
    const initialData = [{ name: 'Item 1' }, { name: 'Item 2' }];
    // @ts-expect-error undefined
    const { filtered } = useSearch({ initialData });

    expect(filtered.value).toEqual(initialData);
  });

  it('should return an empty array if searchOptions is undefined', () => {
    const initialDataRef = ref([{ name: 'Item 1' }, { name: 'Item 2' }]);
    // @ts-expect-error undefined
    const { filtered } = useSearch({
      initialData: initialDataRef,
      searchOptions: undefined,
    });

    expect(filtered.value).toEqual([{ name: 'Item 1' }, { name: 'Item 2' }]);
  });

  it('should return searchOptions if provided as a ref', () => {
    const initialDataRef = ref([{ name: 'Item 1' }]);
    const searchOptionsRef = ref([
      {
        key: 'name',
        value: 'Item 1',
        predicate: (a: any, b: any) => a.includes(b),
      },
    ]);
    const { filtered } = useSearch({
      initialData: initialDataRef,
      // @ts-expect-error undefined
      searchOptions: searchOptionsRef,
    });

    expect(filtered.value).toEqual([{ name: 'Item 1' }]);
  });

  it('should return searchOptions if provided as a raw array', () => {
    const initialDataRef = ref([{ name: 'Item 1' }, { name: 'Item 2' }]);
    const searchOptions = [
      {
        key: 'name',
        value: 'Item 1',
        predicate: (a: any, b: any) => a.includes(b),
      },
    ];
    const { filtered } = useSearch({
      initialData: initialDataRef,
      // @ts-expect-error undefined
      searchOptions,
    });

    expect(filtered.value).toEqual([{ name: 'Item 1' }]);
  });
});
