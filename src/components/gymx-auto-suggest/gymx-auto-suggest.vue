<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { GymxAutoSuggestProps, Option } from '@/components/gymx-auto-suggest/types';
import { filter } from '@/components/gymx-auto-suggest/utils';

const props = withDefaults(defineProps<GymxAutoSuggestProps>(), {
  noResultsText: 'No results available',
});

// const model = defineModel<string | number>();
const model = ref<string | number>(props.value || '');
const text = ref<string | number>('');

const listElement = ref<HTMLUListElement | null>(null);
const wrapperElement = ref<HTMLDivElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const isListOpen = ref(false);
const selectedOption = ref<Option | null>(null);

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
        ?.querySelector<HTMLLIElement>(`[role="option"]:not([aria-disabled="true"])`)
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

const handleOptionClick = (event: MouseEvent) => {
  if (!(event.target as HTMLLIElement).matches(`[role="option"]:not([aria-disabled="true"])`))
    return;
  selectOption(event.target as HTMLLIElement);
  hideList();
};

const handleListKeyDown = (event: KeyboardEvent) => {
  let preventEvent = false;
  switch (event.key) {
    case 'ArrowUp':
      // eslint-disable-next-line no-case-declarations
      let prevOptionElement = event.target?.previousElementSibling as HTMLLIElement;
      while (prevOptionElement) {
        if (prevOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break;
        prevOptionElement = prevOptionElement.previousElementSibling as HTMLLIElement;
      }
      prevOptionElement?.focus();
      preventEvent = true;
      break;
    case 'ArrowDown':
      // eslint-disable-next-line no-case-declarations
      let nextOptionElement = event.target?.nextElementSibling as HTMLLIElement;
      while (nextOptionElement) {
        if (nextOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break;
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
  if (selectedOption.value) {
    // inputElement.value!.value = selectedOption.value.text;
  }
  isListOpen.value = false;
  inputElement.value?.focus();
};

/**
 * @TODO emit
 */
const selectOption = (optionElement: HTMLLIElement) => {
  model.value = optionElement.dataset.value as string;
  text.value = optionElement.dataset.text as string;
  selectedOption.value = {
    text: optionElement.dataset.text!,
    value: optionElement.dataset.value!,
  };
  // hideList();
};

onClickOutside(wrapperElement, hideList);

const filteredList = computed(() => {
  const inputValue = text.value.toString().trim().toLowerCase();
  const isExactMatch = props.options.some((option) => option.text.toLowerCase() === inputValue);

  console.log({
    inputValue,
    isExactMatch
  })

  // return filter(inputValue);
  // return (inputValue === '' || isExactMatch) ? props.options : filter(inputValue);
  if (inputValue === '') return props.options;
  if (typeof props.filterFunction === 'function') return props.filterFunction;
  return filter(props.options, inputValue);
});
</script>

<template>
  <div class="combobox" ref="wrapperElement">
    <label
      :for="props.id"
      class="combobox__label">
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
        class="combobox__input" />

      <ul
        ref="listElement"
        role="listbox"
        :aria-label="props.label"
        :hidden="!isListOpen"
        @click="handleOptionClick"
        @keydown="handleListKeyDown"
        class="combobox__list">
        <li
          v-for="(option, index) in filteredList"
          :key="index"
          class="combobox__option"
          :class="{ 'combobox__option--disabled': option.disabled }"
          role="option"
          :tabindex="option.disabled === true ? undefined : '-1'"
          :data-text="option.text"
          :data-value="option.value"
          :aria-selected="model === option.value"
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
          class="combobox__no-results">
          {{ props.noResultsText }}
        </li>
        </slot>
      </ul>

      <slot
        name="aria-status"
        :isListOpen="isListOpen"
        :filteredOptionLength="filteredList.length">
        <div
          class="visually-hidden combobox__status"
          role="status"
          aria-live="polite">
          {{ filteredList.length }} results available.
        </div>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>

li { padding: 1rem; border: 1px solid red}
</style>
