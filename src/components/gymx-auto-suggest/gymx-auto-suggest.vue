<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxAutoSuggestProps, Option } from '@/components/gymx-auto-suggest/types';
import { filter } from '@/components/gymx-auto-suggest/utils';
import { GymxTextField } from '@/components';

const props = withDefaults(defineProps<GymxAutoSuggestProps>(), {
  noResultsText: 'No results available',
  inputAttributes: () => ({
    type: 'text'
  }),
});

const optionSelectableSelectorString = '.auto-suggest__option:not(.auto-suggest__option--disabled)';

const listElement = ref<HTMLUListElement | null>(null);
const wrapperElement = ref<HTMLDivElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const isListOpen = ref(props.expanded || false);
const selectedOption = defineModel<Option | null>();

const text = ref<string | number>(selectedOption.value?.text || '');

const onInputKeyup = async (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'Enter':
    case 'Tab':
    case 'Shift':
      break;
    case 'ArrowDown':
      showList();
      /*
       Make sure the list is visible before focusing the first item
       @TODO try other solutions
       */
      await nextTick();
      listElement.value
        ?.querySelector<HTMLLIElement>(optionSelectableSelectorString)
        ?.focus();
      event.preventDefault();
      event.stopPropagation();
      break;
    default:
      showList();
  }
};

