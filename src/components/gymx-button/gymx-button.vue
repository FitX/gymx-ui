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
:where(.btn) {
  --_button-color: var(--gymx-button-color, var(--gymx-color-on-primary));
  --_button-color-background: var(--gymx-button-color-background, var(--gymx-color-primary));
  --_button-color-border: var(--gymx-button-color-border);

  --_button-color-hover: var(--gymx-button-color-hover, var(--gymx-button-color));
  --_button-color-background-hover: var(
    --gymx-button-color-background-hover,
      oklch(from var(--gymx-button-color-background) calc(l * 1.2) c h)
  );
  --_button-color-border-hover: var(
    --gymx-button-color-border-hover,
    var(--_button-color-background-hover)
  );

  --_button-color-focused: var(--gymx-button-color-focused, var(--gymx-button-color));
  --_button-color-background-focused: var(
    --gymx-button-color-background-focused,
      oklch(from var(--gymx-button-color-background) calc(l * 1.3) c h)
  );
  --_button-color-border-focused: var(
    --gymx-button-color-border-focused,
    var(--_button-color-background-focused)
  );

  --_button-color-disabled: var(--gymx-button-color-disabled, var(--gymx-button-color));
  --_button-color-background-disabled: var(
    --gymx-button-color-background-disabled,
      oklch(from var(--gymx-button-color-background) l calc(c * 0.1) h)
  );
  --_button-color-border-disabled: var(
    --gymx-button-color-border-disabled,
    var(--_button-color-background-disabled)
  );

  --_button-font-size: var(--gymx-button-font-size, var(--gymx-font-size-1));
  --_button-font-weight: var(--gymx-button-font-weight, var(--gymx-font-weight-regular));
  --_button-font-family: var(--gymx-button-font-family, var(--gymx-font-family-default));

  --_button-padding-inline: var(--gymx-button-padding-inline, 1rem);
  --_button-padding-block: var(--gymx-button-padding-block, calc(var(--_button-padding-inline) / 2));
  --_button-icon-size-start: var(--gymx-button-icon-size-start, auto);
  --_button-icon-size-end: var(--gymx-button-icon-size-end, auto);
  --_button-gap: var(--gymx-button-gap, 0.5rem);

  --_button-border: var(--gymx-button-border, 1px solid var(--_button-color-border));
  --_button-outline: var(--gymx-button-outline, 0);
  --_button-radius: var(--gymx-button-radius, 0);
  --_button-transition: var(--gymx-button-transition, 200ms ease background-color);

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
  box-shadow: var(--gymx-button-box-shadow);
  transition: var(--_button-transition);

  display: inline-grid;
  grid: 'start content end' 1fr / var(--_button-icon-size-start) 1fr var(--_button-icon-size-end);

  :where(.btn__start) {
    grid-area: start;

    &:not(:empty) {
      margin-inline-end: var(--_button-gap);
    }
  }

  :where(.btn__end) {
    grid-area: end;
    &:not(:empty) {
      margin-inline-start: var(--_button-gap);
    }
  }

  &:where(:hover, .btn--hover) {
    --_button-color: var(--_button-color-hover);
    --_button-color-background: var(--_button-color-background-hover);
    --_button-color-border: var(--_button-color-border-hover);
  }

  &:where(:focus, .btn--focused) {
    --_button-color: var(--_button-color-focused);
    --_button-color-background: var(--_button-color-background-focused);
    --_button-color-border: var(--_button-color-border-focused);
  }

  &:where(:focus-visible) {
    --gymx-button-outline: 1px solid var(--gymx-button-color-background-focused);
    outline-offset: 1px;
  }

  &:where(:disabled, .btn--disabled) {
    --_button-color: var(--_button-color-disabled);
    --_button-color-background: var(--_button-color-background-disabled);
    --_button-color-border: var(--_button-color-border-disabled);
  }
}
</style>
