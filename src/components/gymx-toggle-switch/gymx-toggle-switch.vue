
<script lang="ts" setup>
import { computed } from 'vue';
import type { GymxToggleSwitchProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { GymxLabel } from '@/components';


const props = defineProps<GymxToggleSwitchProps>();
const modelValue = defineModel<boolean>();
const componentClasses = computed(() => getModifierClasses('toggle-switch', [
  modelValue.value ? 'on' : 'off',
  props.state
]))
</script>
<template>
  <label
    class="toggle-switch"
    :class="componentClasses">
    <!--<span class="toggle-switch__label">{{ props.label }}</span>-->
    <gymx-label
      class="toggle-switch__label"
      tag="span"
      :state="props.state">{{ props.label }}</gymx-label>
    <input
      class="toggle-switch__input"
      :disabled="props.state === 'disabled'"
      type="checkbox"
      role="switch"
      v-model="modelValue" />
    <span class="toggle-switch__track">
      <span class="toggle-switch__thumb">
        <slot name="thumb"></slot>
      </span>
    </span>
  </label>
</template>
<style lang="scss" scoped>
.toggle-switch {
  $self: &;

  --_gymx-toggle-switch-gap: var(--gymx-toggle-switch-gap, var(--gymx-size-00));

  // component colors default
  --_gymx-toggle-switch-color-background-inactive: var(--gymx-toggle-switch-color-background-inactive, none);
  --_gymx-toggle-switch-color-background-active: var(--gymx-toggle-switch-color-background-active, none); // maybe 5
  --_gymx-toggle-switch-color-background:
    var(--gymx-toggle-switch-state-color-background,
      var(--gymx-toggle-switch-modifier-color-background,
        var(--gymx-toggle-switch-color-background)
      )
    );
  --_gymx-toggle-switch-color:
    var(--gymx-toggle-switch-state-color-background,
      var(--gymx-toggle-switch-modifier-color-background,
        var(--gymx-toggle-switch-color-background, currentColor)
      )
    );
  --_gymx-toggle-switch-padding-inline: var(--gymx-toggle-switch-padding-inline, 0);
  --_gymx-toggle-switch-padding-block: var(--gymx-toggle-switch-padding-block, var(--gymx-size-0));
  --_gymx-toggle-switch-inline-size: var(--gymx-toggle-switch-inline-size, auto);

  // track colors default
  --_gymx-toggle-switch-track-color-background-inactive: var(--gymx-toggle-switch-track-color-background-inactive, var(--gymx-color-gray-5));
  --_gymx-toggle-switch-track-color-background-active: var(--gymx-toggle-switch-track-color-background-active, var(--gymx-color-accent-8)); // maybe 5
  // track colors hover
  --_gymx-toggle-switch-track-color-background-hover-inactive:
    var(--gymx-toggle-switch-track-color-background-hover-inactive, var(--gymx-color-gray-5));
  --_gymx-toggle-switch-track-color-background-hover-active: var(--gymx-toggle-switch-track-color-background-hover-active, var(--gymx-color-accent-9));
  // track colors disabled
  --_gymx-toggle-switch-track-color-background-disabled-inactive:
    var(--gymx-toggle-switch-track-color-background-disabled-inactive, var(--gymx-color-gray-1));
  --_gymx-toggle-switch-track-color-background-disabled-active: var(--gymx-toggle-switch-track-color-background-disabled-active, var(--gymx-color-accent-1));

  --_gymx-toggle-switch-track-color-background:
    var(--gymx-toggle-switch-track-state-color-background,
      var(--gymx-toggle-switch-track-modifier-color-background,
        var(--gymx-toggle-switch-track-color-background)
      )
    );
  --_gymx-toggle-switch-track-inline-size: var(--gymx-toggle-switch-track-inline-size, var(--gymx-size-3));
  --_gymx-toggle-switch-track-block-size: var(--gymx-toggle-switch-track-block-size, var(--gymx-size-1));
  --_gymx-toggle-switch-track-padding-inline: var(--gymx-toggle-switch-track-padding-inline, var(--gymx-size-0000));
  --_gymx-toggle-switch-track-padding-block: var(--gymx-toggle-switch-track-padding-block, var(--gymx-size-0000));
  --_gymx-toggle-switch-track-border: var(--gymx-toggle-switch-track-border, var(--gymx-border-size-1) solid var(--gymx-color-gray-8));
  --_gymx-toggle-switch-track-radius: var(--gymx-toggle-switch-track-radius, var(--gymx-radius-round));

  // thumb colors default
  --_gymx-toggle-switch-thumb-color-background-inactive: var(--gymx-color-white-12);
  --_gymx-toggle-switch-thumb-color-background-active: var(--gymx-color-white-12);
  --_gymx-toggle-switch-thumb-color-background:
    var(--gymx-toggle-switch-thumb-state-color-background,
      var(--gymx-toggle-switch-thumb-modifier-color-background,
        var(--gymx-toggle-switch-thumb-color-background)
      )
    );
  --_gymx-toggle-switch-thumb-size: var(--gymx-toggle-switch-thumb-size, var(--gymx-size-0));
  --_gymx-toggle-switch-thumb-radius: var(--gymx-toggle-switch-thumb-radius, var(--gymx-radius-round));
  // animations
  --_gymx-toggle-switch-thumb-animation: var(--gymx-toggle-switch-thumb-animation, margin-inline-start 300ms ease, box-shadow 400ms ease-out);
  --_gymx-toggle-switch-track-animation: var(--gymx-toggle-switch-track-animation, all 300ms ease 200ms);

  // interpolate-size: allow-keywords;
  display: inline-flex;
  gap: var(--_gymx-toggle-switch-gap);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  background: var(--_gymx-toggle-switch-color-background, var(--_gymx-toggle-switch-color-background-inactive));
  color: var(--_gymx-toggle-switch-color);
  inline-size: var(--_gymx-toggle-switch-inline-size);
  padding-inline: var(--_gymx-toggle-switch-padding-inline);
  padding-block: var(--_gymx-toggle-switch-padding-block);
  user-select: none;
  cursor: pointer;

  &:focus-within:not(:active):has(:focus-visible) {
    // outline: var(--gymx-toggle-outline, 1px solid -webkit-focus-ring-color);
    --gymx-toggle-outline-fallback: var(--gymx-border-size-1) solid -webkit-focus-ring-color;
    outline: var(--gymx-toggle-outline, var(--gymx-border-size-1) solid currentColor);
    outline-offset: var(--gymx-toggle-outline-offset, 1px);
  }

  &__input {
    // opacity: 0.1;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__track {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    background: var(--_gymx-toggle-switch-track-color-background, var(--_gymx-toggle-switch-track-color-background-inactive));
    inline-size: var(--_gymx-toggle-switch-track-inline-size);
    block-size: var(--_gymx-toggle-switch-track-block-size);
    padding-inline: var(--_gymx-toggle-switch-track-padding-inline);
    padding-block: var(--_gymx-toggle-switch-track-padding-block);
    border: var(--_gymx-toggle-switch-track-border);
    border-radius: var(--_gymx-toggle-switch-track-radius);
    transition: var(--_gymx-toggle-switch-track-animation);
  }

  &__thumb {
    display: inline-flex;
    flex-wrap: nowrap;
    place-items: center;
    place-content: center;
    inline-size: var(--_gymx-toggle-switch-thumb-size);
    aspect-ratio: 1;
    border-radius: var(--_gymx-toggle-switch-thumb-radius);
    background: var(--_gymx-toggle-switch-thumb-color-background, var(--_gymx-toggle-switch-thumb-color-background-inactive));
    transition: var(--_gymx-toggle-switch-thumb-animation);

    #{$self}--off:not(#{$self}--disabled) &:hover {
      box-shadow: 0 0 2px 3px color-mix(in srgb, var(--gymx-color-gray-10), transparent 80%);
    }
  }

  &--on {
    --gymx-toggle-switch-state-color-background: var(--_gymx-toggle-switch-color-background-active);
    --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-active);
    --gymx-toggle-switch-thumb-state-color-background: var(--_gymx-toggle-switch-thumb-color-background-active);
    #{$self}__thumb {
      margin-inline-start: calc((var(--_gymx-toggle-switch-track-inline-size) - var(--_gymx-toggle-switch-thumb-size)) - (2 * var(--_gymx-toggle-switch-track-padding-inline)))
      // inline-size: 80px;
    }
  }

  &--on:is(#{$self}--hover, &:hover):not(#{$self}--disabled) {
    --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-hover-active);
  }
  &--off:is(#{$self}--hover, &:hover):not(#{$self}--disabled) {
    --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-hover-inactive);
  }

  &--disabled {
    --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-disabled-inactive);
    // opacity: 0.65;
    // filter: grayscale(1);
    cursor: not-allowed;
    &:is(#{$self}--on) {
      --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-disabled-active);
    }
  }

}
</style>
