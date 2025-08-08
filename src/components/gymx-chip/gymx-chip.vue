<script lang="ts" setup generic="T extends string | number | ChipValue | (string | number | ChipValue)[]">
import type { ChipValue, GymxChipProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, useAttrs } from 'vue';

type ChipComponentProps = GymxChipProps<T>;

const props = defineProps<ChipComponentProps>();

const model = defineModel<T | undefined>({ required: true });
const attrs = useAttrs();

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.some(item => {
      if (typeof item === 'object' && typeof props.value === 'object') {
        return item.value === props.value.value;
      }
      return item === props.value;
    });
  }

  if (typeof model.value === 'object' && typeof props.value === 'object') {
    return model.value.value === props.value.value;
  }
  return model.value === props.value;
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(attrs?.disabled),
);

const handleChange = () => {
  if (Array.isArray(model.value)) {
    const currentArray = [...model.value];
    const valueToToggle = props.value;

    if (isChecked.value) {
      // remove
      const index = currentArray.findIndex(item => {
        if (typeof item === 'object' && typeof valueToToggle === 'object') {
          // @ts-expect-error ts compiler not up to date
          return item !== null && Object.hasOwn(item, 'value') && item.value === valueToToggle.value;
        }
        return item === valueToToggle;
      });
      if (index > -1) {
        currentArray.splice(index, 1);
      }
    } else {
      // add
      currentArray.push(valueToToggle);
    }
    model.value = currentArray as T;
  } else {
    // single
    if (isChecked.value) {
      model.value = undefined;
    } else {
      model.value = props.value as T;
    }
  }
};
</script>

<template>
  <button
    class="chip"
    :class="[
      getModifierClasses('chip', props.state),
      getModifierClasses('chip', disabled ? 'disabled' : undefined),
    ]"
    :disabled="disabled"
    :aria-pressed="isChecked"
    @click="handleChange"
  >
    <span class="chip__content">
      <slot name="default" :pressed="isChecked" :value="props.value">
        {{ props.value }}
      </slot>
      <span class="chip__count">
        <slot name="count" :pressed="isChecked" :count="props.count">
        {{ props.count }}
      </slot>
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.chip {
  $self: &;
  --_chip-font-size: var(--chip-font-size, var(--gymx-font-size-1));
  --_chip-color-background: var(--chip-color-background, var(--gymx-color-gray-2));
  --_chip-color-text: var(--chip-color-text, var(--gymx-color-gray-12));
  --_chip-color-background-hover: var(--chip-color-background-hover, var(--gymx-color-gray-12));
  --_chip-color-text-hover: var(--chip-color-text-hover, var(--gymx-color-gray-2));

  --_chip-count-color-background: var(--chip-count-color-background, transparent);
  --_chip-count-color-text: var(--chip-count-color-text, var(--gymx-color-gray-9));

  --_chip-count-color-background-hover: var(--chip-count-color-background-hover, transparent);
  --_chip-count-color-text-hover: var(--chip-count-color-text-hover, var(--gymx-color-gray-4));

  --_chip-radius: var(--chip-radius, var(--gymx-radius-4));
  --_chip-padding-inline: var(--chip-padding-inline, var(--gymx-size-0));
  --_chip-padding-block: var(--chip-padding-block, var(--gymx-size-000));

  place-items: center;
  place-content: center;
  font-size: var(--_chip-font-size);
  // font-weight: 400;
  color: var(--_chip-color-text);
  padding-inline: var(--_chip-padding-inline);
  padding-block: var(--_chip-padding-block);
  background: var(--_chip-color-background);
  border: none;
  border-radius: var(--_chip-radius);
  display: inline-grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
  min-width: max-content;
  user-select: none;
  text-align: center;

  &__content {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: var(--chip-content-gap, var(--gymx-size-00));
    &:has(#{$self}__count:empty) {
      grid-template-columns: auto;
    }
  }

  &__count {
    color: var(--_chip-count-color-text);
    background: var(--_chip-count-color-background);
    &:empty { display: none };
  }

  &:hover,
  &--hover,
  &:is([aria-pressed=true]) {
    --chip-color-background: var(--_chip-color-background-hover);
    --chip-color-text: var(--_chip-color-text-hover);
    --chip-count-color-background: var(--_chip-count-color-background-hover);
    --chip-count-color-text: var(--_chip-count-color-text-hover);
  }
}
</style>
