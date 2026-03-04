# useSort Documentation

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
  - [Sorting by Multiple Keys](#sorting-by-multiple-keys)
  - [Using a Custom Sort Function](#using-a-custom-sort-function)
- [API](#api)
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

// The value of `sorted` will be:
[
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
];
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

If you need specific sorting logic for keys that `defaultSort` cannot handle (e.g. nested keys),
you can provide a custom sort function (`customSort`). Use `ignoreSortKeys` to prevent
`defaultSort` from also sorting those keys.

```ts
const customSort = (dataToSort: SpecialItem[]) => {
  return dataToSort.sort((a, b) => a.event.name.localeCompare(b.event.name));
};

const { sorted } = useSort({
  initialData: data,
  sortOptions,   // [{ key: 'event', order: 'asc' }, { key: 'name', order: 'asc' }]
  customSort,
  ignoreSortKeys: ['event'],
});
```

`customSort` runs before `defaultSort`. Keys listed in `ignoreSortKeys` are excluded
from `defaultSort`, so they are only handled by `customSort`.

## API

### `useSort(options: UseSortOptions<T>)`

- **`initialData`** (required): The list of data to sort. Can be a `ref` or a raw value.
- **`sortOptions`** (optional): A list of sorting options with the following properties:
  - `key`: The key in the object to sort by.
  - `order`: The sorting order, either `'asc'` (ascending) or `'desc'` (descending).
- **`customSort`** (optional): A custom sort function for keys that `defaultSort` cannot handle.
  Runs before `defaultSort`.
- **`includeDefaultSort`** (optional, default: `true`): Whether to apply `defaultSort` after
  `customSort`. Can be a `ref` or a raw value.
- **`ignoreSortKeys`** (optional): A list of keys to exclude from `defaultSort`.
  Use this together with `customSort` to prevent `defaultSort` from overriding custom sort logic.
  Can be a `ref` or a raw value.

#### Returns:

- **`sorted`**: A sorted list of the data based on the `sortOptions` or `customSort` function.
  if `toValue(initialData)` is `null` or `undefined`, it returns initialData itself.

### Warnings and Errors

- **No Sort Options Provided**: If neither `sortOptions` nor `customSort` are passed, the function will return the original list and output a warning in the console.
