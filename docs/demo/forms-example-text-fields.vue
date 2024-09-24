<script lang="ts" setup>
import { GymxTextField, GymxButton } from '@/components';
import { ref } from 'vue';

const firstName = ref<string>();
const lastName = ref<string>();
const dateOfBirth = ref<string>();

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
      <gymx-text-field
        v-model="firstName"
        label="Firstname"
        :error-message="errors.firstName ? 'Please enter your Firstname' : undefined"
      />
    </div>
    <div class="item">
      <gymx-text-field
        v-model="lastName"
        label="Lastname"
      />
    </div>
    <div class="item">
      <gymx-text-field
        v-model="dateOfBirth"
        type="date"
        label="Date of Birth"
      />
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
