<script
  lang="ts"
  setup
  generic="T extends string | number | ChipValue | (string | number | ChipValue)[]">
import type { ChipValue, GymxChipProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, useAttrs } from 'vue';

type ChipComponentProps = GymxChipProps<T>;

const props = defineProps<ChipComponentProps>();

const model = defineModel<T | undefined>({ required: true });
const attrs = useAttrs();

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.some((item) => {
      if (typeof item === 'object' && typeof props.value === 'object') {
        return item.value === props.value.value;
      }
      return item === props.value;
    });
  }

  if (typeof model.value === 'object' && typeof props.value === 'object') {
    return model.value.value === props.value.value;
  }
  return model.value === props.value;
});

const disabled = computed(() => props.state === 'disabled' || Boolean(attrs?.disabled));

const handleChange = () => {
  if (Array.isArray(model.value)) {
    const currentArray = [...model.value];
    const valueToToggle = props.value;

    if (isChecked.value) {
      // remove
      const index = currentArray.findIndex((item) => {
        if (typeof item === 'object' && typeof valueToToggle === 'object') {
          // @ts-expect-error ts compiler not up to date
          return (
            item !== null && Object.hasOwn(item, 'value') && item.value === valueToToggle.value
          );
        }
        return item === valueToToggle;
      });
      if (index > -1) {
        currentArray.splice(index, 1);
      }
    } else {
      // add
      currentArray.push(valueToToggle);
    }
    model.value = currentArray as T;
  } else {
    // single
    if (isChecked.value) {
      model.value = undefined;
    } else {
      model.value = props.value as T;
    }
  }
};
</script>

<template>
  <button
    class="chip"
    :class="[
      getModifierClasses('chip', props.state),
      getModifierClasses('chip', disabled ? 'disabled' : undefined),
    ]"
    :disabled="disabled"
    :aria-pressed="isChecked"
    @click="handleChange">
    <span class="chip__content">
      <slot
        name="default"
        :pressed="isChecked"
        :value="props.value">
        {{ props.value }}
      </slot>
      <span class="chip__count">
        <slot
          name="count"
          :pressed="isChecked"
          :count="props.count">
          {{ props.count }}
        </slot>
      </span>
    </span>
  </button>
</template>

