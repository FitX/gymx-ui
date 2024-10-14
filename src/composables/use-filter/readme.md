# useSearch Documentation

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Using a Custom Search Function](#using-a-custom-search-function)
- [API](#api)
  - [Types](#types)
    - [FilterOption<T>](#filteroption)
    - [UseSearchOptions<T>](#usesearchoptions)
  - [Methods](#methods)
    - [useSearch<T>](#usesearch)
  - [Helper Functions](#helper-functions)
    - [defaultSearch<T>](#defaultsearch)
- [Example](#example)

## Introduction
The `useSearch` composable is designed to simplify filtering / searching data collections.
It provides two flexible methods for searching through data:

1.  **Search with Filter Options**: You can pass an array of filter options where each option defines the field to search and the criteria to match.
2.  **Custom Search/Filter Function**: You can define a custom search function to apply more complex search logic if the filter options are not flexible enough.

## Usage
The `useSearch` composable filter a list of data based on provided `FilterOption`,
like finding a value by a key.

```ts
  import { useSearch } from '@fitx/gymx-ui';
  import { ref } from 'vue';

  const data = [
    { name: 'Jessica', job: 'product owner' },
    { name: 'Frank', job: 'developer' },
    { name: 'Micha', job: 'developer' },
    { name: 'Owner', job: '' },
  ];

  const filterOptions = [
    {
      key: 'job',
      value: 'developer',
      predicate: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
    },
  ];

  const initialData = ref(data);
  const searchOptions = ref(filterOptions);

  const { filtered } = useSearch({
    initialData,
    searchOptions,
  });

  // Use `filtered.value` to get the filtered data
  console.log(filtered.value);
```

### Using a Custom Search Function
If the default filter logic doesn't fit your needs,
you can provide a custom search function:
```ts
  const data = [
    { name: 'Jessica', job: 'product owner' },
    { name: 'Frank', job: 'developer' },
    { name: 'Micha', job: 'developer' },
    { name: 'Owner', job: '' },
  ];

  const searchTerm = ref('Owner');
  const customSearch = (items) =>
    items.filter((item) =>
      ['name', 'job'].some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );

  const { filtered } = useSearch({
    initialData: ref(data),
    customSearch,
  });

  console.log(filtered.value);
```
## API

### Types

#### FilterOption<T>
Defines a filter criterion for a specific field.
- **key**: `keyof T` — The field to filter on.
- **value**: `any` — The value to compare with.
- **predicate**: `(a: any, b: any) => boolean` — A function to compare the field value (`a`) against the provided filter value (`b`).

#### UseSearchOptions<T>
Union type that allows two configurations:

1.  **With Filter Options**: Use predefined filter options to filter data.
  - **initialData**: `MaybeRefOrGetter<T[]>` — The initial data to filter.
  - **searchOptions**: `MaybeRefOrGetter<FilterOption<T>[]>` — Array of filter options.
  - **customSort**: `never` — Optional, ignored if present.
2.  **With Custom Search Function**: Use a custom search function for filtering.
  - **initialData**: `MaybeRefOrGetter<T[]>` — The initial data to filter.
  - **customSearch**: `MaybeRefOrGetter<(data: T[]) => T[]>` — Custom function that returns the filtered data.
  - **searchOptions**: `never` — Optional, ignored if present.

### Methods

#### useSearch<T>(options: UseSearchOptions<T>): { filtered: ComputedRef<T[]> }

Creates a computed property that returns the filtered data.

##### Parameters:

- **options**:
  - **initialData**: The source data to be filtered, can be reactive (e.g., `ref` or `computed`).
  - **searchOptions** (optional): An array of `FilterOption<T>` objects, defining the fields and predicates for filtering the data.
  - **customSearch** (optional): A custom function that defines how the filtering should be done.

##### Returns:
- **filtered**: A `computed` property containing the filtered data array based on the provided filter options or custom search function.

### Helper Functions

#### defaultSearch<T>(data: T[], filterOptions: FilterOption<T>[]): T[]

The `defaultSearch` function performs a basic filtering operation. It checks if each item in the `data` array matches all the provided filter options.

##### Parameters:
- **data**: An array of items to be filtered.
- **filterOptions**: An array of `FilterOption<T>` objects, each representing a filter criterion.

##### Returns:
- **T[]**: An array of filtered items.

## Example
Here is a complete example of using the `useSearch` composable in a Vue component:
```vue
  <template>
    <div>
      <input v-model="searchTerm" placeholder="Search..." />
      <ul>
        <li v-for="item in filtered" :key="item.name">
          {{ item.name }} ({{ item.job }})
        </li>
      </ul>
    </div>
  </template>

  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useSearch } from '@fitx/gymx-ui';

  const data = [
    { name: 'Jessica', job: 'product owner' },
    { name: 'Frank', job: 'developer' },
    { name: 'Micha', job: 'developer' },
    { name: 'Owner', job: '' },
  ];

  const searchTerm = ref('');
  const customSearch = (items) =>
    items.filter((item) =>
      ['name', 'job'].some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );

  const { filtered } = useSearch({
    initialData: ref(data),
    customSearch,
  });
  </script>
```

This example showcases a custom search function that dynamically filters the data based on user input.
The `filtered` computed property is automatically updated as the `searchTerm` changes.
