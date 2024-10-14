import { type MaybeRefOrGetter, computed, toValue } from 'vue';
// import { sort } from 'fast-sort';

export type SortOrder = 'asc' | 'desc';

export interface SortOption<T> {
  key: keyof T;
  order: SortOrder;
}

export interface FilterOption<T> {
  key: keyof T;
  value: any;
  predicate: (a: any, b: any) => boolean;
}

export interface PaginationOption {
  page: number;
  perPage: number;
}

const sortData = <T>(data: T[], sortOptions: SortOption<T>[]): T[] => {
  /* if (sortOptions?.[0]?.order === 'desc') {
    return sort(data).desc((u) => u.name || '');
  }
  return sort(data).asc((u) => u.name || ''); */
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

const filterData = <T>(data: T[], filterOptions: FilterOption<T>[]): T[] =>
  data.filter((item) =>
    filterOptions.every(({ key, value, predicate }) =>
      predicate(item[key], value)
    )
  );

const paginateData = <T>(
  data: T[],
  paginationOption?: PaginationOption
): T[] => {
  if (!paginationOption) return data;

  const { page, perPage } = paginationOption;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  return data.slice(startIndex, endIndex);
};

export interface UseTableOptions<T> {
  initialData: MaybeRefOrGetter<T[]>;
  sortOptions?: MaybeRefOrGetter<SortOption<T>[]>;
  filterOptions?: MaybeRefOrGetter<FilterOption<T>[]>;
  paginationOption?: MaybeRefOrGetter<PaginationOption | undefined>;
}

export const useTable = <T>({
                              initialData = [],
                              sortOptions = [],
                              filterOptions = [],
                              paginationOption,
                            }: UseTableOptions<T>) => {
  /* @TODO computed vs single items */
  const processedData = computed(() => {
    /* let result = sortData(toValue(initialData), toValue(sortOptions));
    result = filterData<T>(result, toValue(filterOptions));
    return paginateData<T>(result, toValue(paginationOption));*/
    let result = filterData<T>(toValue(initialData), toValue(filterOptions));
    result = sortData(toValue(result), toValue(sortOptions));
    return paginateData<T>(result, toValue(paginationOption));
  });

  return {
    processedData,
  };
};
