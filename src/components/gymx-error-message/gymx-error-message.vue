<script lang="ts" setup>
import { IconError } from '@/components/icons';
import type { GymxErrorMessageProps } from './types';

const props = defineProps<GymxErrorMessageProps>();
</script>
<template>
  <span class="error-message">
    <!--
      @slot pre-icon -
      Alternate slot for icon, to add gap add class error-message__icon
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
  --_error-message-icon-size: var(--error-message-icon-size, var(--gymx-size-2));

  font-size: var(--error-message-font-size, var(--gymx-form-font-size-small));
  font-weight: var(--error-message-font-weight, var(--gymx-form-font-weight-default));
  border: var(--error-message-border);
  border-radius: var(--error-message-radius);
  padding: var(--error-message-padding-block) var(--error-message-padding-inline);
  background: var(--error-message-color-background);
  display: grid;
  width: 100%;
  color: var(--error-message-color, var(--gymx-color-error-text));
  grid-template-columns: var(--_error-message-icon-size) 1fr;
  grid-gap: var(--error-message-gap, var(--gymx-size-00));
  align-items: center;

  &__icon {
    --icon-width: var(--_error-message-icon-size);
    --icon-fill: currentColor;
    aspect-ratio: 1;
  }
}
</style>
