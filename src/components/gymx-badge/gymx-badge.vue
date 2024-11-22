<script lang="ts" setup>
import { type GymxBadgeProps } from './types';

const props = defineProps<GymxBadgeProps>();
</script>
<template>
  <span class="badge">
    <slot>
      {{ props.text }}
    </slot>
  </span>
</template>
<style lang="scss">
</style>
<style lang="scss" scoped>
:where(.badge) {
  --_badge-font-size: var(--gymx-badge-font-size, var(--gymx-font-size-1));
  --_badge-color-background: var(--gymx-badge-color-background, var(--gymx-color-gray-2));
  --_badge-color-text: var(--gymx-badge-color-text, var(--gymx-color-gray-12));
  --_badge-radius: var(--gymx-badge-radius, var(--radius-2));
  --_badge-padding-inline: var(--gymx-badge-padding-inline, var(--gymx-size-0));
  --_badge-padding-block: var(--gymx-badge-padding-block, var(--gymx-size-000));

  display: inline-flex;
  place-items: center;
  place-content: center;
  font-size: var(--_badge-font-size);
  font-weight: 400;
  color: var(--_badge-color-text);
  padding-inline: var(--_badge-padding-inline);
  padding-block: var(--_badge-padding-block);
  background: var(--_badge-color-background);
  border-radius: var(--_badge-radius);
}
</style>
