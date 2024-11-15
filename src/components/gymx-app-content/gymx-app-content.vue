
<script lang="ts" setup>
import type { GymxAppContentProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';

const props = withDefaults(defineProps<GymxAppContentProps>(), {
  layout: 'default',
});
</script>
<template>
  <div
    class="app-content"
    :class="getModifierClasses('app-content', props.layout)"
  >
    <div class="app-content__inner">
      <slot name="default" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-content {
  display: grid;

  &--centered {
    place-content: center;
  }
}
</style>
