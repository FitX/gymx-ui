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

.input__input::-webkit-date-and-time-value {
  text-align: left;
  // line-height: 1;
}
</style>
