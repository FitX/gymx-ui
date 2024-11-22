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
:where(.link) {
  --_link-color: var(--gymx-link-color, var(--gymx-color-accent));
  --_link-color-background: var(--gymx-link-color-background);
  --_link-color-border: var(--gymx-link-color-border, var(--gymx-link-color-background));

  --_link-color-hover: var(--gymx-link-color-hover, var(--gymx-link-color));
  --_link-color-background-hover: var(--gymx-link-color-background-hover, var(--gymx-link-color-background));
  --_link-color-border-hover: var(--gymx-link-color-border-hover, var(--gymx-link-border-background));

  --_link-color-focused: var(--gymx-link-color-focused, var(--gymx-link-color));
  --_link-color-background-focused: var(
    --gymx-link-color-background-focused,
    var(--gymx-link-color-background)
  );
  --_link-color-border-focused: var(--gymx-link-color-border-focused, var(--gymx-link-border-background));

  --_link-color-disabled: var(--gymx-link-color-disabled, var(--gymx-link-color));
  --_link-color-background-disabled: var(
    --gymx-link-color-background-disabled,
    var(--gymx-link-color-background)
  );
  --_link-color-border-disabled: var(--gymx-link-color-border-disabled, var(--gymx-link-border-background));

  --_link-font-weight: var(--gymx-link-font-weight, var(--gymx-font-weight-regular));
  --_link-font-family: var(--gymx-link-font-family, var(--gymx-font-family-default), inherit);
  --_link-font-size: var(--gymx-link-font-size, var(--gymx-font-family-default), inherit);
  --_link-line-height: var(--gymx-link-font-size, 1.15);

  --_link-padding-inline: var(--gymx-link-padding-inline, 0);
  --_link-padding-block: var(--gymx-link-padding-block, 0);
  --_link-icon-size-start: var(--gymx-link-icon-size-start, auto);
  --_link-icon-size-end: var(--gymx-link-icon-size-end, auto);
  --_link-gap: var(--gymx-link-gap, 0.5rem);

  --_link-border: var(--gymx-link-border, 1px solid var(--_link-color-border));
  --_link-outline: var(--gymx-link-outline, 0);
  --_link-radius: var(--gymx-link-radius, 0);
  --_link-transition: var(--gymx-link-transition, 200ms ease background-color);
  --_link-text-decoration: var(--gymx-link-text-decoration, underline);
  --_link-box-shadow: var(--gymx-link-box-shadow);

  /**
  Button Reset
   */
  all: unset;
  align-items: baseline;

  font-size: var(--_link-font-size);
  line-height: var(--_link-line-height);
  font-weight: var(--_link-font-weight);
  font-family: var(--_link-font-family, inherit);
  padding-inline: var(--_link-padding-inline);
  padding-block: var(--_link-padding-block);

  border: var(--_link-border);
  outline: var(--_link-outline);
  border-radius: var(--_link-radius);
  color: var(--_link-color);
  background: var(--_link-color-background);
  box-shadow: var(--_link-box-shadow);
  transition: var(--_link-transition);
  text-decoration: none;

  display: inline-grid;
  grid: 'start content end' 1fr / var(--_link-icon-size-start) 1fr var(--_link-icon-size-end);

  .link__content {
    text-decoration: var(--_link-text-decoration);
  }

  .link__start {
    grid-area: start;
    align-self: center;

    &:not(:empty) {
      padding-inline-end: var(--_link-gap);
    }
  }

  .link__end {
    grid-area: end;
    align-self: center;
    &:not(:empty) {
      padding-inline-start: var(--_link-gap);
    }
  }

  &:where(:hover, .link--hover) {
    --_link-color: var(--_link-color-hover);
    --_link-color-background: var(--_link-color-background-hover);
    --_link-color-border: var(--_link-color-border-hover);
  }

  &:where(:focus, .link--focused) {
    --_link-color: var(--_link-color-focused);
    --_link-color-background: var(--_link-color-background-focused);
    --_link-color-border: var(--_link-color-border-focused);
  }
}
</style>
