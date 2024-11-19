<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxDialogProps, GymxDialogSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { IconClose } from '@/components/icons';

const props = defineProps<GymxDialogProps>();
const emit = defineEmits(['update:modelValue', 'opened', 'closed']);
defineSlots<GymxDialogSlots>();

const dialogEl = ref<HTMLDialogElement>();

const isOpen = defineModel<boolean>();

const open = () => {
  if (props.isModal) {
    dialogEl.value?.showModal();
  } else {
    dialogEl.value?.show();
  }
  emit('opened');
};

const handleClickOutside = () => {
  if (props.closeOnOutside) {
    close();
  }
};

onClickOutside(dialogEl, handleClickOutside);

const close = () => {
  dialogEl.value?.close();
  isOpen.value = false;
  emit('closed');
};

onMounted(() => {
  watch(
    isOpen,
    (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    },
    { immediate: true },
  );
});
</script>
<template>
  <dialog
    ref="dialogEl"
    @close="close()"
    class="dialog"
    :class="getModifierClasses('dialog', props.closeOnOutside ? 'close-on-outside' : undefined)">
    <div class="dialog__content">
      <header class="dialog__header">
        <slot name="header">
          <h1 class="dialog__title">{{ props.title }}</h1>
          <button
            class="dialog__button-close"
            @click="close()"
            aria-label="Close">
            <icon-close aria-hidden="true" />
          </button>
        </slot>
      </header>
      <div class="dialog__body">
        <slot name="default" />
      </div>
      <div class="dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>
<style lang="scss">
:root {
  --dialog-layer: 100;
  --dialog-inline-size: 60ch;
  --dialog-animation-duration: 0.5s;
  --dialog-animation-in: dialog-in var(--dialog-animation-duration) ease-in-out forwards;
  --dialog-animation-out: dialog-out var(--dialog-animation-duration) ease-in-out forwards;
  --dialog-inline-padding: var(--gymx-size-0);
  --dialog-block-padding: var(--gymx-size-0);
  --dialog-border-radius: 0;
  --dialog-border: 1px solid var(--gymx-color-gray-2);
  // --dialog-shadow: 0 0 3rem 0 var(--gymx-color-gray-6);
  --dialog-shadow: var(--gymx-color-gray-6) 0px 10px 36px 0px,
    var(--gymx-color-gray-5) 0px 0px 0px 1px;
  --dialog-title-font-size: var(--gymx-font-size-3);

  @keyframes dialog-out {
    to {
      scale: 0.75;
      translate: 0 100%;
    }
  }

  @keyframes dialog-in {
    from {
      translate: 0 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.dialog {
  display: block;
  inset: 0;
  z-index: var(--dialog-layer);
  max-inline-size: min(90vw, var(--dialog-inline-size));
  max-block-size: min(80vh, 100%);
  overflow: hidden;
  transition:
    display var(--dialog-animation-duration) allow-discrete,
    overlay var(--dialog-animation-duration) allow-discrete,
    opacity var(--dialog-animation-duration);
  animation: var(--dialog-animation-out);
  animation-timing-function: cubic-bezier(0.5, -0.5, 0.1, 1.5);
  border-radius: var(--dialog-border-radius);
  padding: 0;
  border: var(--dialog-border);
  box-shadow: var(--dialog-shadow);

  &[open] {
    animation: var(--dialog-animation-in);
  }

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  :where(&__header) {
    display: flex;
    gap: var(--gymx-size-0);
    justify-content: space-between;
    align-items: center;
  }

  :where(&__header, &__body, &__footer):not(:empty) {
    padding: var(--dialog-block-padding) var(--dialog-inline-padding);
  }

  &__body *:first-child {
    margin-block-start: 0;
  }

  &__title {
    margin: 0;
    font-size: var(--dialog-title-font-size);
  }

  &--close-on-outside::backdrop {
    pointer-events: none;
  }

  :where(&__button-close) {
    justify-self: end;
    appearance: none;
    background: none;
    color: currentColor;
    border: none;
    padding: 0;
    display: inline-flex;
    outline-offset: 3px;
    align-self: start;

    --icon-fill: currentColor;
  }
}

@starting-style {
  .dialog[open] {
    opacity: 0;
    translate: 0 100%;
  }
}
</style>
