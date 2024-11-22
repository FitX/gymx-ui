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
    :class="getModifierClasses('app-content', props.layout)">
    <div class="app-content__inner">
      <slot name="default" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-content {
  // grid-area: content;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  &--centered &__inner {
    place-items: center;
    place-self: center;
  }
}
</style>
