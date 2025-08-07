<script lang="ts" setup generic="T extends keyof HTMLElementTagNameMap = 'span'">
import { type GymxBadgeProps } from './types';
import { computed } from 'vue';

type Props = GymxBadgeProps<T>;
const props = defineProps<Props>();
const tag = computed(() => props.tag ?? 'span');
</script>
<template>
  <component :is="tag" class="badge">
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>
<style lang="scss" scoped>
.badge {
  --_badge-font-size: var(--badge-font-size, var(--gymx-font-size-1));
  --_badge-color-background: var(--badge-color-background, var(--gymx-color-gray-2));
  --_badge-color-text: var(--badge-color-text, var(--gymx-color-gray-12));
  --_badge-radius: var(--badge-radius, var(--radius-2));
  --_badge-padding-inline: var(--badge-padding-inline, var(--gymx-size-0));
  --_badge-padding-block: var(--badge-padding-block, var(--gymx-size-000));

  &:is(button) {
    border: unset;
  }

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
