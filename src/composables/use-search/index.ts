import { computed, type MaybeRefOrGetter, toValue } from 'vue';

export interface FilterOption<T> {
  key: keyof T;
  value: any;
  predicate: (a: any, b: any) => boolean;
}

export const defaultSearch = <T>(data: T[], filterOptions: FilterOption<T>[]): T[] =>
  data?.filter((item) =>
    filterOptions?.every(({ key, value, predicate }) => predicate(item[key], value)),
  );

export interface UseSearchOptionsShared<T> {
  initialData: MaybeRefOrGetter<T[]>;
}

export interface UseSearchOptionsWithSearchOptions<T> extends UseSearchOptionsShared<T> {
  searchOptions: MaybeRefOrGetter<FilterOption<T>[]>;
  customSearch?: never;
}

export interface UseSearchOptionsWithCustomSearchFunction<T> extends UseSearchOptionsShared<T> {
  // its important to add customSearch as Getter Function like () => customSearch or as ref(customSearch)
  customSearch: MaybeRefOrGetter<(data: T[]) => T[]>;
  searchOptions?: never;
}

export type UseSearchOptions<T> =
  | UseSearchOptionsWithSearchOptions<T>
  | UseSearchOptionsWithCustomSearchFunction<T>;

export const useSearch = <T>({
   initialData,
   searchOptions,
   customSearch,
 }: UseSearchOptions<T>) => {
  const reactiveInitialData = computed(() => toValue(initialData) || []);
  const filtered = computed(() => {
    const resolvedCustomSearch = toValue(customSearch);
    const resolvedInitialData = toValue(reactiveInitialData);

    if (typeof resolvedCustomSearch === 'function') {
      return resolvedCustomSearch(resolvedInitialData);
    }

    const resolvedSearchOptions = toValue(searchOptions) || [];
    return defaultSearch(resolvedInitialData, resolvedSearchOptions);
  });

  return {
    filtered,
  };
};
