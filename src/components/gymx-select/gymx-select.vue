<script lang="ts" setup generic="SelectItem extends GymxSelectOption<SelectItem>">
import type { GymxSelectOption, GymxSelectProps, GymxSelectSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

defineEmits<{
  'update:modelValue': [];
}>();
defineSlots<GymxSelectSlots>();

const props = withDefaults(defineProps<GymxSelectProps>(), {
  id: crypto.randomUUID(),
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);
const [modelValue] = defineModel<SelectItem | SelectItem[]>();
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
    <div class="select__input-wrapper">
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
      <span class="select__end">
        <slot name="select-end" />
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select {
  $self: &;

  --_gymx-select-font-family: var(--gymx-select-font-family, var(--gymx-font-family-default));
  --_gymx-select-font-size: var(--gymx-select-font-size, var(--gymx-font-size-2));
  --_gymx-select-font-weight: var(--gymx-select-font-letter-spacing, inherit);

  /* State defaults */
  --_gymx-select-color: var(--gymx-select-color, var(--gymx-color-text));
  --_gymx-select-color-background: var(--gymx-select-color-background, transparent);
  --_gymx-select-color-border: var(--gymx-select-color-border, currentColor);

  --_gymx-select-color-hover: var(--gymx-select-color-hover, inherit);
  --_gymx-select-color-background-hover: var(--gymx-select-color-background-hover, initial);
  --_gymx-select-color-border-hover: var(--gymx-select-color-border-hover, initial);

  --_gymx-select-color-disabled: var(--gymx-select-color-disabled, var(--gymx-color-text));
  --_gymx-select-color-background-disabled: var(
    --gymx-select-color-background-disabled,
    var(--gymx-color-black-1)
  );
  --_gymx-select-color-border-disabled: var(--gymx-select-color-border-disabled, var(--gymx-color-black-2));

  /* Other */
  --_gymx-select-radius: var(--gymx-select-radius, 0);
  --_gymx-select-border: var(
    --gymx-select-border,
    var(--gymx-border-size-1, 1px) solid var(--_gymx-select-color-border, currentColor)
  );
  --_gymx-select-outline: var(--gymx-select-outline, var(--_gymx-select-border)); // maybe not

  --_gymx-select-padding-inline: var(--gymx-select-padding-inline, var(--gymx-size-0));
  --_gymx-select-padding-block: var(--gymx-select-padding-block, var(--gymx-size-00));
  --_gymx-select-gap: var(--gymx-select-gap, var(--_gymx-select-padding-inline));

  display: flex;
  flex-wrap: nowrap;
  place-content: stretch;
  font-family: var(--_gymx-select-font-family);
  font-size: var(--_gymx-select-font-size);
  font-weight: var(--_gymx-select-font-weight);

  color: var(--_gymx-select-color);
  background: var(--_gymx-select-color-background);
  border: var(--_gymx-select-border);
  padding-inline: var(--_gymx-select-padding-inline);
  padding-block: var(--_gymx-select-padding-block);
  border-radius: var(--_gymx-select-radius);

  outline-offset: 1px;

  &__start:not(:empty) {
    margin-inline-end: var(--_gymx-select-gap);
  }

  &__end:not(:empty) {
    margin-inline-start: var(--_gymx-select-gap);
  }

  &__input-wrapper {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    place-content: stretch;
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

  &--hover,
  &:hover {
    color: var(--_gymx-select-color-hover);
    background: var(--_gymx-select-color-background-hover);
    border-color: var(--_gymx-select-color-border-hover);
  }

  &:has(#{$self}__input:focus-visible),
  &--focused {
    outline: var(--_gymx-select-border);
  }

  &:is(&--disabled, [disabled]) {
    color: var(--_gymx-select-color-disabled);
    background: var(--_gymx-select-color-background-disabled);
    border-color: var(--_gymx-select-color-border-disabled);
  }
}
</style>
