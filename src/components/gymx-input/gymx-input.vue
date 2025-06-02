<script lang="ts" setup>
import type { GymxInputProps } from '@/components/gymx-input/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref } from 'vue';
import { IconEye, IconEyeClosed } from '@/components';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<GymxInputProps>(), {
  type: 'text',
  id: () => self.crypto.randomUUID(),
  showPasswordText: 'show password',
  resetTimeShowPassword: 8000,
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const modelValue = defineModel<string | number>('model-value', { default: '' });
const showPassword = defineModel<boolean>('show-password');

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const inputRef = ref<HTMLInputElement>();

let timeOutShowPassword: NodeJS.Timeout;

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;

  clearTimeout(timeOutShowPassword);
  if (props.resetTimeShowPassword) {
    timeOutShowPassword = setTimeout(() => {
      showPassword.value = false;
    }, props.resetTimeShowPassword);
  }
};

defineExpose({
  inputRef,
});
</script>
<template>
  <div
    class="input"
    :class="[
      $attrs.class,
      getModifierClasses('input', props.state),
      getModifierClasses('input', disabled ? 'disabled' : undefined),
    ]">
    <span class="input__start">
      <slot name="input-start"></slot>
    </span>
    <input
      :type="inputType"
      :id="props.id"
      v-bind="props.inputAttributes"
      ref="inputRef"
      :disabled="disabled || ($attrs.disabled ? true : false)"
      v-model="modelValue"
      class="input__input" />
    <span class="input__end">
      <slot name="input-end"></slot>
      <slot name="input-show-password" v-if="props.type === 'password'" v-bind="{ toggleShowPassword }">
        <button
          type="button"
          class="toggle-show-password"
          :aria-pressed="showPassword"
          :aria-label="props.showPasswordText"
          @click="toggleShowPassword">
          <icon-eye aria-hidden="true" v-if="!showPassword" />
          <icon-eye-closed aria-hidden="true" v-else />
        </button>
      </slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/component-utils/input.scss' as input;

@include input.input-styles('input');

.input__input::-webkit-date-and-time-value {
  text-align: left;
  // line-height: 1;
}

.toggle-show-password {
  --_input-color-show-password: var(--input-color-show-password, var(--gymx-color-gray-9));
  --_input-color-show-password-hover: var(--input-color-show-password-hover, var(--gymx-color-gray-12));
  --icon-fill: var(--_input-color-show-password);
  background: none;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  align-content: center;
  text-align: center;

  &:is(:hover, :focus-visible) {
    --icon-fill: var(--_input-color-show-password-hover);
  }
}

.input__end:has(.toggle-show-password) {
  block-size: var(--_input-block-size);
  display: inline-flex;
}
</style>
