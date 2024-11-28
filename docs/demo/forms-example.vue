<script lang="ts" setup>
import { GymxInput, GymxLabel, GymxButton, GymxErrorMessage, GymxSelect, GymxToggleSwitch } from '../../src/components';
import { ref } from 'vue';

type DemoSelectOption = {
  text: string;
  count: number;
}

const firstName = ref<string>();
const lastName = ref<string>();
const dateOfBirth = ref<string>();
const selectOptions: DemoSelectOption[] = [1, 2, 3].map((count) => ({ text: count.toString() , count, }));
const selectedOption = ref();
const activated = ref(false);

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
      <gymx-label for="firstname">Firstname <span aria-hidden="true">*</span></gymx-label>
      <gymx-input id="firstname" v-model="firstName" :input-attributes="{ 'aria-required': true, 'aria-describedby': 'firstname-error' }" />
      <span :aria-live="errors.firstName ? 'assertive' : 'off'" id="firstname-error" role="alert">
        <gymx-error-message v-if="errors.firstName" text="Please enter your Firstname"  />
      </span>
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
      <gymx-toggle-switch v-model="activated" label="Need Feedback?" />
    </div>
    <div class="item">
      <gymx-button class="button">Save</gymx-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  // max-inline-size: 60ch;
  width: min(60ch, 90%);
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
