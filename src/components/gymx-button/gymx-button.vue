<script lang="ts" setup>
import type { GymxButtonProps } from './types';
// import type { UIState } from '@/types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  // state: undefined as UIState | undefined,
});
</script>
<template>
  <component
    :is="props.tag"
    class="btn">
    <!--
     @slot icon-start - Optional Slot
     -->
    <slot name="icon-start" />
    <!--
    @slot default - Button Content
    -->
    <slot name="default"></slot>
    <!--
     @slot icon-end - Optional Slot
     -->
    <slot name="icon-end" />
  </component>
</template>
<style lang="scss" scoped>
.btn {
  --_button-color: var(--button-color);
  --_button-color-background: var(--button-color-background);
  font-size: var(--button-font-size, var(--gymx-form-font-size-default));
  font-weight: var(--button-font-size, var(--gymx-form-font-weight-default));
  font-family: var(--button-font-family, var(--gymx-font-family-default)), sans-serif;
  padding-inline: var(--button-padding-inline, 1rem);
  padding-block: var(--button-padding-block, 0.5rem);

  border: var(--button-border, 1px);
  border-radius: var(--button-radius, 0);
  color: var(--_button-color);
  background: var(--_button-color-background);
  box-shadow: var(--button-box-shadow);

  &:where(:hover, &--hover) {
    --_button-color: var(--button-color-hover, var(--button-color));
    --_button-color-background: var(--button-color-background-hover, var(--button-color-background));
  }

  &:where(:focus, &--focused) {
    --_button-color: var(--button-color-focused, var(--button-color));
    --_button-color-background: var(--button-color-background-focused, var(--button-color-background));
  }

  &:where(:disabled, &--disabled) {
    --_button-color: var(--button-color-disabled, var(--button-color));
    --_button-color-background: var(--button-color-background-disabled, var(--button-color-background));
  }
}
</style>
