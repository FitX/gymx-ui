<script lang="ts" setup>
import {
  GymxErrorMessage,
  GymxInput,
  GymxLabel,
  type GymxTextFieldProps,
  type GymxTextFieldSlots,
} from '@/components';
import { ref, useAttrs, computed } from 'vue';
// import { useSlots } from 'vue';

defineSlots<GymxTextFieldSlots>();

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<GymxTextFieldProps>(), {
  id: () => crypto.randomUUID(),
});

// const slots = useSlots();
const modelValue = defineModel<string | number>({ default: '' });
const showPassword = defineModel<boolean>('show-password');

const inputRef = ref();
const attrs = useAttrs();

const listener = computed(() =>
  Object.keys(attrs)
    ?.filter((attr) => attr?.startsWith('on') && typeof attrs[attr] === 'function')
    ?.reduce((res, key) => (((res as any)[key] = attrs[key]), res), {}),
);

defineExpose({
  inputRef,
});
</script>
<template>
  <div
    class="text-field"
    :class="$attrs.class"
    v-bind="listener">
    <gymx-label
      :for="props.id"
      :text="props.label"
      class="text-field__label" />
    <div class="text-field__input-container">
      <slot name="input">
        <gymx-input
          :ref="(el) => (inputRef = (el as any)?.inputRef)"
          :id="props.id"
          :type="props.type"
          :input-attributes="props.inputAttributes"
          v-model:show-password="showPassword"
          :reset-time-show-password="props.resetTimeShowPassword"
          :show-password-text="props.showPasswordText"
          :state="props.state"
          class="text-field__input"
          v-model="modelValue">
          <template #input-start><slot name="input-start"></slot></template>
          <template #input-end><slot name="input-end"></slot></template>
          <template
            v-if="props.type === 'password'"
            #input-show-password="{ toggleShowPassword }">
            <slot name="input-show-password" v-bind="{ toggleShowPassword }"></slot></template>
        </gymx-input>
      </slot>
      <slot name="additional-input" />
    </div>
    <div class="text-field__additional">
      <slot name="input-error-message">
        <gymx-error-message
          v-if="props.errorMessage"
          :text="props.errorMessage" />
      </slot>
      <slot name="input-hint">
        <span
          v-if="props.hint"
          class="text-field__hint"
          >{{ props.hint }}</span
        >
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.text-field {
  display: grid;
  gap: var(--gymx-text-field-gap, var(--gymx-size-00));
  font-size: var(--gymx-text-field-additional, var(--gymx-font-size-00));

  &__input-container {
    position: relative;
  }

  &__additional {
    display: grid;
    gap: var(--gymx-text-field-gap, var(--gymx-size-00));
    justify-content: space-between;
    align-items: center;
    grid-template-columns: auto auto;

    &:empty {
      display: none;
    }
  }
}
</style>
