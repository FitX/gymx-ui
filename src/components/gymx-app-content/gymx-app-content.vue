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
  background: #0a3069;
  // grid-area: content;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  &--centered {
    border: 1px solid red;
  }

  &__inner {
    // grid-area: content;
    background: greenyellow;


    // width: auto;
    // margin: auto;

    // place-self: center;
    border: 2px solid blueviolet;
  }

  &--centered &__inner {
    place-items: center;
  }
}
</style>
