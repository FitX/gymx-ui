
<script lang="ts" setup generic="T extends object">
import {
  type GymxSelectOption,
  type GymxSelectFieldProps,
  type GymxSelectFieldSlots,
} from './types';
import {   GymxErrorMessage,
  GymxLabel,} from '@/components'
import { computed, defineModel } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';
// import { useSlots } from 'vue';

defineSlots<GymxSelectFieldSlots>();

const props = withDefaults(defineProps<GymxSelectFieldProps<T>>(), {
  id: crypto.randomUUID(),
});

const disabled = computed(() => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled));

// const slots = useSlots();
const modelValue = defineModel<GymxSelectOption<T>>();
</script>
<template>
  <div
    class="select-field"
    :class="[
      getModifierClasses('select-field', props.state),
      getModifierClasses('select-field', disabled ? 'disabled' : undefined),
    ]">
    <gymx-label
      :for="props.id"
      :text="props.label" class="select-field__label" />
    <!--<span class="input__start">
      <slot name="input-start"></slot>
    </span>
    <span class="input__end">
      <slot name="input-end"></slot>
    </span>-->
    <select
      :id="props.id"
      v-bind="props.inputAttributes"
      class="select-field__input"
      v-model="modelValue">
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option">
        {{ option.text }}
      </option>
    </select>
    <div class="select-field__additional">
      <slot name="input-error-message">
        <gymx-error-message
          v-if="props.errorMessage"
          :text="props.errorMessage" />
      </slot>
      <slot name="input-hint">
        <span
          v-if="props.hint"
          class="select-field__hint">{{ props.hint }}</span>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select-field {
  $self: &;

  --_input-font-family: var(--input-font-family, var(--gymx-font-family-default));
  --_input-font-size: var(--input-font-size, var(--gymx-font-size-2));
  --_input-font-weight: var(--input-font-letter-spacing, inherit);

  /* State defaults */
  --_input-color: var(--input-color, var(--gymx-color-text));
  --_input-color-background: var(--input-color-background, transparent);
  --_input-color-border: var(--input-color-border, currentColor);

  --_input-color-hover: var(--input-color-hover, inherit);
  --_input-color-background-hover: var(--input-color-background-hover, initial);
  --_input-color-border-hover: var(--input-color-border-hover, initial);

  --_input-color-disabled: var(--input-color-disabled, var(--gymx-color-text));
  --_input-color-background-disabled: var(--input-color-background-disabled, var(--gymx-color-black-1));
  --_input-color-border-disabled: var(--input-color-border-disabled, var(--gymx-color-black-2));

  /* Other */
  --_input-radius: var(--input-radius, 0);
  --_input-border: var(--input-border, var(--gymx-border-size-1, 1px) solid var(--_input-color-border));
  --_input-outline: var(--input-outline, var(--_input-border)); // maybe not

  --_input-padding-inline: var(--input-padding-inline, var(--gymx-size-0));
  --_input-padding-block: var(--input-padding-block, var(--gymx-size-00));
  --_input-gap: var(--input-gap, var(--_input-padding-inline));

  display: flex;
  flex-wrap: nowrap;
  place-content: stretch;
  font-family: var(--_input-font-family);
  font-size: var(--_input-font-size);
  font-weight: var(--_input-font-weight);

  color: var(--_input-color);
  background: var(--_input-color-background);
  border: var(--_input-border);
  padding-inline: var(--_input-padding-inline);
  padding-block: var(--_input-padding-block);
  border-radius: var(--_input-radius);

  outline-offset: 1px;

  &__start:not(:empty) {
    margin-inline-end: var(--_input-gap);
  }

  &__end:not(:empty) {
    margin-inline-start: var(--_input-gap);
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
    color: var(--_input-color-hover);
    background: var(--_input-color-background-hover);
    border-color: var(--_input-color-border-hover);
  }

  &:has(#{$self}__input:focus-visible),
  &--focused {
    outline: var(--_input-border);
  }

  &:is(&--disabled, [disabled]) {
    color: var(--_input-color-disabled);
    background: var(--_input-color-background-disabled);
    border-color: var(--_input-color-border-disabled);
  }
}

.select-field {
  display: grid;
  gap: var(--text-field-gap, var(--gymx-size-00));
  font-size: var(--text-field-additional, var(--gymx-font-size-00));

  &__additional {
    display: grid;
    gap: var(--text-field-gap, var(--gymx-size-00));
    justify-content: space-between;
    align-items: center;
    grid-template-columns: auto auto;
  }
}
</style>
