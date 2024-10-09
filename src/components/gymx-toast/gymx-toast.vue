
<script lang="ts" setup>
import type { GymxToastProps } from '@/components/gymx-toast/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { onMounted, ref } from 'vue';
const props = defineProps<GymxToastProps>();

const emit = defineEmits(['close']);

const timeOut = ref();

onMounted(() => {
  if (props.duration) {
    timeOut.value = setTimeout(() => emit('close'), props.duration);
  }
});
</script>
<template>
  <div
    class="toast"
    :role="props.type === 'error' ? 'alert' : 'status'"
    :class="getModifierClasses('toast', props.type)"
  >
    <component class="toast__icon" :is="props.icon" v-if="props.icon" aria-hidden="true" />
    <span>
      <slot name="default">{{ props.text }}</slot>
    </span>
    <button class="toast__btn-close" :aria-label="props.closeText || 'Close'" @click="emit('close')">
      <svg xmlns="http://www.w3.org/2000/svg" style="width: var(--icon-width, 10px); height: var(--icon-height, 10px);" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="var(--icon-fill, #181D1E)" d="M14.319 3.012a.974.974 0 0 0-.544.283l-4.551 4.55-4.551-4.552a.972.972 0 0 0-1.598.315l-.04.124a.974.974 0 0 0 .263.94l4.55 4.551-4.552 4.554a.972.972 0 0 0 .432 1.642l.129.024a.973.973 0 0 0 .82-.293l4.548-4.549 4.552 4.553a.972.972 0 0 0 1.642-.432l.024-.129a.974.974 0 0 0-.292-.82l-4.55-4.55 4.553-4.553a.973.973 0 0 0-.71-1.67l-.125.012Z"/>
      </svg>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.toast {
  $self: &;
  --_-toast-color-background: var(---toast-color-background, var(--gymx-color-gray-2));
  --_-toast-color: var(---toast-color, var(--gymx-color-gray-12));
  --_-toast-color-border: var(---toast-color-border, var(---toast-color-background));
  --_-toast-padding-inline: var(---toast-padding-inline, var(--gymx-size-0));
  --_-toast-padding-block: var(---toast-padding-block, var(--gymx-size-00));
  --_-toast-radius: var(---toast-radius, var(--gymx-radius-0));
  --_-toast-icon-fill: var(---toast-icon-fill, currentColor);
  --_-toast-icon-gap: var(---toast-icon-gap, var(--gymx-size-0));

  --_-toast-color-success:
    var(---toast-color-success, var(--gymx-color-black-12));
  --_-toast-color-background-success:
    var(---toast-color-background-success, var(--gymx-color-success-9));

  --_-toast-color-warning:
    var(---toast-color-warning, var(--gymx-color-black-12));
  --_-toast-color-background-warning:
    var(---toast-color-background-warning, var(--gymx-color-warning-9));

  --_-toast-color-error:
    var(---toast-color-error, var(--gymx-color-white-12));
  --_-toast-color-background-error:
    var(---toast-color-background-error, var(--gymx-color-error-9));

  background: var(--_-toast-color-background);
  color: var(--_-toast-color);
  border: var(--_-toast-color-border);
  padding-inline: var(--_-toast-padding-inline);
  padding-block: var(--_-toast-padding-block);
  border-radius: var(--_-toast-radius);
  display: inline-flex;
  gap: var(--_-toast-icon-gap);
  align-items: center;
  align-content: center;
  justify-content: space-between;

  &--success {
    ---toast-color: var(--_-toast-color-success);
    ---toast-color-background: var(--_-toast-color-background-success);
  }

  &--warning {
    ---toast-color: var(--_-toast-color-warning);
    ---toast-color-background: var(--_-toast-color-background-warning);
  }

  &--error {
    ---toast-color: var(--_-toast-color-error);
    ---toast-color-background: var(--_-toast-color-background-error);
  }

  &__icon {
    --icon-fill: var(--_-toast-icon-fill);
  }

  :deep(#{$self}__icon) {
    --icon-fill: var(--_-toast-icon-fill);
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
