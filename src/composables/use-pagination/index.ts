import { type MaybeRefOrGetter, computed, toValue, ref, unref, toRef, watch } from 'vue';

export interface PaginationOption {
  page: number;
  perPage: number;
}

export const paginate = <T>(
  data: T[] = [],
  paginationOption?: PaginationOption
): T[] => {
  if (!paginationOption) return data;

  const { page, perPage } = paginationOption;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  return [...data].slice(startIndex, endIndex);
};

export const usePagination = <T>(data: MaybeRefOrGetter<T[]>) => {
  const currentPage = ref(1);
  const perPage = ref(10);

  const paginated = computed(() => {
    return paginate<T>(toValue(data), {
      page: toValue(currentPage),
      perPage: toValue(perPage),
    });
  });

  const totalPages = computed<number>(() =>
    Math.ceil(toValue(data).length / toValue(perPage)) || 1);

  const nextPage = () => {
    if (toValue(currentPage) < toValue(totalPages)) {
      currentPage.value += 1;
    }
  };

  const prevPage = () => {
    if (toValue(currentPage) > 1) {
      currentPage.value -= 1;
    }
  };

  watch(totalPages, (newTotalPages) => {
    if (toValue(currentPage) > newTotalPages) {
      currentPage.value = 1;
    }
  });

  return {
    currentPage,
    perPage,
    paginated,
    totalPages,
    nextPage,
    prevPage,
  }
};
