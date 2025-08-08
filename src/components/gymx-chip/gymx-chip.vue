<script lang="ts" setup generic="T extends string | number | boolean | object">
import type { GymxChipProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref, toValue, useAttrs } from 'vue';

type ChipComponentProps = GymxChipProps<T>;

const props = defineProps<ChipComponentProps>();

const model = defineModel<T | T[]>({ required: true });
const attrs = useAttrs();

const effectiveValue = computed<T>(() => {
  if (props.value !== undefined) {
    return props.value;
  }
  if (!Array.isArray(model.value)) {
    return true as T;
  }
  return undefined as T;
});

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.some(item =>
      JSON.stringify(item) === JSON.stringify(effectiveValue.value)
    );
  }
  return JSON.stringify(model.value) === JSON.stringify(effectiveValue.value);
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(attrs?.disabled),
);

const handleChange = () => {
  if (disabled.value) return;

  if (Array.isArray(model.value)) {
    const currentArray = [...model.value];
    const valueToToggle = effectiveValue.value;

    if (isChecked.value) {
      // remove
      const index = currentArray.findIndex(item =>
        JSON.stringify(item) === JSON.stringify(valueToToggle)
      );
      if (index > -1) {
        currentArray.splice(index, 1);
      }
    } else {
      // add
      currentArray.push(valueToToggle);
    }
    model.value = currentArray as T[];
  } else {
    // single
    if (isChecked.value) {
      model.value = (typeof effectiveValue.value === 'boolean' ? false : null) as T;
    } else {
      model.value = effectiveValue.value;
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
