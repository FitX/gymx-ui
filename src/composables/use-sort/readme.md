# useSort Documentation

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
  - [Sorting by Multiple Keys](#sorting-by-multiple-keys)
  - [Using a Custom Sort Function](#using-a-custom-sort-function)
- [API](#api)
- [Example](#example)
- [Warnings and Errors](#warnings-and-errors)

## Introduction
The `useSort` composable provides a way to sort data based on sorting options or a custom sort function.

## Usage
The `useSort` composable sorts a list of data based on provided `sortOptions`,
like sorting by a key in ascending or descending order.
```ts
import { useSort } from '@fitx/gymx-ui';
const data = ref([
  { id: 3, name: 'C' },
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
]);

const sortOptions = ref([
  { key: 'id', order: 'asc' }, // Sort by id in ascending order
]);

const { sorted } = useSort({ initialData: data, sortOptions });
```
The value of `sorted` will be:
```ts
[
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
]
```
### Sorting by Multiple Keys
You can pass multiple sort options. Sorting will be applied in the order of keys.
```ts
const sortOptions = ref([
  { key: 'id', order: 'asc' },
  { key: 'name', order: 'asc' },
]);

const { sorted } = useSort({ initialData: data, sortOptions });
```
### Using a Custom Sort Function
If you need specific sorting logic, you can provide a custom sort function (`customSort`).
```ts
const customSort = (dataToSort) => dataToSort.reverse();

const { sorted } = useSort({ initialData: data, customSort });
```
In this case, the custom sort function will be used and `sortOptions` will be ignored.

## API

### `useSort(options: UseSortOptions<T>)`
- **`initialData`** (required): The list of data to sort. Can be a `ref` or a raw value.
- **`sortOptions`** (optional): A list of sorting options with the following properties:
  - `key`: The key in the object to sort by.
  - `order`: The sorting order, either `'asc'` (ascending) or `'desc'` (descending).
- **`customSort`** (optional): A custom function to sort the data. If this function is provided, `sortOptions` will be ignored.

#### Returns:
- **`sorted`**: A sorted list of the data based on the `sortOptions` or `customSort` function.

### Example
```ts
import { useSort } from '@fitx/gymx-ui';

const data = ref([
  { id: 3, name: 'C' },
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
]);

const sortOptions = ref([
  { key: 'id', order: 'asc' },
  { key: 'name', order: 'asc' },
]);

const { sorted } = useSort({ initialData: data, sortOptions });

console.log(sorted.value); // Output: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }]
```
### Warnings and Errors
- **No Sort Options Provided**: If neither `sortOptions` nor `customSort` are passed, the function will return the original list and output a warning in the console.
