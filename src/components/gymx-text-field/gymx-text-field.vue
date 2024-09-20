
<script lang="ts" setup>
import {
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
  </div>
</template>
<style lang="scss" scoped>
  .text-field {
    display: grid;
    gap: var(--text-field-gap, var(--gymx-size-00));
  }
</style>
