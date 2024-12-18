import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useSort, type SortOption } from './index';

interface Item {
  id: number;
  name: string;
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

    const customSort = (dataToSort) => dataToSort.reverse();

    const { sorted } = useSort({ initialData: data, customSort });

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
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

    data.value = [
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
    ]

    expect(sorted.value).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
    ]);
  });
});
