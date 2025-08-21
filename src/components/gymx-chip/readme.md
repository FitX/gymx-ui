A flexible **Chip/Toggle component**. It supports _single- and multi-select_ modes, works with `string`, `number`, or complex values (`ChipValue`).

## 🔧 Props

### `value`

- **Type:** `string | number | ChipValue | (string | number | ChipValue)[]`
- **Description:** The logical value of the chip.

  - In _single-select_ mode: a single value.
  - In _multi-select_ mode: an item within an array.

```
<gymx-chip value="apple" v-model="selected" />
<gymx-chip :value="{ value: 42, label: 'Meaning' }" v-model="selected" />
```

### `count`

- **Type:** `number` (optional)
- **Description:** A number displayed as a badge or counter inside the chip.

### `state`

- **Type:** `'disabled' | 'focused' | 'hover' | undefined` (optional)
- **Description:** UI state of the chip, controls applied CSS classes.

## 🔗 v-model

**Type:** `T | undefined`

The model holds the current selection:

- _Single mode:_ a single value or `undefined`.
- _Multi mode:_ an array of values.

```
<script setup lang="ts">
import { type ChipValue, GymxChip } from '@fitx/gymx-ui';

const single = ref<string | undefined>(undefined);
const multi = ref<(string | number | ChipValue)[]>([]);
</script>

<template>
  <!-- Single Select -->
  <gymx-chip v-model="single" value="A">A</gymx-chip>
  <gymx-chip v-model="single" value="B">B</gymx-chip>

  <!-- Multi Select -->
  <gymx-chip v-model="multi" value="X">X</gymx-chip>
  <gymx-chip v-model="multi" value="Y">Y</gymx-chip>
</template>
```

## 🧩 Slots

### `default`

- **Props:**

  - `pressed: boolean` → whether the chip is selected
  - `value: T` → the chip’s value

- **Description:** Chip content. Default: `{{ props.value }}`

```
<gymx-chip v-model="selected" value="Vue">
  <template #default="{ pressed, value }">
    <span :style="{ fontWeight: pressed ? 'bold' : 'normal' }">{{ value }}</span>
  </template>
</gymx-chip>
```

### `count`

- **Props:**

  - `pressed: boolean`
  - `count?: number`

- **Description:** Customizable area for displaying the counter. Default: `{{ props.count }}`

```
<gymx-chip v-model="selected" value="Vue" :count="12">
  <template #count="{ count }">
    <span class="badge">{{ count }}</span>
  </template>
</gymx-chip>
```

## 🎨 Styling

**Base class:** `.chip`

**Modifiers (via `getModifierClasses`):**

- `.chip--disabled`
- `.chip--hover`
- `.chip--focused`

**Custom Properties:**

A lot of Properties for Adjustments.

```scss
/**
  Chip
   */
--_chip-font-size: var(--chip-font-size, var(--gymx-font-size-1));
--_chip-font-weight: var(--chip-font-weight, var(--gymx-font-weight-default));
--_chip-font-family: var(--chip-font-family, inherit);

--_chip-padding-inline: var(--chip-padding-inline, var(--gymx-size-0));
--_chip-padding-block: var(--chip-padding-block, var(--gymx-size-000));
--_chip-gap: var(--chip-gap, var(--gymx-size-00));

--_chip-border: var(--chip-border, none);
--_chip-outline: var(--chip-outline);
--_chip-radius: var(--chip-radius, var(--gymx-radius-4));
--_chip-transition: var(--chip-transition, background-color 200ms ease, color 200ms ease);

--_chip-color: var(--chip-color, var(--gymx-color-gray-12));
--_chip-color-background: var(--chip-color-background, var(--gymx-color-gray-2));
// ...

/**
Chip Count
 */
--_chip-count-font-size: var(--chip-count-font-size, 0.625em);
--_chip-count-padding: var(--chip-count-padding, 0.2em);
--_chip-count-block-size: var(--chip-count-block-size, 1.125rem);

--_chip-count-color: var(--chip-count-color, currentColor);
// ...
```
