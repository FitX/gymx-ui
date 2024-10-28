<script lang="ts" setup>
import { GymxDialog, GymxButton } from '@/components';
import { ref } from 'vue';

const isOpen = ref(false);
const isModal = ref(true);
const closeOnOutsideClick = ref(false);
const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};
</script>
<template>
  <section class="demo-wrapper">
    <h1>Dialog {{ isOpen ? 'opened' : 'closed' }}</h1>
    <div class="nav">
      <gymx-button @click="openDialog()">Open Dialog</gymx-button>
      <gymx-button @click="closeDialog()">Close Dialog</gymx-button>
      <label for="modal">
        Modal Mode
        <input id="modal" type="checkbox" v-model="isModal">
      </label>
      <label for="outside">
        Close on Outside Click
        <input id="outside" type="checkbox" v-model="closeOnOutsideClick">
      </label>
    </div>

    <gymx-dialog
      title="Example"
      v-model="isOpen"
      :is-modal="isModal"
      :close-on-outside="closeOnOutsideClick">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    </gymx-dialog>
  </section>
</template>

<style lang="scss" scoped>
.demo-wrapper {
  height: 50vh;
}

.nav { display: flex; flex-wrap: wrap; gap: 1rem;
  align-items: center;
}
</style>
