
<script lang="ts" setup>
import type { GymxIconButtonProps, GymxIconButtonSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

const props = withDefaults(defineProps<GymxIconButtonProps>(), {
  tag: 'button',
});

const loadingText = computed(() => props.loadingText ?? 'Loading');

defineSlots<GymxIconButtonSlots>();
</script>
<template>
  <component
    :is="props.tag"
    class="icon-btn"
    :aria-disabled="props.isLoading"
    :aria-label="props.isLoading ? loadingText : props.text"
    :class="[
      getModifierClasses('icon-btn', props.state),
      getModifierClasses('icon-btn', props.isLoading ? 'is-loading' : undefined),
      getModifierClasses('icon-btn', props.isLoading ? 'disabled' : undefined),
    ]">
    <template v-if="props.isLoading">
      <!--
        @slot loading - Optional Slot
      -->
      <slot name="loading">
        <span class="loading-indicator" data-loading-indicator />
      </slot>
    </template>
    <span class="icon-btn__content">
      <!--
    @slot default - Icon Slot
    -->
    <slot name="default" />
    </span>
  </component>
</template>
<style lang="scss" scoped>
@use "@/assets/styles/component-utils/components.scss";
@use "@/assets/styles/component-utils/_buttons.scss" as buttons;

.icon-btn {
  $self: &;
  @include components.define-component-variable('gymx-icon-btn', 'size', var(--gymx-size-3));
  @include components.define-component-variable('gymx-icon-btn', 'size', var(--gymx-size-3));

  @include components.define-component-variable('gymx-icon-btn', 'color-background', transparent);
  @include components.define-component-variable('gymx-icon-btn', 'color', inherit);
  @include components.define-component-variable('gymx-icon-btn', 'padding', var(--gymx-size-000));
  @include components.define-component-variable('gymx-icon-btn', 'radius', var(--gymx-radius-round));
  @include components.define-component-variable('gymx-icon-btn', 'transition', 'background-color 0.3s, box-shadow 0.3s');
  @include components.define-component-variable('gymx-icon-btn', 'box-shadow', none);

  @include components.define-component-variable('gymx-icon-btn', 'loading-indicator-size', var(--gymx-size-1));

  --_button-internal-loading-indicator-animation-delay: 1.8s;
  --_button-loading-indicator-size: var(--_gymx-icon-btn-loading-indicator-size);
  --_button-loading-indicator-animation: var(--button-loading-indicator-animation, loading var(--_button-internal-loading-indicator-animation-delay) linear infinite);
  --_button-loading-indicator-color: var(--button-loading-indicator-color, currentColor);

  display: inline-flex;
  place-items: center;
  place-content: center;
  inline-size: var(--_gymx-icon-btn-size);
  aspect-ratio: 1;
  padding: var(--_gymx-icon-btn-padding);
  background: var(--_gymx-icon-btn-color-background);
  border: none;
  border-radius: var(--_gymx-icon-btn-radius);
  transition: var(--_gymx-icon-btn-transition);
  box-shadow: var(--_gymx-icon-btn-box-shadow);

  // overwrite via focus-visible
  outline: none;

  &__content {
    display: inline-flex;
    place-items: center;
    place-content: center;
  }

  &:hover, &--hover,
  &:focus-visible, &--focused {
    @include components.override-state('gymx-icon-btn', 'color-background', var(--gymx-icon-btn-color-background-hover, var(--gymx-color-gray-3)));
  }

  &--is-loading &__content {
    display: none;
  }

  &:deep(svg) {
    --icon-size: var(--icon-btn-icon-size, var(--gymx-size-1));
    --icon-width: var(--icon-size);
    --icon-height: var(--icon-size);
  }
}

// reuse loading indicator
@include buttons.loading-indicator();
</style>

<style lang="scss">
@use "@/assets/styles/component-utils/_buttons.scss" as buttons;
// reuse loading indicator animation
@include buttons.loading-animation();
</style>
