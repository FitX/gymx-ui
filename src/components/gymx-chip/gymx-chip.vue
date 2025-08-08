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
