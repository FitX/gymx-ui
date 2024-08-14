<script lang="ts" setup>
import { IconError } from '@/components/icons';
import type { GymxErrorMessageProps } from './types';

const props = defineProps<GymxErrorMessageProps>();
</script>
<template>
  <span class="error-message">
     <!--
      @slot pre-icon - Alternate slot for icon
      -->
    <slot name="pre-icon">
        <icon-error class="error-message__icon" />
    </slot>
    <span>
      <!--
      @slot default - Alternate props.text render
      -->
      <slot name="default">
        {{ props.text }}
      </slot>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.error-message {
  --_error-message-font-size: var(--error-message-font-size, var(--gymx-font-size-0));
  --_error-message-color: var(--error-message-color, var(--gymx-color-error-text));
  --_error-message-gap: var(--error-message-gap, var(--gymx-size-00));
  --_error-message-icon-size: var(--error-message-icon-size, var(--gymx-size-2));

  font-size: var(--_error-message-font-size);
  font-weight: var(--error-message-font-weight, var(--gymx-font-weight-4));
  display: grid;
  width: 100%;
  color: var(--_error-message-color);
  grid-template-columns: var(--_error-message-icon-size) 1fr;
  grid-gap: var(--_error-message-gap);
  align-items: center;

  &__icon {
    --icon-width: var(--_error-message-icon-size);
    --icon-fill: currentColor;
    aspect-ratio: 1;
  }
}
</style>
