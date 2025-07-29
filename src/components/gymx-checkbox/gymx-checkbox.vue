<script lang="ts" setup generic="T extends string | number | boolean | Array<string | number>">
import type { GymxCheckboxProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

type CheckboxComponentProps = GymxCheckboxProps<T>;

const props = withDefaults(defineProps<CheckboxComponentProps>(), {
  inputAttributes: () => ({}),
  id: () => crypto.randomUUID(),
  state: undefined,
});

const model = defineModel<T>({ required: true });

const effectiveValue = computed(() => {
  if (props.value !== undefined) {
    return props.value;
  }
  if (!Array.isArray(model.value)) {
    return true as T extends Array<infer U> ? U : T;
  }
  return undefined;
});

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return (model.value as Array<string | number>).includes(
      effectiveValue.value as string | number,
    );
  }
  return model.value === effectiveValue.value;
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (Array.isArray(model.value)) {
    // multiple value
    const currentArray = model.value as Array<string | number>;
    const newValue = [...currentArray];
    const valueToToggle = effectiveValue.value as string | number;

    if (target.checked) {
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
    // singlle value
    model.value = (target.checked ? effectiveValue.value : false) as T;
  }
};
</script>

<template>
  <span
    class="checkbox"
    :class="[
      getModifierClasses('checkbox', props.state),
      getModifierClasses('checkbox', disabled ? 'disabled' : undefined)
      ]">
    <input
      class="checkbox__input"
      type="checkbox"
      v-bind="props.inputAttributes"
      :id="props.id"
      :disabled="disabled"
      :checked="isChecked"
      :value="effectiveValue"
      @change="handleChange" />
    <slot></slot>
  </span>
</template>

<style lang="scss">
.checkbox {
  --_gymx-checkbox-input-size: var(--gymx-checkbox-input-size, var(--gymx-size-1));
  --_gymx-checkbox-input-accent-color: var(--gymx-checkbox-input-accent-color, var(--gymx-color-accent));
  --_gymx-checkbox-input-outline-color: var(--gymx-checkbox-input-outline-color, var(--gymx-color-accent));

  &:has(:focus) {
    --gymx-checkbox-input-outline-color: currentColor;
  }

  &--disabled, &:has([disabled]) {
    --gymx-checkbox-input-accent-color: var(--gymx-checkbox-input-accent-color-disabled, var(--gymx-color-gray-10));
  }

  &__input {
    accent-color: var(--_gymx-checkbox-input-accent-color);
    inline-size: var(--_gymx-checkbox-input-size);
    aspect-ratio: 1;
    outline-color: var(--_gymx-checkbox-input-outline-color);
  }
}
</style>
