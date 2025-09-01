<script lang="ts" setup generic="T extends string | number | boolean">
import type { GymxRadioProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

type RadioComponentProps = GymxRadioProps<T>;

const props = withDefaults(defineProps<RadioComponentProps>(), {
  inputAttributes: () => ({}),
  id: () => crypto.randomUUID(),
  state: undefined,
});

const model = defineModel<T>({ required: true });

const isChecked = computed(() => model.value === props.value);

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  model.value = (target.checked ? props.value : false) as T;
};
</script>

<template>
  <span
    class="radio"
    :class="[
      getModifierClasses('radio', props.state),
      getModifierClasses('radio', disabled ? 'disabled' : undefined),
    ]">
    <input
      class="radio__input"
      type="radio"
      v-bind="props.inputAttributes"
      :id="props.id"
      :disabled="disabled"
      :checked="isChecked"
      :value="props.value"
      @change="handleChange" />
  </span>
</template>

<style lang="scss">
.radio {
  --_gymx-radio-input-size: var(--gymx-radio-input-size, var(--gymx-size-1));
  --_gymx-radio-input-accent-color: var(
      --gymx-radio-input-accent-color,
      var(--gymx-color-accent)
  );
  --_gymx-radio-input-outline-color: var(
      --gymx-radio-input-outline-color,
      var(--gymx-color-accent)
  );

  inline-size: var(--_gymx-radio-input-size);
  aspect-ratio: 1;
  display: grid;
  place-items: center;

  &:has(:focus),
  &:hover {
    --gymx-radio-input-outline-color: currentColor;
  }

  &--disabled,
  &:has([disabled]) {
    --gymx-radio-input-accent-color: var(
        --gymx-radio-input-accent-color-disabled,
        var(--gymx-color-gray-10)
    );
  }

  &__input {
    accent-color: var(--_gymx-radio-input-accent-color);
    outline-color: var(--_gymx-radio-input-outline-color);
    place-self: stretch;
    margin: 0;
    padding: 0;
  }
}
</style>
