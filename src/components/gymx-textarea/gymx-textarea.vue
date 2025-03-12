
<script lang="ts" setup>
import { GymxErrorMessage, GymxLabel } from '@/components';
import type { GymxTextareaProps, GymxTextareaSlots } from '@/components/gymx-textarea/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

defineSlots<GymxTextareaSlots>()

const DEFAULT_ATTRIBUTES = {
  rows: 4,
};

const props = withDefaults(defineProps<GymxTextareaProps>(), {
  id: () => crypto.randomUUID(),
  autoGrow: true,
});

const attrs = useAttrs();
const modelValue = defineModel<string | number>({ default: '' });

const disabled = computed(
  () => props.state === 'disabled' || Boolean(props.inputAttributes?.disabled),
);

const textareaAttributes = computed(() => ({...DEFAULT_ATTRIBUTES, ...props.inputAttributes}))

const additionalClasses = computed(() => {
  const classes: string[] = [];
  if (props.state) {
    classes.push(props.state);
  }
  if (props.autoGrow) {
    classes.push('auto-grow');
  }
  return classes;
});

const listener = computed(() =>
  Object.keys(attrs)
    ?.filter((attr) => attr?.startsWith('on') && typeof attrs[attr] === 'function')
    ?.reduce((res, key) => (((res as any)[key] = attrs[key]), res), {}),
);

</script>
<template>
  <div
    class="text-area"
    :class="[...getModifierClasses('text-area', additionalClasses), $attrs.class]"
    v-bind="listener">
    <gymx-label
      :for="props.id"
      :text="props.label"
      class="text-area__label" />
    <div
      :data-replicated-value="modelValue"
      class="text-area-input"
      :class="[
        getModifierClasses('text-area-input', props.autoGrow ? 'auto-grow' : ''),
        getModifierClasses('text-area-input', props.state),
        getModifierClasses('text-area-input', disabled ? 'disabled' : undefined)]">
      <textarea class="text-area-input__input" v-bind="textareaAttributes" v-model="modelValue" :id="props.id" />
    </div>

    <div class="text-area__additional">
      <slot name="input-error-message">
        <gymx-error-message
          v-if="props.errorMessage"
          :text="props.errorMessage" />
      </slot>
      <slot name="input-hint">
        <span
          v-if="props.hint"
          class="text-area__hint"
        >{{ props.hint }}</span
        >
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/component-utils/input.scss' as input;

@include input.input-styles('text-area-input');
.text-area {
  $self: &;
  display: grid;
  gap: var(--gymx-text-area-gap, var(--gymx-size-00));
  font-size: var(--gymx-text-area-additional, var(--gymx-font-size-00));

  &__additional {
    display: grid;
    gap: var(--gymx-text-area-gap, var(--gymx-size-00));
    justify-content: space-between;
    align-items: center;
    grid-template-columns: auto auto;

    &:empty {
      display: none;
    }
  }
}

.text-area-input {
  $self: &;

  --_gymx-text-area-input-padding-block: var(--gymx-text-area-input-padding-block, calc(var(--_input-font-size) / 2));
  --_gymx-text-area-input-line-height: 1.2;
  min-block-size: var(--gymx-input-min-block-size, auto);

  &__input {
    line-height: var(--_gymx-text-area-input-line-height);
    padding-block: var(--_gymx-text-area-input-padding-block);
    block-size: 100%;
  }

  &--auto-grow {
    display: inline-grid;
    grid: 'input' minmax(0, 1fr) / auto;

    #{$self}__input {
      grid-area: input;
      resize: none;

      @supports (field-sizing: content) {
        field-sizing: content;
      }
    }

    &::after {
      /**
      Fallback Styles for auto resize
       */
      @supports not (field-sizing: content) {
        // same shared styles as native input/textarea
        // @include shared-input.input-element-styles(&);

        grid-area: input;
        /* Note the weird space! Needed to prevent jumpy behavior */
        content: attr(data-replicated-value) ' ';
        /* This is how textarea text behaves */
        white-space: pre-wrap;
        /* Hidden from view, clicks, and screen readers */
        visibility: hidden;

        line-height: var(--_gymx-text-area-input-line-height);
        padding-block: var(--_gymx-text-area-input-padding-block);
      }
    }
  }
}
</style>
