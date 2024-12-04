<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import type { GymxToastProps } from '@/components/gymx-toast/types';
import { getModifierClasses } from '@/utils/css-modifier';
const props = defineProps<GymxToastProps>();

const emit = defineEmits(['close']);

const { start } = useTimeoutFn(
  () => {
    emit('close');
  },
  props?.duration || 0,
  { immediate: false },
);

onMounted(() => {
  if (props.duration) {
    start();
  }
});
</script>
<template>
  <div
    class="toast"
    :role="props.type === 'error' ? 'alert' : 'status'"
    :class="getModifierClasses('toast', props.type)">
    <component
      class="toast__icon"
      :is="props.icon"
      v-if="props.icon"
      aria-hidden="true" />
    <span>
      <slot name="default">{{ props.text }}</slot>
    </span>
    <button
      class="toast__btn-close"
      :aria-label="props.closeText || 'Close'"
      @click="emit('close')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="width: var(--icon-width, 10px); height: var(--icon-height, 10px)"
        viewBox="0 0 18 18"
        aria-hidden="true">
        <path
          fill="var(--icon-fill, #181D1E)"
          d="M14.319 3.012a.974.974 0 0 0-.544.283l-4.551 4.55-4.551-4.552a.972.972 0 0 0-1.598.315l-.04.124a.974.974 0 0 0 .263.94l4.55 4.551-4.552 4.554a.972.972 0 0 0 .432 1.642l.129.024a.973.973 0 0 0 .82-.293l4.548-4.549 4.552 4.553a.972.972 0 0 0 1.642-.432l.024-.129a.974.974 0 0 0-.292-.82l-4.55-4.55 4.553-4.553a.973.973 0 0 0-.71-1.67l-.125.012Z" />
      </svg>
    </button>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/styles/component-utils/components.scss";

.toast {
  $self: &;
  // @TODO @include components.define-component-variable('gymx-toggle-switch', 'color-background', transparent);
  @include components.define-component-variable('gymx-toast', 'color-background', var(--gymx-color-gray-2));
  @include components.define-component-variable('gymx-toast', 'color', var(--gymx-color-gray-12));
  @include components.define-component-variable('gymx-toast', 'color-border', var(--_gymx-toast-color-background));

  --_gymx-toast-padding-inline: var(--gymx-toast-padding-inline, var(--gymx-size-0));
  --_gymx-toast-padding-block: var(--gymx-toast-padding-block, var(--gymx-size-00));
  --_gymx-toast-radius: var(--gymx-toast-radius, var(--gymx-radius-0));
  --_gymx-toast-icon-fill: var(--gymx-toast-icon-fill, currentColor);
  --_gymx-toast-icon-gap: var(--gymx-toast-icon-gap, var(--gymx-size-0));

  // State defaults
  --_gymx-toast-color-success: var(--gymx-toast-color-success, var(--gymx-color-black-12));
  --_gymx-toast-color-background-success: var(
    --gymx-toast-color-background-success,
    var(--gymx-color-success-9)
  );

  --_gymx-toast-color-warning: var(--gymx-toast-color-warning, var(--gymx-color-black-12));
  --_gymx-toast-color-background-warning: var(
    --gymx-toast-color-background-warning,
    var(--gymx-color-warning-9)
  );

  --_gymx-toast-color-error: var(--gymx-toast-color-error, var(--gymx-color-white-12));
  --_gymx-toast-color-background-error: var(--gymx-toast-color-background-error, var(--gymx-color-error-9));

  background: var(--_gymx-toast-color-background);
  color: var(--_gymx-toast-color);
  border: var(--_gymx-toast-color-border);
  padding-inline: var(--_gymx-toast-padding-inline);
  padding-block: var(--_gymx-toast-padding-block);
  border-radius: var(--_gymx-toast-radius);
  display: inline-flex;
  gap: var(--_gymx-toast-icon-gap);
  align-items: center;
  align-content: center;
  justify-content: space-between;

  &--success {
    @include components.override-state('gymx-toast', 'color', var(--_gymx-toast-color-success), 'modifier');
    @include components.override-state('gymx-toast', 'color-background', var(--_gymx-toast-color-background-success));
  }

  &--warning {
    @include components.override-state('gymx-toast', 'color', var(--_gymx-toast-color-warning), 'modifier');
    @include components.override-state('gymx-toast', 'color-background', var(--_gymx-toast-color-background-warning));
  }

  &--error {
    @include components.override-state('gymx-toast', 'color', var(--_gymx-toast-color-error), 'modifier');
    @include components.override-state('gymx-toast', 'color-background', var(--_gymx-toast-color-background-error), 'modifier');
  }

  &__icon {
    --icon-fill: var(--_gymx-toast-icon-fill);
  }

  :deep(#{$self}__icon) {
    --icon-fill: var(--_gymx-toast-icon-fill);
  }

  &__btn-close {
    justify-self: end;
    appearance: none;
    background: none;
    color: currentColor;
    border: none;
    padding: 0;
    display: inline-flex;
    outline-offset: 3px;

    --icon-fill: currentColor;
  }
}
</style>