<style lang="scss">
.chip {
  $self: &;

  /**
  Chip
   */
  --_chip-font-size: var(--chip-font-size, var(--gymx-font-size-1));
  --_chip-font-weight: var(--chip-font-weight, var(--gymx-font-weight-default));
  --_chip-font-family: var(--chip-font-family, inherit);

  --_chip-padding-inline: var(--chip-padding-inline, var(--gymx-size-0));
  --_chip-padding-block: var(--chip-padding-block, var(--gymx-size-000));
  --_chip-gap: var(--chip-gap, var(--gymx-size-00));

  --_chip-border: var(--chip-border, none);
  --_chip-outline: var(--chip-outline);
  --_chip-radius: var(--chip-radius, var(--gymx-radius-4));
  --_chip-transition: var(--chip-transition, background-color 200ms ease, color 200ms ease);

  --_chip-color: var(--chip-color, var(--gymx-color-gray-12));
  --_chip-color-background: var(--chip-color-background, var(--gymx-color-gray-2));

  --_chip-color-hover: var(--chip-color-hover, var(--gymx-color-white-12));
  --_chip-color-background-hover: var(
    --chip-color-background-hover,
    var(--button-color-background-hover)
  );

  --_chip-color-focused: var(--chip-color-focused, var(--_chip-color-hover));
  --_chip-color-background-focused: var(
    --chip-color-background-focused,
    var(--button-color-background-focused)
  );

  --_chip-color-pressed: var(--chip-color-pressed, var(--_chip-color-hover));
  --_chip-color-background-pressed: var(
    --chip-color-background-pressed,
    var(--button-color-background)
  );

  --_chip-color-disabled: var(--chip-color-disabled, var(--_chip-color));
  --_chip-color-background-disabled: var(
    --chip-color-background-disabled,
    var(--_chip-color-background)
  );

  /**
  Chip Count
   */
  --_chip-count-font-size: var(--chip-count-font-size, 0.625em);
  --_chip-count-padding: var(--chip-count-padding, 0.2em);
  --_chip-count-block-size: var(--chip-count-block-size, 1.125rem);

  --_chip-count-color: var(--chip-count-color, currentColor);
  // --_chip-count-color-background: var(--chip-count-color-background, rgba(red, 0.5));
  // --_chip-count-color-background: var(--chip-count-color-background, rgba(black, 0.5));
  --_chip-count-color-background: var(
    --chip-count-color-background,
    color-mix(in display-p3, var(--_chip-color-background) 85%, var(--_chip-color) 15%)
  );

  --_chip-count-color-hover: var(--chip-count-color-hover, currentColor);
  --_chip-count-color-background-hover: var(--chip-count-color-background-hover, black);

  --_chip-count-color-focused: var(--chip-count-color-focused, var(--_chip-count-color));
  --_chip-count-color-background-focused: var(
    --chip-count-color-background-focused,
    var(--_chip-count-color-background)
  );

  --_chip-count-color-pressed: var(--chip-count-color-pressed, var(--_chip-count-color-hover));
  --_chip-count-color-background-pressed: var(
    --chip-count-color-background-pressed,
    var(--_chip-count-color-background-hover)
  );

  --_chip-count-color-disabled: var(--chip-count-color-disabled, var(--_chip-count-color));
  --_chip-count-color-background-disabled: var(
    --chip-count-color-background-disabled,
    var(--_chip-count-color-background)
  );

  font-size: var(--_chip-font-size);
  font-weight: var(--_chip-font-weight);
  font-family: var(--_chip-font-family);
  color: var(--_chip-color);
  padding-inline: var(--_chip-padding-inline);
  padding-block: var(--_chip-padding-block);

  border: var(--_chip-border);
  outline: var(--_chip-outline, revert);
  outline-offset: 2px;
  border-radius: var(--_chip-radius);
  background: var(--_chip-color-background);
  transition: var(--_chip-transition);

  display: inline-grid;
  place-items: center;
  place-content: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
  min-width: max-content;
  user-select: none;
  text-align: center;

  &__content {
    display: grid;
    grid-template-columns: auto auto;
    place-items: center;
    place-content: center;
    gap: var(--_chip-gap);

    &:has(#{$self}__count:empty) {
      grid-template-columns: auto;
    }
  }

  &__count {
    display: grid;
    place-content: center;
    place-items: center;
    color: var(--_chip-count-color);
    background: var(--_chip-count-color-background);
    border-radius: 50%;
    font-size: var(--_chip-count-font-size, 0.625em);
    padding: var(--_chip-count-padding, 0.2em);

    block-size: var(--_chip-count-block-size, 1.125rem);
    aspect-ratio: 1;
    overflow: hidden;

    &:empty {
      display: none;
    }
  }

  &:where(:focus-visible, &--focused) {
    --_chip-color: var(--_chip-color-focused);
    --_chip-color-background: var(--_chip-color-background-focused);
    --_chip-count-color: var(--_chip-count-color-focused);
    --_chip-count-color-background: var(--_chip-count-color-background-focused);
  }

  &:where(:hover, &--hover) {
    --_chip-color: var(--_chip-color-hover);
    --_chip-color-background: var(--_chip-color-background-hover);
    --_chip-count-color: var(--_chip-count-color-hover);
    --_chip-count-color-background: var(--_chip-count-color-background-hover);
  }

  &:where([aria-pressed='true'], &--pressed) {
    --_chip-color: var(--_chip-color-pressed);
    --_chip-color-background: var(--_chip-color-background-pressed);
    --_chip-count-color: var(--_chip-count-color-pressed);
    --_chip-count-color-background: var(--_chip-count-color-background-pressed);
  }

  &:where(:disabled, &--disabled) {
    --_chip-color: var(--_chip-color-disabled);
    --_chip-color-background: var(--_chip-color-background-disabled);
    --_chip-count-color: var(--_chip-count-color-disabled);
    --_chip-count-color-background: var(--_chip-count-color-background-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
