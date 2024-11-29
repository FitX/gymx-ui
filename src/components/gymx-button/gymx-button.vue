<script lang="ts" setup>
import type { GymxButtonProps, GymxButtonSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';
// import type { UIState } from '@/types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  // state: undefined as UIState | undefined,
});

const loadingText = computed(() => props.loadingText ?? 'Loading');

defineSlots<GymxButtonSlots>();
</script>
<template>
  <component
    :is="props.tag"
    class="btn"
    :aria-disabled="props.isLoading"
    :aria-label="props.isLoading ? loadingText : undefined"
    :class="[
      getModifierClasses('btn', props.state),
      getModifierClasses('btn', props.isLoading ? 'is-loading' : undefined),
      getModifierClasses('btn', props.isLoading ? 'disabled' : undefined),
      getModifierClasses('btn', $slots['icon-start'] ? 'has-icon-start' : undefined),
      getModifierClasses('btn', $slots['icon-end'] ? 'has-icon-end' : undefined),
      getModifierClasses(
        'btn',
        !$slots['icon-start'] && !$slots['icon-end'] ? 'has-no-icons' : undefined,
      ),
    ]">
    <span class="btn__start">
      <template v-if="props.isLoading && !$slots['loading-end']">
        <!--
          @slot loading-start - Optional Slot
        -->
        <slot name="loading-start">
          <span class="loading-indicator" />
        </slot>
      </template>
      <!--
      @slot icon-start - Optional Slot
      -->
      <slot name="icon-start" v-else />
    </span>
    <span class="btn__content">
      <!--
    @slot default - Button Content
    -->
      <slot name="default" />
    </span>
    <span class="btn__end">
      <!--
          @slot loading-end - Optional Slot
        -->
        <slot name="loading-end" v-if="props.isLoading" />
      <!--
     @slot icon-end - Optional Slot
     -->
      <slot name="icon-end" v-else />
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
    var(--_button-color-background-hover)
  );

  --_button-color-focused: var(--button-color-focused, var(--button-color));
  --_button-color-background-focused: var(
    --button-color-background-focused,
    var(--button-color-background)
  );
  --_button-color-border-focused: var(
    --button-color-border-focused,
    var(--_button-color-background-focused)
  );

  --_button-color-disabled: var(--button-color-disabled, var(--button-color));
  --_button-color-background-disabled: var(
    --button-color-background-disabled,
    var(--button-color-background)
  );
  --_button-color-border-disabled: var(
    --button-color-border-disabled,
    var(--_button-color-background-disabled)
  );

  --_button-font-size: var(--button-font-size, var(--gymx-font-size-1));
  --_button-font-weight: var(--button-font-weight, var(--gymx-font-weight-regular));
  --_button-font-family: var(--button-font-family, var(--gymx-font-family-default));

  --_button-padding-inline: var(--button-padding-inline, 1rem);
  --_button-padding-block: var(--button-padding-block, calc(var(--_button-padding-inline) / 2));
  --_button-icon-size-start: var(--button-icon-size-start, auto);
  --_button-icon-size-end: var(--button-icon-size-end, auto);
  --_button-gap: var(--button-gap, 0.5rem);

  --_button-border: var(--button-border, 1px solid var(--_button-color-border));
  --_button-outline: var(--button-outline, 0);
  --_button-radius: var(--button-radius, 0);
  --_button-transition: var(--button-transition, background-color 200ms ease);

  --_button-internal-loading-indicator-animation-delay: 1.8s;
  --_button-loading-indicator-size: var(--button-loading-indicator-size, 1.2rem);
  --_button-loading-indicator-animation: var(--button-loading-indicator-animation, loading var(--_button-internal-loading-indicator-animation-delay) linear infinite);
  --_button-loading-indicator-color: var(--button-loading-indicator-color, currentColor);

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
  align-items: center;

  &__start {
    grid-area: start;
    display: inline-flex;
    place-content: center;

    &:not(:empty) {
      margin-inline-end: var(--_button-gap);
    }
  }

  &__end {
    grid-area: end;
    display: inline-flex;
    place-content: center;

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


.loading-indicator {
    inline-size: var(--_button-loading-indicator-size);
    aspect-ratio: 1;
    display: inline-flex;
    position: relative;
    transition: all 1s ease;

  &::after,
  &::before {
    content: '';
    border-radius: 50%;
    background: var(--_button-loading-indicator-color);
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: var(--_button-loading-indicator-animation);
  }
  &::after {
    animation-delay: calc(var(--_button-internal-loading-indicator-animation-delay) / 2);
  }
}
</style>

<style>
@keyframes loading {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(0.7);
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/*
interpolate-size: allow-keywords;
    transition: all 2s ease;
    */
</style>
