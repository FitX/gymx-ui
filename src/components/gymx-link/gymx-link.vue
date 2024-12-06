<script lang="ts" setup>
import type { GymxLinkProps, GymxLinkSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';

const props = withDefaults(defineProps<GymxLinkProps>(), {
  tag: 'a',
  // state: undefined as UIState | undefined,
});

defineSlots<GymxLinkSlots>();
</script>
<template>
  <component
    :is="props.tag"
    class="link"
    :class="[getModifierClasses('link', props.state)]">
    <span class="link__start">
      <!--
     @slot icon-start - Optional Slot
     -->
      <slot name="icon-start" />
    </span>
    <span class="link__content">
      <!--
    @slot default - Button Content
    -->
      <slot name="default" />
    </span>
    <span class="link__end">
      <!--
     @slot icon-end - Optional Slot
     -->
      <slot name="icon-end" />
    </span>
  </component>
</template>

<style lang="scss" scoped>
.link {
  $self: &;

  --_gymx-link-color: var(--gymx-link-color, var(--accent-color));
  --_gymx-link-color-background: var(--gymx-link-color-background);
  --_gymx-link-color-border: var(--gymx-link-color-border, var(--gymx-link-color-background));

  --_gymx-link-color-hover: var(--gymx-link-color-hover, var(--gymx-link-color));
  --_gymx-link-color-background-hover: var(--gymx-link-color-background-hover, var(--gymx-link-color-background));
  --_gymx-link-color-border-hover: var(--gymx-link-color-border-hover, var(--gymx-link-border-background));

  --_gymx-link-color-focused: var(--gymx-link-color-focused, var(--gymx-link-color));
  --_gymx-link-color-background-focused: var(
    --gymx-link-color-background-focused,
    var(--gymx-link-color-background)
  );
  --_gymx-link-color-border-focused: var(--gymx-link-color-border-focused, var(--gymx-link-border-background));

  --_gymx-link-color-disabled: var(--gymx-link-color-disabled, var(--gymx-link-color));
  --_gymx-link-color-background-disabled: var(
    --gymx-link-color-background-disabled,
    var(--gymx-link-color-background)
  );
  --_gymx-link-color-border-disabled: var(--gymx-link-color-border-disabled, var(--gymx-link-border-background));

  --_gymx-link-font-weight: var(--gymx-link-font-weight, var(--gymx-font-weight-regular));
  --_gymx-link-font-family: var(--gymx-link-font-family, var(--gymx-font-family-default), inherit);
  --_gymx-link-font-size: var(--gymx-link-font-size, var(--gymx-font-family-default), inherit);
  --_gymx-link-line-height: var(--gymx-link-font-size, 1.15);

  --_gymx-link-padding-inline: var(--gymx-link-padding-inline, 0);
  --_gymx-link-padding-block: var(--gymx-link-padding-block, 0);
  --_gymx-link-icon-size-start: var(--gymx-link-icon-size-start, auto);
  --_gymx-link-icon-size-end: var(--gymx-link-icon-size-end, auto);
  --_gymx-link-gap: var(--gymx-link-gap, 0.5rem);

  --_gymx-link-border: var(--gymx-link-border, 1px solid var(--_gymx-link-color-border));
  --_gymx-link-outline: var(--gymx-link-outline, 0);
  --_gymx-link-radius: var(--gymx-link-radius, 0);
  --_gymx-link-transition: var(--gymx-link-transition, 200ms ease background-color);
  --_gymx-link-text-decoration: var(--gymx-link-text-decoration, underline);
  --_gymx-link-box-shadow: var(--gymx-link-box-shadow);

  /**
  Button Reset
   */
  all: unset;
  align-items: baseline;

  font-size: var(--_gymx-link-font-size);
  line-height: var(--_gymx-link-line-height);
  font-weight: var(--_gymx-link-font-weight);
  font-family: var(--_gymx-link-font-family, inherit);
  padding-inline: var(--_gymx-link-padding-inline);
  padding-block: var(--_gymx-link-padding-block);

  border: var(--_gymx-link-border);
  outline: var(--_gymx-link-outline);
  border-radius: var(--_gymx-link-radius);
  color: var(--_gymx-link-color);
  background: var(--_gymx-link-color-background);
  box-shadow: var(--_gymx-link-box-shadow);
  transition: var(--_gymx-link-transition);
  text-decoration: none;

  display: inline-grid;
  grid: 'start content end' 1fr / var(--_gymx-link-icon-size-start) 1fr var(--_gymx-link-icon-size-end);

  &__content {
    text-decoration: var(--_gymx-link-text-decoration);
  }

  &__start {
    grid-area: start;
    align-self: center;

    &:not(:empty) {
      padding-inline-end: var(--_gymx-link-gap);
    }
  }

  &__end {
    grid-area: end;
    align-self: center;
    &:not(:empty) {
      padding-inline-start: var(--_gymx-link-gap);
    }
  }

  &:where(:hover, &--hover) {
    --_gymx-link-color: var(--_gymx-link-color-hover);
    --_gymx-link-color-background: var(--_gymx-link-color-background-hover);
    --_gymx-link-color-border: var(--_gymx-link-color-border-hover);
  }

  &:where(:focus, &--focused) {
    --_gymx-link-color: var(--_gymx-link-color-focused);
    --_gymx-link-color-background: var(--_gymx-link-color-background-focused);
    --_gymx-link-color-border: var(--_gymx-link-color-border-focused);
  }
}
</style>
