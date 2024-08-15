<script lang="ts" setup>
import type { GymxButtonProps } from './types';
import type { UIState } from '@/types';
import { FancyIcon } from '@/components/icons/index';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  isActive: false,
  state: undefined as UIState | undefined,
});
</script>
<template>
  <component
    :is="props.tag"
    class="btn">
    <slot name="icon">
      <fancy-icon />
    </slot>
    <slot name="default"></slot>
  </component>
</template>
<style lang="scss" scoped>
.btn {
}
</style>
