<script lang="ts" setup>
import { GymxInput, GymxLabel, GymxButton } from '@/components';
</script>
<template>
  <form>
    <div class="item">
      <gymx-label for="firstname">Firstname</gymx-label>
      <gymx-input id="firstname" />
    </div>
    <div class="item">
      <gymx-label for="lastname">Firstname</gymx-label>
      <gymx-input id="lastname" />
    </div>
    <div class="item">
      <gymx-label for="color">Color</gymx-label>
      <gymx-input id="lastname" type="date" />
    </div>
    <div class="item">
      <gymx-button class="button">Speichern</gymx-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form { max-inline-size: 60ch }
.item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-block: 1rem;
}
.button {
  max-inline-size: max-content;
}
</style>
