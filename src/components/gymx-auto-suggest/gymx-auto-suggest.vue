<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxAutoSuggestProps, Option } from '@/components/gymx-auto-suggest/types';
import { filter } from '@/components/gymx-auto-suggest/utils';

const props = withDefaults(defineProps<GymxAutoSuggestProps>(), {
  noResultsText: 'No results available',
});

// [role="option"]:not([aria-disabled="true"])
const optionSelectableSelectorString = '.auto-suggest__option:not(.auto-suggest__option--disabled)';

const listElement = ref<HTMLUListElement | null>(null);
const wrapperElement = ref<HTMLDivElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const isListOpen = ref(props.expanded || false);
const selectedOption = defineModel<Option | null>();

const text = ref<string | number>(selectedOption.value?.text || '');
// const selectedOption = ref<Option | null>();

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
    ?.querySelector<HTMLLIElement>(`[role="option"][data-text="${event?.target?.value}"]`)
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

const hideList = () => {
  if (!isListOpen.value) return;
  isListOpen.value = false;
  inputElement.value?.focus();
};

const selectOption = (optionElement: HTMLLIElement) => {
  text.value = optionElement.dataset.text as string;
  selectedOption.value = {
    text: optionElement.dataset.text!,
    value: optionElement.dataset.value!,
  };
};

onClickOutside(wrapperElement, hideList);

const filteredList = computed(() => {
  const inputValue = text.value.toString().trim().toLowerCase();
  if (inputValue === '') return props.options;
  if (typeof props.filterFunction === 'function') return props.filterFunction(props.options, inputValue);
  return filter(props.options, inputValue);
});
</script>

<template>
  <div class="auto-suggest" ref="wrapperElement">
    <label
      :for="props.id"
      class="auto-suggest__label">
      {{ props.label }}
    </label>

    <div class="input-container">
      <input
        v-model="text"
        ref="inputElement"
        type="text"
        autocapitalize="none"
        autocomplete="off"
        spellcheck="false"
        :disabled="props.disabled"
        :id="props.id"
        :name="props.name"
        :readonly="props.readonly"
        :placeholder="props.placeholder"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="isListOpen"
        :aria-required="props.required"
        @keyup="onInputKeyup"
        @keydown="onInputKeydown"
        @mousedown="onInputClick"
        class="auto-suggest__input" />

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
        <slot
          name="no-results"
          :isListOpen="isListOpen"
          :filteredOptionLength="filteredList.length">
        <li
          v-if="filteredList.length === 0"
          class="auto-suggest__no-results">
          {{ props.noResultsText }}
        </li>
        </slot>
      </ul>

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
    </div>
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

  --auto-suggest-item-text-font-size: var(--gymx-font-size-1);
  --auto-suggest-item-inline-padding: 0;
  --auto-suggest-item-block-padding: var(--gymx-size-00);
}
</style>
<style lang="scss" scoped>
.auto-suggest {
  &__list {
    list-style: '';
    margin: 0;
    padding: 0;
    font-size: var(--auto-suggest-item-text-font-size);
    block-size: var(--auto-suggest-list-block-size);
    inline-size: var(--auto-suggest-list-inline-size);
  }

  &__option {
    padding-inline: var(--auto-suggest-item-inline-padding);
    padding-block: var(--auto-suggest-item-block-padding);
  }
}
</style>
