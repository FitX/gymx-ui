
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
    :class="[
      getModifierClasses('link', props.state)
    ]">
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

  --_link-color: var(--link-color, var(--accent-color));
  --_link-color-background: var(--link-color-background);
  --_link-color-border: var(--link-color-border, var(--link-color-background));

  --_link-color-hover: var(--link-color-hover, var(--link-color));
  --_link-color-background-hover: var(
      --link-color-background-hover,
      var(--link-color-background)
  );
  --_link-color-border-hover: var(
      --link-color-border-hover,
      var(--link-border-background)
  );

  --_link-color-focused: var(--link-color-focused, var(--link-color));
  --_link-color-background-focused: var(
      --link-color-background-focused,
      var(--link-color-background)
  );
  --_link-color-border-focused: var(
      --link-color-border-focused,
      var(--link-border-background)
  );

  --_link-color-disabled: var(--link-color-disabled, var(--link-color));
  --_link-color-background-disabled: var(
      --link-color-background-disabled,
      var(--link-color-background)
  );
  --_link-color-border-disabled: var(
      --link-color-border-disabled,
      var(--link-border-background)
  );

  --_link-font-size: var(--link-font-size, var(--gymx-form-font-size-default), inherit);
  --_link-font-weight: var(--link-font-weight, var(--gymx-form-font-weight-default));
  --_link-font-family: var(--link-font-family, var(--gymx-font-family-default), inherit);

  --_link-padding-inline: var(--link-padding-inline, 0);
  --_link-padding-block: var(--link-padding-block, 0);
  --_link-icon-size-start: var(--link-icon-size-start, auto);
  --_link-icon-size-end: var(--link-icon-size-end, auto);
  --_link-gap: var(--link-gap, 0.5rem);

  --_link-border: var(--link-border, 1px solid var(--_link-color-border));
  --_link-outline: var(--link-outline, 0);
  --_link-radius: var(--link-radius, 0);
  --_link-transition: var(--link-transition, 200ms ease background-color);
  --_link-text-decoration: var(--link-text-decoration, none);
  --_link-box-shadow: var(--link-box-shadow, 0 1px var(--_link-color));

  font-size: var(--_link-font-size);
  font-weight: var(--_link-font-weight);
  font-family: var(--_link-font-family);
  padding-inline: var(--_link-padding-inline);
  padding-block: var(--_link-padding-block);

  border: var(--_link-border);
  outline: var(--_link-outline);
  border-radius: var(--_link-radius);
  color: var(--_link-color);
  background: var(--_link-color-background);
  box-shadow: var(--_link-box-shadow);
  transition: var(--_link-transition);
  text-decoration: var(--_link-text-decoration);

  display: inline-grid;
  grid: 'start content end' 1fr / var(--_link-icon-size-start) 1fr var(--_link-icon-size-end);

  &__start {
    grid-area: start;

    &:not(:empty) {
      padding-inline-end: var(--_link-gap);
    }
  }

  &__end {
    grid-area: end;
    &:not(:empty) {
      padding-inline-start: var(--_link-gap);
    }
  }

  &:where(:hover, &--hover) {
    --_link-color: var(--_link-color-hover);
    --_link-color-background: var(--_link-color-background-hover);
    --_link-color-border: var(--_link-color-border-hover);
  }

  &:where(:focus, &--focused) {
    --_link-color: var(--_link-color-focused);
    --_link-color-background: var(--_link-color-background-focused);
    --_link-color-border: var(--_link-color-border-focused);
  }
}
</style>

