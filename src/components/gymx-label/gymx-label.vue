<script lang="ts" setup>
import { getModifierClasses } from '@/utils/css-modifier';
import type { GymxLabelProps } from '@/components';

const props = withDefaults(defineProps<GymxLabelProps>(), {
  for: crypto.randomUUID(),
});
</script>
<template>
  <label
    class="label"
    :class="[
      getModifierClasses('label', props.state),
      getModifierClasses('label', props.error ? 'error' : undefined),
    ]"
    :for="props.for">
    <!--
    @slot props.text alternative
    -->
    <slot name="default">
      {{ props.text }}
    </slot>
  </label>
</template>
<style lang="scss" scoped>
.label {
  font-size: var(--label-font-size, var(--gymx-form-font-size-default));
  font-weight: var(--label-font-size, var(--gymx-form-font-weight-default));
  font-family: var(--label-font-family, var(--gymx-font-family-default)), sans-serif;
  padding-inline: var(--label-padding-inline);
  padding-block: var(--label-padding-block);
  border: var(--label-border, 0);
  color: var(--label-color);

  &:is(:hover, &--hover) {
    --label-color: var(--label-color-hover);
  }
}
</style>
