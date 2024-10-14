import { MaybeRefOrGetter, computed, toValue } from 'vue';

export type SortOrder = 'asc' | 'desc';

export interface SortOption<T> {
  key: keyof T;
  order: SortOrder;
}

const defaultSort = <T>(data: T[], sortOptions: SortOption<T>[]): T[] => {
  return data.sort((a, b) => {
    for (const { key, order } of sortOptions) {
      const compare = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      if (compare !== 0) {
        return order === 'asc' ? compare : -compare;
      }
    }
    return 0;
  });
};

/* @tODO: type v interface */
export interface UseSortOptionsShared<T> {
  initialData: MaybeRefOrGetter<T[]>;
}

export interface UseSortOptionsWithSortOptions<T>
  extends UseSortOptionsShared<T> {
  sortOptions?: MaybeRefOrGetter<SortOption<T>[]>;
  customSort?: never;
}

export interface UseSortOptionsWithCustomSortFunction<T>
  extends UseSortOptionsShared<T> {
  customSort: MaybeRefOrGetter<(data: T[]) => T[]>;
  sortOptions?: never;
}

/* export interface UseSortOptions<T> {
  initialData: MaybeRefOrGetter<T[]>;
  sortOptions?: MaybeRefOrGetter<SortOption<T>[]>;
  customSort?: MaybeRefOrGetter<(data: T[]) => T[]>;
} */
export type UseSortOptions<T> =
  | UseSortOptionsWithSortOptions<T>
  | UseSortOptionsWithCustomSortFunction<T>;

export const useSort = <T>({
                             initialData = [],
                             sortOptions = [],
                             customSort,
                           }: UseSortOptions<T>) => {
  const sorted = computed(() => {
    if (typeof customSort === 'function') {
      customSort(toValue(initialData));
    }
    return defaultSort(toValue(initialData), toValue(sortOptions));
  });

  return {
    sorted,
  };
};
