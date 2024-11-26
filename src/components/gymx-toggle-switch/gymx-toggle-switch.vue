
<script lang="ts" setup>
import { computed } from 'vue';
import type { GymxToggleSwitchProps } from './types.ts';
import { getModifierClasses } from '@/utils/css-modifier.ts';


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
    <span class="toggle-switch__label">{{ props.label }}</span>
    <input
      class="toggle-switch__input"
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
  --_gymx-toggle-switch-padding-inline: var(--gymx-toggle-switch-padding-inline, var(--gymx-size-00));
  --_gymx-toggle-switch-padding-block: var(--gymx-toggle-switch-padding-block, var(--gymx-size-0));
  --_gymx-toggle-switch-block-size: var(--gymx-toggle-switch-block-size, var(--gymx-size-2));

  --_gymx-toggle-switch-track-color-background-inactive: var(--gymx-toggle-switch-track-color-background-inactive, var(--gymx-color-gray-3));
  --_gymx-toggle-switch-track-color-background-active: var(--gymx-color-success-9); // maybe 5
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

  --_gymx-toggle-switch-thumb-color-background-inactive: var(--gymx-color-gray-5);
  --_gymx-toggle-switch-thumb-color-background-active: var(--gymx-color-success-5);
  --_gymx-toggle-switch-thumb-size: var(--gymx-toggle-switch-thumb-size, var(--gymx-size-0));
  --_gymx-toggle-switch-thumb-radius: var(--gymx-toggle-switch-thumb-radius, var(--gymx-radius-round));
  --_gymx-toggle-switch-thumb-color-background:
    var(--gymx-toggle-switch-thumb-state-color-background,
      var(--gymx-toggle-switch-thumb-modifier-color-background,
        var(--gymx-toggle-switch-thumb-color-background)
      )
    );
  --_gymx-toggle-switch-thumb-animation: var(--gymx-toggle-switch-thumb-animation, 300ms ease margin-inline-start);

  // interpolate-size: allow-keywords;
  display: inline-flex;
  align-items: center;

  background: var(--_gymx-toggle-switch-color-background, var(--_gymx-toggle-switch-color-background-inactive));
  color: var(--_gymx-toggle-switch-color);
  block-size: var(--_gymx-toggle-switch-block-size);
  padding-inline: var(--_gymx-toggle-switch-padding-inline);
  padding-block: var(--_gymx-toggle-switch-padding-block);
  user-select: none;

  &__input {
    opacity: 0;
    // position: absolute;
  }

  &__track {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    background: var(--_gymx-toggle-switch-track-color-background, var(--_gymx-toggle-switch-track-color-background-inactive));
    inline-size: var(--_gymx-toggle-switch-track-inline-size);
    block-size: var(--_gymx-toggle-switch-track-block-size);
    padding-inline: var(--_gymx-toggle-switch-track-padding-inline);
    padding-block: var(--_gymx-toggle-switch-track-padding-block);
    border: var(--_gymx-toggle-switch-track-border);
    border-radius: var(--_gymx-toggle-switch-track-radius);
  }

  &__thumb {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    inline-size: var(--_gymx-toggle-switch-thumb-size);
    aspect-ratio: 1;
    border-radius: var(--_gymx-toggle-switch-thumb-radius);
    background: var(--_gymx-toggle-switch-thumb-color-background, var(--_gymx-toggle-switch-thumb-color-background-inactive));
    transition: var(--_gymx-toggle-switch-thumb-animation);
  }

  &--on {
    --gymx-toggle-switch-state-color-background: var(--_gymx-toggle-switch-color-background-active);
    --gymx-toggle-switch-track-state-color-background: var(--_gymx-toggle-switch-track-color-background-active);
    --gymx-toggle-switch-thumb-state-color-background: var(--_gymx-toggle-switch-thumb-color-background-active);
    .toggle-switch__thumb {
      margin-inline-start: calc((var(--_gymx-toggle-switch-track-inline-size) - var(--_gymx-toggle-switch-thumb-size)) - (2 * var(--_gymx-toggle-switch-track-padding-inline)))
      // inline-size: 80px;
    }
  }
}
</style>
