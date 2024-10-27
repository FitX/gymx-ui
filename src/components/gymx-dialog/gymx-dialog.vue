
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxDialogProps, GymxDialogSlots } from './types';

const props = defineProps<GymxDialogProps>();
defineSlots<GymxDialogSlots>();

const dialogEl = ref<HTMLDialogElement>();

const isOpen = ref(false);

const open = () => {
  if (true || props.isModal) {
    dialogEl.value?.showModal();
  } else {
    dialogEl.value?.show();
  }
};

const handleClickOutside = (e) => {
  console.log('ayay', e)
  if (true || props.closeOnOutside) {
    close();
  }
};

onClickOutside(dialogEl, handleClickOutside);

const close = () => {
  dialogEl.value?.close();
};

const hallo = computed(() => dialogEl.value?.open)
</script>
<template>
  <div>
    <div class="pseudo-dialog-backdrop">
      <dialog
        ref="dialogEl"
        class="dialog">
        <div class="dialog__content">
          <header class="dialog__header">
            <slot name="header">
              <h2 class="dialog__title">{{ props.title }}</h2>
              <button class="dialog__button-close">Close</button>
            </slot>
          </header>
          <div class="dialog__body">
            <slot name="content" />
          </div>
          <div class="dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </dialog>
    </div>
    <p>Dialog open {{ hallo }}</p>
    <button @click="open()">open</button>
  </div>
</template>
<style lang="scss" scoped>
.pseudo-dialog-backdrop:has(dialog[open]) {
  inset: 0;
  background: red;
  position: fixed;
  pointer-events: none;
  opacity: 0.2;
  display: contents;
}
.dialog {
  padding: 4rem;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
}
.dialog::backdrop {
  // pointer-events: none;
  // pointer-events: none;
}
</style>
