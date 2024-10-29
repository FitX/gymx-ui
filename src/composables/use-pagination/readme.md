# usePagination Documentation

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
  - [Changing Page and Items Per Page](#changing-page-and-items-per-page)
- [API](#api)
- [Example](#example)

## Introduction

The `usePagination` composable manages the pagination logic and provides reactive properties and methods to navigate through pages.

## Usage

To use `usePagination`, you need to provide a reactive reference to the data you want to paginate. By default, it initializes with the first page and ten items per page.

```ts
import { usePagination } from '@fitx/gymx-ui';
import { ref } from 'vue';

const data = ref([...Array(100).keys()]);
const { paginated } = usePagination(data);

// The value of `paginated` will be the first ten items:
// Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Changing Page and Items Per Page

You can change the current page and items per page by setting `currentPage` and `perPage` values.
For example, to go to the second page:

```ts
const { currentPage, nextPage, perPage } = usePagination(data);

// Moves to the next page
nextPage();
console.log(currentPage.value); // Output: 2

// If you want to set the number of items per page to 20:
perPage.value = 20;
```

## API

### usePagination(data: MaybeRefOrGetter<T[]>)

- **data** (required): The list of data to paginate. Can be a `ref` or a raw value.

#### Returns:

- **currentPage**: A reactive reference representing the current page (default is 1).
- **perPage**: A reactive reference representing the number of items per page (default is 10).
- **paginated**: A computed property that returns the current paginated data based on `currentPage` and `perPage`.
- **totalPages**: A computed property that returns the total number of pages.
- **nextPage()**: A method to increment the current page by one.
- **prevPage()**: A method to decrement the current page by one.

## Example

```ts
import { usePagination } from '@fitx/gymx-ui';
import { ref } from 'vue';

const data = ref([...Array(100).keys()]);
const { currentPage, perPage, paginated, totalPages, nextPage, prevPage } = usePagination(data);

// Initial output
console.log(paginated.value); // Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Navigate to next page
nextPage();
console.log(currentPage.value); // Output: 2
console.log(paginated.value); // Output: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

// Change items per page
perPage.value = 20;
console.log(paginated.value); // Output: [0, 1, 2, ..., 19]
```
