
<script lang="ts" setup>
import type { GymxButtonProps } from './types';
import type { UIState } from '../../types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  isActive: false,
  state: undefined as UIState | undefined,
});
</script>
<template>
  <component
    :is="props.tag"
    class="btn"></component>
</template>
<style lang="scss" scoped>
.btn {}
</style>
