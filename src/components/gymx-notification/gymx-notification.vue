
<script lang="ts" setup>
import type { GymxNotificationProps } from '@/components/gymx-notification/types';
import { getModifierClasses } from '@/utils/css-modifier';
const props = defineProps<GymxNotificationProps>();
</script>
<template>
  <div
    class="notification"
    :class="getModifierClasses('notification', props.type)"
  >
    <component class="notification__icon" :is="props.icon" v-if="props.icon" />

    <span v-if="props.text">{{ props.text }}</span>
  </div>
</template>
<style lang="scss" scoped>
.notification {
  $self: &;
  --_notification-color-background: var(--notification-color-background, var(--gymx-color-gray-2));
  --_notification-color: var(--notification-color, var(--gymx-color-gray-12));
  --_notification-color-border: var(--notification-color-border, var(--notification-color-background));
  --_notification-padding-inline: var(--notification-padding-inline, var(--gymx-size-0));
  --_notification-padding-block: var(--notification-padding-block, var(--gymx-size-00));
  --_notification-radius: var(--notification-radius, var(--gymx-radius-0));
  --_notification-icon-fill: var(--notification-icon-fill, currentColor);
  --_notification-icon-gap: var(--notification-icon-gap, var(--gymx-size-0));

  --_notification-color-success:
    var(--notification-color-success, var(--gymx-color-black-12));
  --_notification-color-background-success:
    var(--notification-color-background-success, var(--gymx-color-success-9));

  --_notification-color-warning:
    var(--notification-color-warning, var(--gymx-color-black-12));
  --_notification-color-background-warning:
    var(--notification-color-background-warning, var(--gymx-color-warning-9));

  --_notification-color-error:
    var(--notification-color-error, var(--gymx-color-white-12));
  --_notification-color-background-error:
    var(--notification-color-background-error, var(--gymx-color-error-9));

  background: var(--_notification-color-background);
  color: var(--_notification-color);
  border: var(--_notification-color-border);
  padding-inline: var(--_notification-padding-inline);
  padding-block: var(--_notification-padding-block);
  border-radius: var(--_notification-radius);
  display: inline-flex;
  gap: var(--_notification-icon-gap);
  align-items: center;

  &--success {
    --notification-color: var(--_notification-color-success);
    --notification-color-background: var(--_notification-color-background-success);
  }

  &--warning {
    --notification-color: var(--_notification-color-warning);
    --notification-color-background: var(--_notification-color-background-warning);
  }

  &--error {
    --notification-color: var(--_notification-color-error);
    --notification-color-background: var(--_notification-color-background-error);
  }

  &__icon {
    --icon-fill: var(--_notification-icon-fill);
  }

  :deep(#{$self}__icon) {
    --icon-fill: var(--_notification-icon-fill);
  }
}

</style>
