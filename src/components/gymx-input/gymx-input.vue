
<script lang="ts" setup>
import type { GymxInputProps } from '@/components/gymx-input/types';

const props = withDefaults(defineProps<GymxInputProps>(), {
  type: 'text',
  id: crypto.randomUUID(),
})
</script>
<template>
  <div class="input">
    <span class="input__start">
      <slot name="input-start"></slot>
    </span>
    <input :type="props.type" :id="props.id" class="input__input" />
    <span class="input__end">
      <slot name="input-end"></slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.input {
  $self: &;

  --_input-font-family: var(--input-font-family, var(--gymx-font-family-default));
  --_input-font-size: var(--input-font-size, var(--gymx-font-size-2));
  --_input-font-weight: var(--input-font-letter-spacing, inherit);

  --_input-color: var(--input-color, inherit);
  --_input-color-background: var(--input-color-background, transparent);
  --_input-color-border: var(--input-color-border, currentColor);

  --_input-radius: var(--input-radius, 0);
  --_input-border: var(--input-border, var(--gymx-border-size-1) solid var(--_input-color-border));
  --_input-outline: var(--input-outline, var(--_input-border));

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
    outline: 0;
  }

  &:has(#{$self}__input:focus-visible) {
    outline: var(--_input-border);
    outline-offset: 1px;
  }
}
</style>
