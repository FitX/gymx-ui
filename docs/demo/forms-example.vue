<script lang="ts" setup>
import { GymxInput, GymxLabel, GymxButton, GymxErrorMessage, GymxSelect } from '../../src/components';
import { ref } from 'vue';

const firstName = ref<string>();
const lastName = ref<string>();
const dateOfBirth = ref<string>();
const selectOptions = [1, 2, 3].map((count) => ({ text: count.toString() }));
const selectedOption = ref();

const errors = ref({
  firstName: false,
});

const mayBeError = (value?: string) => !value || value?.length <= 0;

const submit = () => {
  errors.value.firstName = mayBeError(firstName.value);
};
</script>
<template>
  <form @submit.prevent="submit">
    <div class="item">
      <gymx-label for="count">Count</gymx-label>
      <gymx-select :options="selectOptions" v-model="selectedOption" id="count"/>
    </div>
    <div class="item">
      <gymx-label for="firstname">Firstname *</gymx-label>
      <gymx-input id="firstname" v-model="firstName" />
      <gymx-error-message v-if="errors.firstName" text="Please enter your Firstname" />
    </div>
    <div class="item">
      <gymx-label for="lastname">Lastname</gymx-label>
      <gymx-input id="lastname" v-model="lastName" />
    </div>
    <div class="item">
      <gymx-label for="dateOfBirth">Date of Birth</gymx-label>
      <gymx-input id="dateOfBirth" type="date" v-model="dateOfBirth" />
    </div>
    <div class="item">
      <gymx-button class="button">Speichern</gymx-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  max-inline-size: 60ch
}

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
