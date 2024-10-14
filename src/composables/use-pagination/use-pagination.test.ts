import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { usePagination, paginate } from './index';

describe('paginate', () => {
  it('should return the full data set when pagination option is not provided', () => {
    const data = [1, 2, 3, 4, 5];
    const result = paginate(data);
    expect(result).toEqual(data);
  });

  it('should return the correct paginated data for page 1', () => {
    const data = [1, 2, 3, 4, 5];
    const paginationOption = { page: 1, perPage: 2 };
    const result = paginate(data, paginationOption);
    expect(result).toEqual([1, 2]);
  });

  it('should return the correct paginated data for page 2', () => {
    const data = [1, 2, 3, 4, 5];
    const paginationOption = { page: 2, perPage: 2 };
    const result = paginate(data, paginationOption);
    expect(result).toEqual([3, 4]);
  });

  it('should return the remaining items for a partially filled page', () => {
    const data = [1, 2, 3, 4, 5];
    const paginationOption = { page: 3, perPage: 2 };
    const result = paginate(data, paginationOption);
    expect(result).toEqual([5]);
  });

  it('should return an empty array if the page is out of bounds', () => {
    const data = [1, 2, 3, 4, 5];
    const paginationOption = { page: 4, perPage: 2 };
    const result = paginate(data, paginationOption);
    expect(result).toEqual([]);
  });

  it('should handle pagination with a single item', () => {
    const data = [1];
    const paginationOption = { page: 1, perPage: 1 };
    const result = paginate(data, paginationOption);
    expect(result).toEqual([1]);
  });
});

describe('usePagination', () => {
  it('should return the correct initial values', () => {
    const data = ref([1, 2, 3, 4, 5]);
    const { currentPage, perPage, paginated, totalPages } = usePagination(data);

    expect(currentPage.value).toBe(1);
    expect(perPage.value).toBe(10);
    expect(paginated.value).toEqual([1, 2, 3, 4, 5]);
    expect(totalPages.value).toBe(1);
  });

  it('should paginate data correctly on page change', () => {
    const data = ref([1, 2, 3, 4, 5]);
    const { currentPage, perPage, paginated, nextPage } = usePagination(data);

    expect(paginated.value).toEqual([1, 2, 3, 4, 5]);

    currentPage.value = 2;
    expect(paginated.value).toEqual([]);

    currentPage.value = 1;
    expect(paginated.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('should increment the current page correctly', () => {
    const data = ref([1, 2, 3, 4, 5]);
    const { currentPage, totalPages, nextPage } = usePagination(data);

    expect(currentPage.value).toBe(1);
    expect(totalPages.value).toBe(1);

    nextPage();
    expect(currentPage.value).toBe(1);
  });

  it('should decrement the current page correctly', () => {
    const data = ref([1, 2, 3, 4, 5]);
    const { currentPage, prevPage } = usePagination(data);

    expect(currentPage.value).toBe(1);

    prevPage();
    expect(currentPage.value).toBe(1);
  });
});

