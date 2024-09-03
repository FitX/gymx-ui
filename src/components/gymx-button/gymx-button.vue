<script lang="ts" setup>
import type { GymxButtonProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
// import type { UIState } from '@/types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  // state: undefined as UIState | undefined,
});
</script>
<template>
  <component
    :is="props.tag"
    class="btn"
    :class="[
      getModifierClasses('btn', props.state),
      getModifierClasses('btn', $slots['icon-start'] ? 'has-icon-start' : undefined),
      getModifierClasses('btn', $slots['icon-end'] ? 'has-icon-end' : undefined),
      getModifierClasses(
        'btn',
        !$slots['icon-start'] && !$slots['icon-end'] ? 'has-no-icons' : undefined,
      ),
    ]">
    <span class="btn__start">
      <!--
     @slot icon-start - Optional Slot
     -->
      <slot name="icon-start" />
    </span>
    <span class="btn__content">
      <!--
    @slot default - Button Content
    -->
      <slot name="default" />
    </span>
    <span class="btn__end">
      <!--
     @slot icon-end - Optional Slot
     -->
      <slot name="icon-end" />
    </span>
  </component>
</template>
<style lang="scss" scoped>
.btn {
  $self: &;

  --_button-color: var(--button-color);
  --_button-color-background: var(--button-color-background);
  font-size: var(--button-font-size, var(--gymx-form-font-size-default), inherit);
  font-weight: var(--button-font-size, var(--gymx-form-font-weight-default));
  font-family: var(--button-font-family, var(--gymx-font-family-default)), sans-serif;
  padding-inline: var(--button-padding-inline, 1rem);
  padding-block: var(--button-padding-block, 0.5rem);

  border: var(--button-border, 1px solid var(--_button-color-background));
  outline: var(--button-outline, 0);
  border-radius: var(--button-radius, 0);
  color: var(--_button-color);
  background: var(--_button-color-background);
  box-shadow: var(--button-box-shadow);
  transition: var(--button-transition, 200ms ease background-color);

  display: grid;
  grid: 'start content end' 1fr / var(--btn-icon-size-start, auto) 1fr var(
      --btn-icon-size-end,
      auto
    );
  gap: var(--btn-gap, 0.5rem);

  &__start {
    grid-area: start;
  }

  &__content {
    grid-area: content;

    #{$self}--has-no-icons & {
      grid-column: 1 / -1;
    }

    #{$self}--has-icon-start:not(#{$self}--has-icon-end) & {
      grid-column: 2 / 4;
    }

    #{$self}--has-icon-end:not(#{$self}--has-icon-start) & {
      grid-column: 1 / 3;
    }
  }

  &__end {
    grid-area: end;
  }

  &:where(:hover, &--hover) {
    --_button-color: var(--button-color-hover, var(--button-color));
    --_button-color-background: var(
      --button-color-background-hover,
      var(--button-color-background)
    );
  }

  &:where(:focus, &--focused) {
    --_button-color: var(--button-color-focused, var(--button-color));
    --_button-color-background: var(
      --button-color-background-focused,
      var(--button-color-background)
    );
  }

  &:where(:disabled, &--disabled) {
    --_button-color: var(--button-color-disabled, var(--button-color));
    --_button-color-background: var(
      --button-color-background-disabled,
      var(--button-color-background)
    );
  }
}
</style>
