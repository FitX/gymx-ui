<script lang="ts" setup>
import { GymxTextField, GymxButton, GymxAutoSuggest } from '@/components';
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
    <div class="items">
      <div class="item">
        <gymx-auto-suggest
          label="demo"
          name="demo"
          :is-overlay="true"
          :options="[{ text: 'a', value: 'a'}, { text: 'b', value: 'b'}]"
          no-results-text="foo"
        />
      </div>
      <div class="item">
        <gymx-text-field
          v-model="firstName"
          label="Firstname"
          :error-message="errors.firstName ? 'Please enter your Firstname' : undefined"
        />
      </div>
    </div>
    <div class="items">
      <div class="item">
        <gymx-auto-suggest
          label="demo"
          name="demo"
          :is-overlay="true"
          :options="[{ text: 'a', value: 'a'}, { text: 'b', value: 'b'}]"
          no-results-text="foo">
          <template #aria-status><span class="visually-hidden">Lorem</span></template>
        </gymx-auto-suggest>
      </div>
      <div class="item">
        <gymx-text-field
          v-model="firstName"
          label="Firstname 2"
          :error-message="errors.firstName ? 'Please enter your Firstname' : undefined"
        />
      </div>
    </div>
    <div class="items">
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
    </div>
    <div class="item">
      <gymx-button class="button">Speichern</gymx-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form { width: min(60ch, 90%); }
.item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-block: 1rem;
}
.button {
  max-inline-size: max-content;
}

.items {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
  display: flex;
  gap: 1rem;

  & > * {
    flex: 1;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
