<script lang="ts" setup generic="T extends string | number | boolean | Array<string | number>">
import type { GymxChipProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, useAttrs } from 'vue';

type ChipComponentProps = GymxChipProps<T>;

const props = defineProps<ChipComponentProps>();

const model = defineModel<T>({ required: true });
const attrs = useAttrs();

const effectiveValue = computed(() => {
  if (props.value !== undefined) {
    return props.value;
  }
  if (!Array.isArray(model.value)) {
    return true as T extends Array<infer U> ? U : T;
  }
  return undefined;
});

/**
 * @TODO refactor as pressed/selected or shared with checkbox as composable
 */
const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return (model.value as Array<string | number>).includes(
      effectiveValue.value as string | number,
    );
  }
  return model.value === effectiveValue.value;
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(attrs?.disabled),
);

const handleChange = (event: Event) => {
  const target = event.target as HTMLButtonElement;

  if (Array.isArray(model.value)) {
    // multiple value
    const currentArray = model.value as Array<string | number>;
    const newValue = [...currentArray];
    const valueToToggle = effectiveValue.value as string | number;

    if (target.ariaPressed) {
      if (!newValue.includes(valueToToggle)) {
        newValue.push(valueToToggle);
      }
    } else {
      const index = newValue.indexOf(valueToToggle);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    }
    model.value = newValue as T;
  } else {
    // single value
    model.value = (target.ariaPressed ? effectiveValue.value : false) as T;
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
    :value="effectiveValue"
    :disabled="disabled"
    :aria-pressed="isChecked"
    @click="handleChange"
  >
    <slot name="default" :pressed="isChecked" :value="props.value">
      {{ props.value }}
    </slot>
    <slot name="count" :pressed="isChecked" :count="props.count">
      {{ props.count }}
    </slot>
  </button>
</template>
<style lang="scss" scoped>
.chip {
  &[aria-pressed='true'] {
    background: red !important;
  }
}
</style>
