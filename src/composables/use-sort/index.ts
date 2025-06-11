import { type MaybeRefOrGetter, computed, toValue, isRef, type ComputedRef, type Ref } from 'vue';

export type SortOrder = 'asc' | 'desc';

export interface SortOption<T> {
  key: keyof T;
  order: SortOrder;
}
/*
export interface UseSortOptionsShared<T> {
  initialData: MaybeRefOrGetter<T[]>;
}

export interface UseSortOptionsSortOnly<T> extends UseSortOptionsShared<T> {
  sortOptions: MaybeRefOrGetter<SortOption<T>[]>;
  customSort?: never;
}

export interface UseSortOptionsWithCustom<T> extends UseSortOptionsShared<T> {
  customSort?: MaybeRefOrGetter<(data: T[]) => T[]> | MaybeRefOrGetter<undefined> | ComputedRef<undefined>;
  sortOptions?: MaybeRefOrGetter<SortOption<T>[]>;
}

export type UseSortOptions<T> = UseSortOptionsSortOnly<T> | UseSortOptionsWithCustom<T>;
*/

type MaybeFunction<T> = ((data: T[]) => T[]) | undefined;
// type MaybeFunctionRef<T> = Ref<MaybeFunction<T>> | ComputedRef<MaybeFunction<T>>;
type MaybeFunctionRef<T> = MaybeRefOrGetter<MaybeFunction<T>>;

export type UseSortOptions<T> = {
  initialData?: MaybeRefOrGetter<T[]>;
  // customSort?: MaybeRefOrGetter<(data: T[]) => T[]> | MaybeRefOrGetter<undefined> | ComputedRef<undefined> | ComputedRef<((data: any[]) => any[]) | undefined>;
  customSort?: MaybeFunction<T> | MaybeFunctionRef<T>;
  sortOptions?: MaybeRefOrGetter<SortOption<T>[]>;
}

const defaultSort = <T>(data: T[], sortOptions: SortOption<T>[]): T[] => {
  if (!sortOptions?.[0]?.order) {
    console.warn('No sort options provided. Returning original data.');
    return data;
  }

  return [...data].sort((a, b) => {
    for (const { key, order } of sortOptions) {
      const aValue = a[key];
      const bValue = b[key];

      const aIsNullish = aValue === null || aValue === undefined;
      const bIsNullish = bValue === null || bValue === undefined;

      if (aIsNullish && bIsNullish) return 0;
      if (aIsNullish) return 1; // null/undefined to the end
      if (bIsNullish) return -1;

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const useSort = <T>({
  initialData = [],
  sortOptions = [],
  customSort,
}: UseSortOptions<T>) => {
  const sorted = computed(() => {
    if (typeof customSort === 'function') {
      customSort(toValue(initialData));
    }
    if (isRef(customSort) && typeof customSort.value === 'function') {
      customSort.value(toValue(initialData));
    }
    return defaultSort(toValue(initialData), toValue(sortOptions));
  });

  return {
    sorted,
  };
};
