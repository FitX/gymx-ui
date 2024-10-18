
<script lang="ts" setup generic="T extends object">
import {
  type GymxSelectOption,
  type GymxSelectFieldProps,
  type GymxSelectFieldSlots,
} from './types';
import {   GymxErrorMessage,
  GymxLabel,} from '@/components'
import { computed, defineModel } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';
// import { useSlots } from 'vue';

defineSlots<GymxSelectFieldSlots>();

const props = withDefaults(defineProps<GymxSelectFieldProps<T>>(), {
  id: crypto.randomUUID(),
});

const disabled = computed(() => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled));

// const slots = useSlots();
const modelValue = defineModel<GymxSelectOption<T>>();
</script>
<template>
  <div
    class="input-field"
    :class="[
      getModifierClasses('input-field', props.state),
      getModifierClasses('input-field', disabled ? 'disabled' : undefined),
    ]">
    <gymx-label
      :for="props.id"
      :text="props.label" class="input-field__label" />
    <!--<span class="input__start">
      <slot name="input-start"></slot>
    </span>
    <span class="input__end">
      <slot name="input-end"></slot>
    </span>-->
    <select
      :id="props.id"
      v-bind="props.inputAttributes"
      class="input-field__input"
      v-model="modelValue">
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option">
        {{ option.text }}
      </option>
    </select>
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
