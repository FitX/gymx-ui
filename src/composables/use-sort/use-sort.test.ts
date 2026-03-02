import { describe, it, expect, vi } from 'vitest';
import { ref, toValue } from 'vue';
import { useSort, type SortOption } from './index';

interface Item {
  id: number;
  name?: string | null;
}

describe('useSort', () => {
  it('should sort data in ascending order by default', () => {
    const data = ref<Item[]>([
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'id', order: 'asc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ]);
  });

  it('should sort data in descending order', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'id', order: 'desc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
    ]);
  });

  it('should sort data in descending order including IsNullish undefined / null', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'A' },
      { id: 2, name: null },
      { id: 3, name: 'C' },
      { id: 4, name: undefined },
      { id: 5, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 1, name: 'A' },
      { id: 5, name: 'B' },
      { id: 3, name: 'C' },
      { id: 2, name: null },
      { id: 4, name: undefined },
    ]);
  });

  it('should sort data by multiple keys', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'B' },
      { id: 1, name: 'A' },
      { id: 2, name: 'C' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([
      { key: 'id', order: 'asc' },
      { key: 'name', order: 'asc' },
    ]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 1, name: 'A' },
      { id: 1, name: 'B' },
      { id: 2, name: 'C' },
    ]);
  });

  it('should sort data by same keys', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'B' },
      { id: 1, name: 'A' },
      { id: 2, name: 'C' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'id', order: 'asc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 1, name: 'B' },
      { id: 1, name: 'A' },
      { id: 2, name: 'C' },
    ]);
  });

  it('should use customSort function if provided', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ]);

    const customSort = (dataToSort: Item[]) => dataToSort.reverse();

    const { sorted } = useSort({ initialData: data, customSort });

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
    ]);

    expect(sorted.value).not.toEqual(data.value);
  });

  it('should use customSort function if provided and ignore default sort', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'Z' },
      { id: 5, name: 'M' },
    ]);

    const includeDefaultSort = ref(false);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);

    const customSort = (dataToSort: Item[]) => {
      const { order, key } = toValue(sortOptions)[0];
      if (key === 'name') {
        return dataToSort.sort((a, b) => {
          if (order === 'asc') return (a.name ?? '').localeCompare(b.name ?? '');
          return (b.name ?? '').localeCompare(a.name ?? '');
        });
      }
      return dataToSort;
    };

    const { sorted } = useSort({ initialData: data, sortOptions, includeDefaultSort, customSort });

    expect(sorted.value).toEqual([
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 1, name: 'C' },
      { id: 5, name: 'M' },
      { id: 4, name: 'Z' },
    ]);


    sortOptions.value[0].order = 'desc';
    sortOptions.value[0].key = 'id';

    expect(sorted.value).toEqual([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'Z' },
      { id: 5, name: 'M' },
    ]);

    includeDefaultSort.value = true;

    expect(sorted.value).toEqual([
      { id: 5, name: 'M' },
      { id: 4, name: 'Z' },
      { id: 3, name: 'B' },
      { id: 2, name: 'A' },
      { id: 1, name: 'C' },
    ]);
  });

  it('should return original data when no sortOptions or customSort are provided', () => {
    const data = ref<Item[]>([
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);

    const { sorted } = useSort({ initialData: data });

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);
  });

  it('should warn when no sort options are provided', () => {
    const data = ref<Item[]>([
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);

    const warnSpy = vi.spyOn(console, 'warn');

    const { sorted } = useSort({ initialData: data, sortOptions: ref([]) });

    expect(sorted.value).toEqual(data.value);
    expect(warnSpy).toHaveBeenCalledWith('No sort options provided. Returning original data.');
  });

  it('should sort data in descending order, but initial Data undefined', () => {
    const data = ref<Item[]>();

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'id', order: 'desc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual(undefined);

    data.value = [
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
    ];

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
    ]);
  });

  it('should return original data if null/undefined', () => {
    const data = ref<Item[] | null>();

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'id', order: 'desc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });
    expect(sorted.value).toEqual(undefined);

    data.value = null;
    expect(sorted.value).toEqual(null);

    const withoutReactiveUndefined = undefined;
    const { sorted: sortedWithoutReactiveUndefined } = useSort({
      initialData: withoutReactiveUndefined,
      sortOptions,
    });

    expect(sortedWithoutReactiveUndefined.value).toEqual(withoutReactiveUndefined);

    const withoutReactiveNull = null;
    const { sorted: sortedWithoutReactiveNull } = useSort({
      initialData: withoutReactiveNull,
      sortOptions,
    });
    expect(sortedWithoutReactiveNull.value).toEqual(withoutReactiveNull);

    data.value = [
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
    ];

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
    ]);
  });

  it('does not call customSort.value if customSort is not a Ref', () => {
    const sortFn = vi.fn();
    const data = ref([{ id: 2 }, { id: 1 }]);

    const { sorted } = useSort({
      initialData: data,
      customSort: sortFn,
    });

    sorted.value;

    // because it's not a Ref, it shouldn't call .value
    expect(sortFn).toHaveBeenCalledOnce();
  });

  it('customSort as Ref<Function> - calls customSort.value when customSort is a Ref to a function', () => {
    const data = ref<Item[]>([{ id: 2 }, { id: 1 }]);

    const sortFn = vi.fn((items: Item[]) => {
      return [...items].sort((a, b) => a.id - b.id);
    });

    const customSort = ref(sortFn);

    const { sorted } = useSort<Item>({
      initialData: data,
      customSort,
    });

    // Access the computed to trigger it
    sorted.value;

    expect(sortFn).toHaveBeenCalledOnce();
    expect(sortFn).toHaveBeenCalledWith([{ id: 2 }, { id: 1 }]);
  });
});