const onInputKeydown = (event: KeyboardEvent) => {
  let preventEvent = false;
  switch (event.key) {
    case 'Escape':
      hideList();
      preventEvent = true;
      break;
    case 'Tab':
      hideList();
      break;
  }
  if (preventEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const onInputClick = (event: MouseEvent) => {
  showList();
  listElement.value
    // ?.querySelector<HTMLLIElement>(`[role="option"][data-value="${model.value}"]`)
    ?.querySelector<HTMLLIElement>(`[role="option"][data-text="${(event?.target as HTMLInputElement)?.value}"]`)
    ?.scrollIntoView();
};

const handleOptionClick = (event: MouseEvent) => {;
  const optionTarget: HTMLLIElement | null = (event.target as HTMLElement).closest(optionSelectableSelectorString);
  if (!optionTarget)
    return;
  selectOption(optionTarget);
  hideList();
};

const handleListKeyDown = (event: KeyboardEvent) => {
  let preventEvent = false;
  switch (event.key) {
    case 'ArrowUp':
      // eslint-disable-next-line no-case-declarations
      let prevOptionElement = (event.target as HTMLLIElement)?.previousElementSibling as HTMLLIElement;
      while (prevOptionElement) {
        if (prevOptionElement.matches(optionSelectableSelectorString)) break;
        prevOptionElement = prevOptionElement.previousElementSibling as HTMLLIElement;
      }
      prevOptionElement?.focus();
      preventEvent = true;
      break;
    case 'ArrowDown':
      // eslint-disable-next-line no-case-declarations
      let nextOptionElement = (event.target as HTMLLIElement)?.nextElementSibling as HTMLLIElement;
      while (nextOptionElement) {
        if (nextOptionElement.matches(optionSelectableSelectorString)) break;
        nextOptionElement = nextOptionElement.nextElementSibling as HTMLLIElement;
      }
      nextOptionElement?.focus();
      preventEvent = true;
      break;
    case 'Enter':
      selectOption(event.target as HTMLLIElement);
      hideList();
      preventEvent = true;
      break;
    case 'Escape':
      hideList();
      preventEvent = true;
      break;
    case 'Tab':
      hideList();
      break;
    default:
      inputElement.value?.focus();
  }
  if (preventEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const showList = () => {
  isListOpen.value = true;
};

const hideList = (withFocus = true) => {
  if (!isListOpen.value) return;
  isListOpen.value = false;
  if (withFocus) {
    inputElement.value?.focus();
  }
};

const selectOption = (optionElement: HTMLLIElement) => {
  text.value = optionElement.dataset.text as string;
  selectedOption.value = {
    text: optionElement.dataset.text!,
    value: optionElement.dataset.value!,
  };
};

onClickOutside(wrapperElement, () => hideList(false));

const filteredList = computed(() => {
  const inputValue = text.value?.toString()?.trim()?.toLowerCase();
  if (inputValue === '') return props.options;
  if (typeof props.filterFunction === 'function') return props.filterFunction(props.options, inputValue);
  return filter(props.options, inputValue);
});
</script>

<template>
  <div class="auto-suggest" ref="wrapperElement" :data-expanded="isListOpen">
    <gymx-text-field
      :ref="(el) => inputElement = el?.inputRef"
      :label="props.label"
      v-model="text"
      :id="props.id"
      :name="props.name"
      :error-message="props.errorMessage"
      :inputAttributes="{
        type: 'text',
        autocapitalize: 'none',
        autocomplete: 'off',
        spellcheck: false,
        placeholder: props.placeholder,
        ...props.inputAttributes,
        required: props.required,
        disabled: props.disabled,
        readonly: props.readonly,
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-expanded': isListOpen,
        'aria-required': props.required,
        onKeyup: onInputKeyup,
        onKeydown: onInputKeydown,
        onMousedown: onInputClick
      }"
      class="auto-suggest__input">
      <template #input-hint>
        <slot
          name="aria-status"
          :isListOpen="isListOpen"
          :filteredOptionLength="filteredList.length">
          <div
            class="visually-hidden auto-suggest__status"
            role="status"
            aria-live="polite">
            {{ filteredList.length }} results available.
          </div>
        </slot>
      </template>
    </gymx-text-field>

    <ul
      ref="listElement"
      role="listbox"
      :aria-label="props.label"
      :hidden="!isListOpen"
      @click="handleOptionClick"
      @keydown="handleListKeyDown"
      class="auto-suggest__list">
      <li
        v-for="(option, index) in filteredList"
        :key="index"
        class="auto-suggest__option"
        :class="{ 'auto-suggest__option--disabled': option.disabled }"
        role="option"
        :tabindex="option.disabled === true ? undefined : '-1'"
        :data-text="option.text"
        :data-value="option.value"
        :aria-selected="selectedOption?.value === option.value"
        :aria-disabled="option.disabled">
        <slot
          name="option"
          :option="option"
        >{{ option.text }}</slot
        >
      </li>
      <li
        v-if="filteredList.length === 0"
        class="auto-suggest__option auto-suggest__no-results">
        <slot
          name="no-results"
          :isListOpen="isListOpen"
          :filteredOptionLength="filteredList.length">
            {{ props.noResultsText }}
        </slot>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
:root {
  --auto-suggest-border-radius: 0;
  --auto-suggest-border: 1px solid var(--gymx-color-gray-2);
  --auto-suggest-shadow: var(--gymx-color-gray-6) 0px 10px 36px 0px,
  var(--gymx-color-gray-5) 0px 0px 0px 1px;

  --auto-suggest-list-block-size: auto;
  --auto-suggest-list-inline-size: 100%;
  --auto-suggest-list-color-background: var(--gymx-color-gray-1);
  --auto-suggest-list-border: 1px solid currentColor;

  --auto-suggest-item-text-font-size: var(--gymx-font-size-1);
  --auto-suggest-item-inline-padding: var(--input-padding-inline, var(--gymx-size-0));
  --auto-suggest-item-block-padding: var(--gymx-size-00);
  --auto-suggest-item-color: inherit;
  --auto-suggest-item-color-background: none;
  --auto-suggest-item-color-focus: var(--gymx-color-accent-11);

  --auto-suggest-item-color-hover: inherit;
  --auto-suggest-item-color-background-hover: var(--gymx-color-accent-3);
}
</style>
<style lang="scss" scoped>
.auto-suggest {
  $self: &;
  position: relative;
  /* display: grid;
  grid-template-rows: auto 1fr; */

  &[data-expanded="true"] {
    :deep(.text-field__additional) {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }

  &__list {
    list-style: '';
    margin: 0;
    padding: 0;
    font-size: var(--auto-suggest-item-text-font-size);
    block-size: var(--auto-suggest-list-block-size);
    inline-size: var(--auto-suggest-list-inline-size);
    background: var(--auto-suggest-list-color-background);
    border: var(--auto-suggest-list-border);
    margin-top: -1px;
  }

  &__option {
    padding-inline: var(--auto-suggest-item-inline-padding);
    padding-block: var(--auto-suggest-item-block-padding);
    color: var(--auto-suggest-item-color);
    background: var(--auto-suggest-item-color-background);

    &:hover, &[aria-selected="true"], &:focus-visible {
      color: var(--auto-suggest-item-color-hover);
      background: var(--auto-suggest-item-color-background-hover);
      outline-color: var(--auto-suggest-item-color-focus);
      outline-offset: -1px;
    }
  }
}
</style>
