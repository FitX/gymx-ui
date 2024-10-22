
<script lang="ts" setup generic="SelectItem extends GymxSelectOption<SelectItem>">
import type { GymxSelectOption, GymxSelectProps, GymxSelectSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

defineEmits<{
  'update:modelValue': []
}>();
defineSlots<GymxSelectSlots>();

const props = withDefaults(defineProps<GymxSelectProps>(), {
  id: crypto.randomUUID(),
});

const disabled = computed(() => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled))
const [ modelValue ] = defineModel<SelectItem | SelectItem[]>();
</script>
<template>
  <div
    class="select"
    :class="[
      getModifierClasses('select', props.state),
      getModifierClasses('select', disabled ? 'disabled' : undefined),
    ]">
    <!--
    <span class="select__start">
      <slot name="select-start"></slot>
    </span>
    -->
    <select
      :id="props.id"
      v-bind="props.inputAttributes"
      :disabled="disabled || ($attrs.disabled ? true : false)"
      v-model="modelValue"
      class="select__input">
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option">
        <slot name="option">
          {{ option.text }}
        </slot>
      </option>
    </select>
    <!--
    <span class="select__end">
      <slot name="select-end"></slot>
    </span>-->
  </div>
</template>
<style lang="scss" scoped>
.select {
  $self: &;

  --_select-font-family: var( --select-font-family, var(--gymx-font-family-default));
  --_select-font-size: var( --select-font-size, var(--gymx-font-size-2));
  --_select-font-weight: var( --select-font-letter-spacing, inherit);

  /* State defaults */
  --_select-color: var( --select-color, var(--gymx-color-text));
  --_select-color-background: var( --select-color-background, transparent);
  --_select-color-border: var( --select-color-border, currentColor);

  --_select-color-hover: var( --select-color-hover, inherit);
  --_select-color-background-hover: var( --select-color-background-hover, initial);
  --_select-color-border-hover: var( --select-color-border-hover, initial);

  --_select-color-disabled: var( --select-color-disabled, var(--gymx-color-text));
  --_select-color-background-disabled: var( --select-color-background-disabled, var(--gymx-color-black-1));
  --_select-color-border-disabled: var( --select-color-border-disabled, var(--gymx-color-black-2));

  /* Other */
  --_select-radius: var(--select-radius, 0);
  --_select-border: var(--select-border, var(--gymx-border-size-1, 1px) solid var(--_input-color-border, currentColor));
  --_select-outline: var(--select-outline, var(--_input-border)); // maybe not

  --_select-padding-inline: var( --select-padding-inline, var(--gymx-size-0));
  --_select-padding-block: var( --select-padding-block, var(--gymx-size-00));
  --_select-gap: var( --select-gap, var(--_input-padding-inline));

  display: flex;
  flex-wrap: nowrap;
  place-content: stretch;
  font-family: var(--_select-font-family);
  font-size: var(--_select-font-size);
  font-weight: var(--_select-font-weight);

  color: var(--_select-color);
  background: var(--_select-color-background);
  border: var(--_select-border);
  padding-inline: var(--_select-padding-inline);
  padding-block: var(--_select-padding-block);
  border-radius: var(--_select-radius);

  outline-offset: 1px;

  &__start:not(:empty) {
    margin-inline-end: var(--_select-gap);
  }

  &__end:not(:empty) {
    margin-inline-start: var(--_select-gap);
  }

  &__input {
    flex: 1;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: 0;
  }

  &--hover, &:hover {
    color: var(--_select-color-hover);
    background: var(--_select-color-background-hover);
    border-color: var(--_select-color-border-hover);
  }

  &:has(#{$self}__input:focus-visible),
  &--focused {
    outline: var(--_select-border);
  }

  &:is(&--disabled, [disabled]) {
    color: var(--_select-color-disabled);
    background: var(--_select-color-background-disabled);
    border-color: var(--_select-color-border-disabled);
  }
}
</style>
