<script lang="ts" setup>
import type { GymxInputProps } from '@/components/gymx-input/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, onMounted, ref } from 'vue';

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

onMounted(() => {
  console.log(window.getComputedStyle(inputRef.value, '-webkit-datetime-edit').backgroundColor)
})
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
  width: 300px;
  display: inline-flex;
}

/*
Cross Browser overwrites for date / time / month / datetime-local inputs
*/
.input__input {
  align-self: center;
  display: grid; // flex works on ios, block on chrome, grid on both
  // align-content: center;
  // align-items: center;
  /**
    prevents shrinking input bug on ios
    srgb only doesnt work on mobile, because 0.01 is visible,
    so its only a fallback if color mix is not supported
   */
  background: rgba(0, 0, 0, 0.01);
  background: color-mix(
    in oklab,
  rgba(0, 0, 0, 0.01),
    transparent 99.999%
  );
  border: 0;
  padding: 0;
  border-radius: 0;

  // prevent cutting minuscule descender
  block-size: 1.2em;
  text-box: trim-both cap text;
}

.input__input::-webkit-date-and-time-value {
  text-align: left;
  line-height: 1;
}
</style>
