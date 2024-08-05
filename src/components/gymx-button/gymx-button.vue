
<script lang="ts" setup>

import type { GymxButtonProps } from '@/components/gymx-button/types';

const props = withDefaults(defineProps<GymxButtonProps>(), {
  tag: 'button',
  isActive: false,
  state: undefined,
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
