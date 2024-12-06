<script lang="ts" setup>
import { getModifierClasses } from '@/utils/css-modifier';
import type { GymxLabelProps } from '@/components';

const props = withDefaults(defineProps<GymxLabelProps>(), {
  for: () => crypto.randomUUID(),
  tag: 'label'
});
</script>
<template>
  <component :is="props.tag"
    class="label"
    :class="[
      getModifierClasses('label', props.state),
      getModifierClasses('label', props.error ? 'error' : undefined),
    ]"
    :for="props.tag === 'label' ? props.for : undefined">
    <!--
    @slot props.text alternative
    -->
    <slot name="default">
      {{ props.text }}
    </slot>
  </component>
</template>
<style lang="scss" scoped>
.label {
  font-size: var(--gymx-label-font-size, var(--gymx-font-size-1));
  font-weight: var(--gymx-label-font-size, var(--gymx-font-weight-regular));
  font-family: var(--gymx-label-font-family, var(--gymx-font-family-default)), sans-serif;
  padding-inline: var(--gymx-label-padding-inline);
  padding-block: var(--gymx-label-padding-block);
  border: var(--gymx-label-border, 0);
  color: var(--gymx-label-color);

  &:where(:hover, &--hover) {
    --gymx-label-color: var(--gymx-label-color-hover);
  }
}
</style>
