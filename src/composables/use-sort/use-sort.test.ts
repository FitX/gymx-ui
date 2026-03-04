import { describe, it, expect, vi } from 'vitest';
import { ref, toValue } from 'vue';
import { useSort, type SortOption } from './index';

interface Item {
  id: number;
  name?: string | null;
}

type SpecialItem = {
  id: number;
  name: string;
  event: { name: string };
};

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

  it('should use customSort function if provided and also default sort if order key exists', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'Z' },
      { id: 5, name: 'M' },
    ]);

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

    const { sorted } = useSort({ initialData: data, sortOptions, customSort });

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
      { id: 5, name: 'M' },
      { id: 4, name: 'Z' },
      { id: 3, name: 'B' },
      { id: 2, name: 'A' },
      { id: 1, name: 'C' },
    ]);
  });

  it('should use customSort function if provided and ignore default sort if order key not exists', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'Z' },
      { id: 5, name: 'M' },
    ]);

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

    const { sorted } = useSort({ initialData: data, sortOptions, customSort });

    expect(sorted.value).toEqual([
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 1, name: 'C' },
      { id: 5, name: 'M' },
      { id: 4, name: 'Z' },
    ]);

    sortOptions.value[0].order = 'desc';
    // @ts-expect-error just a failure test
    sortOptions.value[0].key = 'foo';

    expect(sorted.value).toEqual([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'Z' },
      { id: 5, name: 'M' },
    ]);
  });

  it('should use customSort function if provided and ignore default sort if order key exists in both functions', () => {
    const data = ref<SpecialItem[]>([
      { id: 1, name: 'z ipsum', event: { name: 'a event bold' } },
      { id: 2, name: 'b ipsum', event: { name: 'c event italic' } },
      { id: 4, name: 'a ipsum', event: { name: 'b event underlined' } },
      { id: 6, name: 'd ipsum', event: { name: 'b event dotted' } },
      { id: 3, name: 'x ipsum', event: { name: 'e event strikethrough' } },
      { id: 5, name: 'm ipsum', event: { name: 'd event strong' } },
    ]);

    // custom sort nach event.name soll defaultSort preventen

    const sortOptions = ref<SortOption<SpecialItem>[]>([{ key: 'event', order: 'asc' }]);

    const customSort = (dataToSort: SpecialItem[]) => {
      const { order, key } = toValue(sortOptions)[0];
      if (key === 'event') {
        return dataToSort.sort((a, b) => {
          if (order === 'asc') return (a.event.name ?? '').localeCompare(b.event.name ?? '');
          return (b.event.name ?? '').localeCompare(a.event.name ?? '');
        });
      }
      return dataToSort;
    };

    const { sorted } = useSort({ initialData: data, sortOptions, customSort });

    expect(sorted.value).toEqual([
      { id: 1, name: 'z ipsum', event: { name: 'a event bold' } },
      { id: 6, name: 'd ipsum', event: { name: 'b event dotted' } },
      { id: 4, name: 'a ipsum', event: { name: 'b event underlined' } },
      { id: 2, name: 'b ipsum', event: { name: 'c event italic' } },
      { id: 5, name: 'm ipsum', event: { name: 'd event strong' } },
      { id: 3, name: 'x ipsum', event: { name: 'e event strikethrough' } },
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

  it('should not apply defaultSort when includeDefaultSort is false', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions, includeDefaultSort: false });

    // Reihenfolge unverändert, kein sort
    expect(sorted.value).toEqual([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
    ]);
  });

  it('should apply defaultSort when includeDefaultSort is true (default)', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);

    const { sorted } = useSort({ initialData: data, sortOptions });

    expect(sorted.value).toEqual([
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 1, name: 'C' },
    ]);
  });

  it('should apply customSort but not defaultSort when includeDefaultSort is false', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);

    const customSort = (dataToSort: Item[]) => dataToSort.reverse();

    const { sorted } = useSort({
      initialData: data,
      sortOptions,
      customSort,
      includeDefaultSort: false,
    });

    // customSort (reverse) angewendet, defaultSort nicht
    expect(sorted.value).toEqual([
      { id: 3, name: 'B' },
      { id: 2, name: 'A' },
      { id: 1, name: 'C' },
    ]);
    expect(sorted.value).not.toEqual(data.value);
  });

  it('should react to includeDefaultSort ref change', () => {
    const data = ref<Item[]>([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);
    const includeDefaultSort = ref(true);

    const { sorted } = useSort({ initialData: data, sortOptions, includeDefaultSort });

    expect(sorted.value).toEqual([
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 1, name: 'C' },
    ]);

    includeDefaultSort.value = false;

    expect(sorted.value).toEqual([
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
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

  it('should not execute default sort for ignoreSortKeys', () => {
    const data = ref<Item[]>([
      { id: 2, name: 'a ipsum' },
      { id: 1, name: null },
      { id: 3, name: 'A z ipsum' },
    ]);

    const sortOptions = ref<SortOption<Item>[]>([{ key: 'name', order: 'asc' }]);
    const ignoreSortKeys = ref<(keyof Item)[]>(['name']);

    const customSort = (dataToSort: Item[]) =>
      dataToSort.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

    const { sorted } = useSort({
      initialData: data,
      sortOptions,
      customSort,
      ignoreSortKeys,
    });

    // with local compare
    expect(sorted.value).toEqual([
      { id: 1, name: null },
      { id: 2, name: 'a ipsum' },
      { id: 3, name: 'A z ipsum' },
    ]);

    ignoreSortKeys.value = [];

    // with default sort
    expect(sorted.value).toEqual([
      { id: 3, name: 'A z ipsum' },
      { id: 2, name: 'a ipsum' },
      { id: 1, name: null },
    ]);
  });

  it('should exclude ignoreSortKeys from defaultSort', () => {
    const data = ref<SpecialItem[]>([
      { id: 2, name: 'a ipsum', event: { name: 'c event' } },
      { id: 1, name: 'z ipsum', event: { name: 'a event' } },
      { id: 3, name: 'm ipsum', event: { name: 'b event' } },
    ]);

    const sortOptions = ref<SortOption<SpecialItem>[]>([
      { key: 'event', order: 'asc' },
      { key: 'name', order: 'asc' },
    ]);

    const customSort = (dataToSort: SpecialItem[]) =>
      dataToSort.sort((a, b) => a.event.name.localeCompare(b.event.name));

    const { sorted } = useSort({
      initialData: data,
      sortOptions,
      customSort,
      ignoreSortKeys: ['event'],
    });

    expect(sorted.value).toEqual([
      { id: 2, name: 'a ipsum', event: { name: 'c event' } },
      { id: 3, name: 'm ipsum', event: { name: 'b event' } },
      { id: 1, name: 'z ipsum', event: { name: 'a event' } },
    ]);
  });

  it('should react to ignoreSortKeys ref change', () => {
    const data = ref<SpecialItem[]>([
      { id: 2, name: 'a ipsum', event: { name: 'c event' } },
      { id: 1, name: 'z ipsum', event: { name: 'a event' } },
      { id: 3, name: 'm ipsum', event: { name: 'b event' } },
    ]);

    const sortOptions = ref<SortOption<SpecialItem>[]>([{ key: 'name', order: 'asc' }]);
    const ignoreSortKeys = ref<(keyof SpecialItem)[]>(['name']);

    const { sorted } = useSort({ initialData: data, sortOptions, ignoreSortKeys });

    // with ignore keys
    expect(sorted.value).toEqual([
      { id: 2, name: 'a ipsum', event: { name: 'c event' } },
      { id: 1, name: 'z ipsum', event: { name: 'a event' } },
      { id: 3, name: 'm ipsum', event: { name: 'b event' } },
    ]);

    // reset keys
    ignoreSortKeys.value = [];

    expect(sorted.value).toEqual([
      { id: 2, name: 'a ipsum', event: { name: 'c event' } },
      { id: 3, name: 'm ipsum', event: { name: 'b event' } },
      { id: 1, name: 'z ipsum', event: { name: 'a event' } },
    ]);
  });
});
