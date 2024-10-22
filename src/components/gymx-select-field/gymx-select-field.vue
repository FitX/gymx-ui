<script lang="ts" setup generic="SelectItem extends GymxSelectFieldOption<SelectItem>">
import type { GymxSelectFieldOption, GymxSelectFieldProps, GymxSelectFieldSlots } from './types';
import { GymxErrorMessage, GymxLabel, GymxSelect } from '@/components';

defineEmits<{
  'update:modelValue': []
}>();
defineSlots<GymxSelectFieldSlots>();

const props = withDefaults(defineProps<GymxSelectFieldProps>(), {
  id: crypto.randomUUID(),
});

const [ modelValue ] = defineModel<SelectItem | SelectItem[]>();
</script>
<template>
  <div class="select-field">
    <gymx-label
      :for="props.id"
      :text="props.label"
      class="select-field__label" />
    <gymx-select
      :options="props.options"
      :id="props.id"
      v-model="modelValue"
      :inputAttributes="props.inputAttributes"
      :state="props.state"
      class="select-field__input"/>

    <div class="select-field__additional">
      <slot name="input-error-message">
        <gymx-error-message
          v-if="props.errorMessage"
          :text="props.errorMessage" />
      </slot>
      <slot name="input-hint">
        <span
          v-if="props.hint"
          class="select-field__hint">{{ props.hint }}</span>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select-field {
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
