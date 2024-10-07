
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
    <span v-if="props.icon">{{ props.icon }}</span>
    <span v-if="props.text">{{ props.text }}</span>
  </div>
</template>
<style lang="scss" scoped>
.notification {
  --_notification-color-background: var(--notification-color-background, var(--gymx-color-gray-2));
  --_notification-color: var(--notification-color, var(--gymx-color-gray-12));
  --_notification-color-border: var(--notification-color-border, var(--notification-color-background));
  --_notification-padding-inline: var(--notification-padding-inline, var(--gymx-size-0));
  --_notification-padding-block: var(--notification-padding-block, var(--gymx-size-00));
  --_notification-radius: var(--notification-radius, var(--gymx-radius-3));

  --_notification-color-success:
    var(--notification-color-success, var(--gymx-color-white-12));
  --_notification-color-background-success:
    var(--notification-color-background-success,
      light-dark(var(--gymx-color-success-text-on-light), var(--gymx-color-success-text-on-dark)));

  --_notification-color-warning:
    var(--notification-color-warning, var(--gymx-color-white-12));
  --_notification-color-background-warning:
    var(--notification-color-background-warning,
      light-dark(var(--gymx-color-warning-text-on-light), var(--gymx-color-warning-text-on-dark)));

  --_notification-color-error:
    var(--notification-color-error, var(--gymx-color-white-12));
  --_notification-color-background-error:
    var(--notification-color-background-error,
      light-dark(var(--gymx-color-error-text-on-light), var(--gymx-color-error-text-on-dark)));

  --_notification-color-info:
    var(--notification-color-success, var(--gymx-color-accent-12));
  --_notification-color-background-info:
    var(--notification-color-background-info, var(--gymx-color-accent-2));

  background: var(--_notification-color-background);
  color: var(--_notification-color);
  border: var(--_notification-color-border);
  padding-inline: var(--_notification-padding-inline);
  padding-block: var(--_notification-padding-block);
  border-radius: var(--_notification-radius);
  display: inline-flex;

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

  &--info {
    --notification-color: var(--_notification-color-info);
    --notification-color-background: var(--_notification-color-background-info);
  }
}
</style>
