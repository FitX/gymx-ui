import { describe, it, expect } from 'vitest';
import { ref, defineComponent } from 'vue';
import { usePagination, paginate } from './index';
import { flushPromises, mount } from '@vue/test-utils';

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
    const { currentPage, paginated } = usePagination(data);

    expect(paginated.value).toEqual([1, 2, 3, 4, 5]);

    currentPage.value = 2;
    expect(paginated.value).toEqual([]);

    currentPage.value = 1;
    expect(paginated.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('should increment the current page correctly', () => {
    const data = ref([1, 2, 3, 4]);
    const { currentPage, nextPage, perPage } = usePagination(data);
    perPage.value = 2;

    expect(currentPage.value).toBe(1);
    nextPage();
    expect(currentPage.value).toBe(2);
    nextPage();
    expect(currentPage.value).toBe(2);
  });

  it('should decrement the current page correctly', () => {
    const data = ref([1, 2, 3, 4, 5]);
    const { currentPage, prevPage } = usePagination(data);

    expect(currentPage.value).toBe(1);
    currentPage.value = 2;

    prevPage();
    expect(currentPage.value).toBe(1);
    prevPage();
    expect(currentPage.value).toBe(1);
  });

  it('should return 1 view if no values found in list', async () => {
    const TestComponent = defineComponent({
      setup() {
        const data = ref([1, 2, 3, 4]);
        const { currentPage, totalPages, perPage } = usePagination(data);

        perPage.value = 2;
        currentPage.value = 2;

        const filter = () => {
          data.value = [];
        };

        return {
          currentPage,
          totalPages,
          filter,
        };
      },
      template: '<div>{{ currentPage }} <button @click="filter()">filter</button></div>',
    });

    const wrapper = mount(TestComponent, {});
    await wrapper.find('button').trigger('click');
    await flushPromises();

    // expect(wrapper.html()).toEqual('<div>1</div>')
    expect(wrapper.vm).includes({ totalPages: 1, currentPage: 1 });
  });
});
