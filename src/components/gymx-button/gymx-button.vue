<script lang="ts" setup>
import type { GymxButtonProps, GymxButtonSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
// import type { UIState } from '@/types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  // state: undefined as UIState | undefined,
});

defineSlots<GymxButtonSlots>();
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
  --_button-color-border: var(--button-color-border, var(--button-color-background));

  --_button-color-hover: var(--button-color-hover, var(--button-color));
  --_button-color-background-hover: var(
    --button-color-background-hover,
    var(--button-color-background)
  );
  --_button-color-border-hover: var(
      --button-color-border-hover,
      var(--button-border-background)
  );

  --_button-color-focused: var(--button-color-focused, var(--button-color));
  --_button-color-background-focused: var(
      --button-color-background-focused,
      var(--button-color-background)
  );
  --_button-color-border-focused: var(
      --button-color-border-focused,
      var(--button-border-background)
  );

  --_button-color-disabled: var(--button-color-disabled, var(--button-color));
  --_button-color-background-disabled: var(
      --button-color-background-disabled,
      var(--button-color-background)
  );
  --_button-color-border-disabled: var(
      --button-color-border-disabled,
      var(--button-border-background)
  );

  --_button-font-size: var(--button-font-size, var(--gymx-form-font-size-default), inherit);
  --_button-font-weight: var(--button-font-weight, var(--gymx-form-font-weight-default));
  --_button-font-family: var(--button-font-family, var(--gymx-font-family-default), sans-serif);

  --_button-padding-inline: var(--button-padding-inline, 1rem);
  --_button-padding-block: var(--button-padding-block, calc(var(--_button-padding-inline) / 2));
  --_button-icon-size-start: var(--button-icon-size-start, auto);
  --_button-icon-size-end: var(--button-icon-size-end, auto);
  --_button-gap: var(--button-gap, 0.5rem);

  --_button-border: var(--button-border, 1px solid var(--_button-color-border));
  --_button-outline: var(--button-outline, 0);
  --_button-radius: var(--button-radius, 0);
  --_button-transition: var(--button-transition, 200ms ease background-color);


  font-size: var(--_button-font-size);
  font-weight: var(--_button-font-weight);
  font-family: var(--_button-font-family);
  padding-inline: var(--_button-padding-inline);
  padding-block: var(--_button-padding-block);

  border: var(--_button-border);
  outline: var(--_button-outline);
  border-radius: var(--_button-radius);
  color: var(--_button-color);
  background: var(--_button-color-background);
  box-shadow: var(--button-box-shadow);
  transition: var(--_button-transition);

  display: inline-grid;
  grid: 'start content end' 1fr / var(--_button-icon-size-start) 1fr var(--_button-icon-size-end);

  &__start {
    grid-area: start;

    &:not(:empty) {
      margin-inline-end: var(--_button-gap);
    }
  }

  &__end {
    grid-area: end;
    &:not(:empty) {
      margin-inline-start: var(--_button-gap);
    }
  }

  &:where(:hover, &--hover) {
    --_button-color: var(--_button-color-hover);
    --_button-color-background: var(--_button-color-background-hover);
    --_button-color-border: var(--_button-color-border-hover);
  }

  &:where(:focus, &--focused) {
    --_button-color: var(--_button-color-focused);
    --_button-color-background: var(--_button-color-background-focused);
    --_button-color-border: var(--_button-color-border-focused);
  }

  &:where(:disabled, &--disabled) {
    --_button-color: var(--_button-color-disabled);
    --_button-color-background: var(--_button-color-background-disabled);
    --_button-color-border: var(--_button-color-border-disabled);
  }
}
</style>
