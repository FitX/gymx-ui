<script lang="ts" setup generic="T extends string | number">
import type { GymxChipProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref, useAttrs } from 'vue';

type ChipComponentProps = GymxChipProps<T>;

const props = defineProps<ChipComponentProps>();

const model = defineModel<T | T[]>({ required: true, default: ref([]) });
const attrs = useAttrs();

/**
 * @TODO refactor as pressed/selected or shared with checkbox as composable
 */
const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return (model.value as Array<string | number>).includes(
      props.value as string | number,
    );
  }
  return model.value === props.value;
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(attrs?.disabled),
);

const handleChange = () => {
  if (Array.isArray(model.value)) {
    const currentValues = model.value;
    if (currentValues.includes(props.value)) {
      model.value = currentValues.filter((v) => v !== props.value);
    } else {
      model.value = [...currentValues, props.value];
    }
  } else {
    if (model.value === props.value) {
      model.value = undefined;
    } else {
      model.value = props.value;
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
