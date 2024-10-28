
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxDialogProps, GymxDialogSlots } from './types';

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
  emit('opened')
};

const handleClickOutside = (e) => {
  // console.log('ayay', e)
  if (props.closeOnOutside) {
    close();
  }
};

// onClickOutside(dialogEl, handleClickOutside);

const close = () => {
  dialogEl.value?.close();
  // isOpen.value = false;
  // emit('update:modelValue', false)
  emit('closed');
};

onMounted(() => {
  /* watch(() => props.modelValue, (val) => {
    console.log('watch modelValue', val)
    if (val) {
      open();
    } else {
      close();
    }
    console.log('el', dialogEl.value.open)
    }, { immediate: true }); */

  watch(isOpen, (val) => {
    if (val) {
      open();
    } else {
      close();
    }
  }, { immediate: true});
});

const internalClose = () => {
  isOpen.value = false;
};
</script>
<template>
  <div>
    <div class="pseudo-dialog-backdrop">

    </div>

    <dialog
      ref="dialogEl"
      class="dialog">
      <div class="dialog__content">
        <header class="dialog__header">
          <slot name="header">
            <h2 class="dialog__title">{{ props.title }}</h2>
            <p>Lorem</p>
            <button class="dialog__button-close" @click="internalClose()">Close</button>
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
<!--
    <p>Dialog open {{ props.modelValue }}</p>
    <button @click="isOpen = !isOpen">open</button>
    <button @click="open()">open</button>-->
  </div>
</template>
<style lang="scss" scoped>
.pseudo-dialog-backdrop:has(dialog[open]) {
  /* inset: 0;
  background: red;
  position: fixed;
  pointer-events: none;
  opacity: 0.2; */
  // display: contents;
}
.dialog {
  padding: 4rem;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
}
.dialog::backdrop {
  // pointer-events: none;
  // pointer-events: none;
}
</style>
