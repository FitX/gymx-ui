<script lang="ts" setup>
import type { GymxInputProps } from '@/components/gymx-input/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<GymxInputProps>(), {
  type: 'text',
  id: () => self.crypto.randomUUID(),
});

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const modelValue = defineModel<string | number>({ default: '' });

const inputRef = ref<HTMLInputElement>();

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
      :type="props.type"
      :id="props.id"
      v-bind="props.inputAttributes"
      ref="inputRef"
      :disabled="disabled || ($attrs.disabled ? true : false)"
      v-model="modelValue"
      class="input__input" />
    <span class="input__end">
      <slot name="input-end"></slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/component-utils/input.scss' as input;

@include input.input-styles('input');
.input {
  // min-block-size: calc(var(--_input-font-size) * 1.4);
  // min-height: 60px !important;
  // line-height: var(--_input-font-size) !important;
  // vertical-align: middle;
}
.input__input {
  align-self: center;
  display: flex;
  align-content: center;
  align-items: start;
  background: rgba(0, 0, 0, 0.01); // @TODO maybe srgb mix function with background custom porperty
  background: color-mix(
      in oklab,
      rgba(0, 0, 0, 0.01),
      transparent 99.999%
  );
  // background: #6f57ff;
  border: 0;
  padding: 0;
  border-radius: 0;
  // block-size: 1.2lh;
  block-size: 1.2em;
  // line-height: var(--_input-font-size) !important;
  // vertical-align: top;
  // min-block-size: calc(var(--_input-font-size) * 1.4); // maybe calc ?
  // min-block-size: 1rlh;
  // line-height: 1.4;
  text-box: trim-both cap text;
}
.input__input:is([type='date'], [type='time'], [type='datetime-local'], [type='month'], [type='week']) {
  // background: red;
}
.input__input::-webkit-date-and-time-value {
  text-align: left;
  // background: blue;
}
/*
.input__input::-webkit-datetime-edit-text {
  display: block;
  padding: 0;
  margin: 0;
  font-size: 16px !important;
  background: red !important;
  padding: 0 !important;
  margin: 0 !important;
  padding-inline: 0 !important;
  padding-block: 0 !important;
  margin-inline: 0 !important;
  margin-block: 0 !important;
}*/
</style>
