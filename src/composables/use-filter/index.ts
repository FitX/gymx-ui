import { computed, type MaybeRefOrGetter, toValue } from 'vue';

/* export interface SearchOptions<T> {
  keys: (keyof T)[];
  term: string | number | boolean;
}
*/

export interface FilterOption<T> {
  key: keyof T;
  value: any;
  predicate: (a: any, b: any) => boolean;
}

export const defaultSearch = <T>(data: T[], filterOptions: FilterOption<T>[]): T[] =>
  data.filter((item) =>
    filterOptions.every(({ key, value, predicate }) =>
      predicate(item[key], value)
    )
  );

/* const defaultSearch = (data: T[], searchTerm: searchOptions['term']): boolean => {
  return data.filter((item) =>
    searchOptions.keys.some((key) =>
      String(item[key]).toLowerCase().includes(String(searchTerm.toLowerCase()).toLowerCase())
    )
  );
}; */

export interface UseSearchOptionsShared<T> {
  initialData: MaybeRefOrGetter<T[]>;
}

export interface UseSearchOptionsWithSearchOptions<T>
  extends UseSearchOptionsShared<T> {
  searchOptions: MaybeRefOrGetter<FilterOption<T>[]>;
  customSearch?: never;
}

export interface UseSearchOptionsWithCustomSearchFunction<T>
  extends UseSearchOptionsShared<T> {
  customSearch: MaybeRefOrGetter<(data: T[]) => T[]>;
  searchOptions?: never;
}

export type UseSearchOptions<T> =
  | UseSearchOptionsWithSearchOptions<T>
  | UseSearchOptionsWithCustomSearchFunction<T>;

export const useSearch = <T>({
 initialData = [],
 searchOptions = [],
 customSearch,
}: UseSearchOptions<T>) => {
  const filtered = computed(() => {
    if (typeof customSearch === 'function') {
      return customSearch(toValue(initialData));
    }
    return defaultSearch(toValue(initialData), toValue(searchOptions));
  });

  return {
    filtered,
  };
};
