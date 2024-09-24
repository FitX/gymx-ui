
<script lang="ts" setup>
import {
  GymxErrorMessage,
  GymxInput,
  GymxLabel,
  type GymxTextFieldProps,
  type GymxTextFieldSlots
} from '@/components';
// import { useSlots } from 'vue';

defineSlots<GymxTextFieldSlots>();

const props = withDefaults(defineProps<GymxTextFieldProps>(), {
  id: crypto.randomUUID(),
});

// const slots = useSlots();
const modelValue = defineModel<string | number>({ default: '' });
</script>
<template>
  <div class="text-field">
    <gymx-label
      :for="props.id"
      :text="props.label" class="text-field__label" />
    <gymx-input
      :id="props.id"
      v-bind="props.inputAttributes"
      :state="props.state"
      class="text-field__input" v-model="modelValue">
      <!--<template v-for="slot in $slots" #[slot]>
        <slot :name="slot"></slot>
      </template>-->
      <!--<template v-for="(slotFn, slotName) in $slots" v-slot:[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>-->
      <template #input-start><slot name="input-start"></slot></template>
      <template #input-end><slot name="input-end"></slot></template>
    </gymx-input>
    <div class="text-field__additional">
      <slot name="input-error-message">
        <gymx-error-message
          v-if="props.errorMessage"
          :text="props.errorMessage" />
      </slot>
      <slot name="input-hint">
        <span
          v-if="props.hint"
          class="text-field__hint">{{ props.hint }}</span>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .text-field {
    display: grid;
    gap: var(--text-field-gap, var(--gymx-size-00));
    font-size: var(--text-field-additional, var(--gymx-font-size-00));

    &__additional {
      display: grid;
      gap: var(--text-field-gap, var(--gymx-size-00));
      justify-content: space-between;
      align-items: center;
      grid-template-columns: auto auto;
    }
  }
</style>
