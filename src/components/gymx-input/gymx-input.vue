<script lang="ts" setup>
import type { GymxInputProps } from '@/components/gymx-input/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<GymxInputProps>(), {
  type: 'text',
  id: crypto.randomUUID(),
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const modelValue = defineModel<string | number>({ default: '' });

const inputRef = ref<HTMLInputElement>();

defineExpose({
  inputRef,
});
</script>
<template>
  <div
    class="input"
    :class="[
      $attrs.class,
      getModifierClasses('input', props.state),
      getModifierClasses('input', disabled ? 'disabled' : undefined),
    ]">
    <span class="input__start">
      <slot name="input-start"></slot>
    </span>
    <input
      :type="props.type"
      :id="props.id"
      v-bind="props.inputAttributes"
      ref="inputRef"
      :disabled="disabled || ($attrs.disabled ? true : false)"
      v-model="modelValue"
      class="input__input" />
    <span class="input__end">
      <slot name="input-end"></slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.input {
  $self: &;

  :where(&) {
    --_gymx-input-font-family: var(--gymx-input-font-family, var(--gymx-font-family-default));
    --_gymx-input-font-size: var(--gymx-input-font-size, var(--gymx-font-size-2));
    --_gymx-input-font-weight: var(--gymx-input-font-letter-spacing, inherit);

    /* State defaults */
    --_gymx-input-color: var(--gymx-input-color, var(--gymx-color-text));
    --_gymx-input-color-background: var(--gymx-input-color-background, transparent);
    --_gymx-input-color-border: var(--gymx-input-color-border, currentColor);

    --_gymx-input-color-hover: var(--gymx-input-color-hover, inherit);
    --_gymx-input-color-background-hover: var(--gymx-input-color-background-hover, initial);
    --_gymx-input-color-border-hover: var(--gymx-input-color-border-hover, initial);

    --_gymx-input-color-disabled: var(--gymx-input-color-disabled, var(--gymx-color-text));
    --_gymx-input-color-background-disabled: var(
      --gymx-input-color-background-disabled,
      var(--gymx-color-black-1)
    );
    --_gymx-input-color-border-disabled: var(--gymx-input-color-border-disabled, var(--gymx-color-black-2));

    /* Other */
    --_gymx-input-radius: var(--gymx-input-radius, 0);
    --_gymx-input-border: var(
      --gymx-input-border,
      var(--gymx-border-size-1, 1px) solid var(--_gymx-input-color-border)
    );
    --_gymx-input-outline: var(--gymx-input-outline, var(--_gymx-input-border)); // maybe not

    --_gymx-input-padding-inline: var(--gymx-input-padding-inline, var(--gymx-size-0));
    --_gymx-input-padding-block: var(--gymx-input-padding-block, var(--gymx-size-00));
    --_gymx-input-gap: var(--gymx-input-gap, var(--_gymx-input-padding-inline));

    --gymx-input-webkit-autofill: background-color 600000s 0s, color 600000s 0s;
    --gymx-input-data-autocompleted: transparent !important;
  }

  display: flex;
  flex-wrap: nowrap;
  place-content: stretch;
  font-family: var(--_gymx-input-font-family);
  font-size: var(--_gymx-input-font-size);
  font-weight: var(--_gymx-input-font-weight);

  color: var(--_gymx-input-color);
  background: var(--_gymx-input-color-background);
  border: var(--_gymx-input-border);
  padding-inline: var(--_gymx-input-padding-inline);
  padding-block: var(--_gymx-input-padding-block);
  border-radius: var(--_gymx-input-radius);

  outline-offset: 1px;

  &__start:not(:empty) {
    margin-inline-end: var(--_gymx-input-gap);
  }

  &__end:not(:empty) {
    margin-inline-start: var(--_gymx-input-gap);
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
    &:-webkit-autofill {
      transition: var(--gymx-input-webkit-autofill);
    }
    &[data-autocompleted] {
      background-color: var(--gymx-input-data-autocompleted);
    }
  }

  &--hover,
  &:hover {
    color: var(--_gymx-input-color-hover);
    background: var(--_gymx-input-color-background-hover);
    border-color: var(--_gymx-input-color-border-hover);
  }

  &:has(#{$self}__input:focus-visible),
  &--focused {
    outline: var(--_gymx-input-border);
  }

  &:is(&--disabled, [disabled]) {
    color: var(--_gymx-input-color-disabled);
    background: var(--_gymx-input-color-background-disabled);
    border-color: var(--_gymx-input-color-border-disabled);
  }
}
</style>
