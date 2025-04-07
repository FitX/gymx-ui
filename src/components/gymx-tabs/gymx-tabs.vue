
<script lang="ts" setup>
import {
  ref,
  defineProps,
  computed,
  useAttrs,
  defineEmits,
  watch, toValue, useTemplateRef,
} from 'vue';
import type { GymxTabsProps } from './types.ts';
import { getResultElements } from './utils';

const props = defineProps<GymxTabsProps>();

/**
 * Fires on Tab Select
 * @property {number} index - Index of selected Tab
 */
const emit = defineEmits(['selected']);

const attrs = useAttrs();

const DEFAULT_ID_NAME = 'gymx-tab';
const tabsContainerEl = useTemplateRef('tabsEl');
const componentId = computed(() => attrs?.id || DEFAULT_ID_NAME);

const generateId = (index: number) => {
  const { id } = attrs;
  if (id) return `${id}-${index}`;
  return `${toValue(componentId)}-${index}`;
};

const tabs = computed(() => props.tabs.map((tab, index) => ({ id: generateId(index), ...tab })));
const selectedTabIndex = ref(props.selectedTab || 0);

const selectTabIndex = (index: number) => {
  const fallbackToStart = toValue(tabs).length <= index;
  const fallbackToEnd = index < 0;
  let newIndex = index;
  if (fallbackToStart) {
    newIndex = 0;
  }
  if (fallbackToEnd) {
    newIndex = (toValue(tabs).length - 1);
  }
  selectedTabIndex.value = newIndex;
  // const resultElements = [...toValue(tabsContainerEl).childNodes].filter((node) => node?.role === 'tab');
  const container = toValue(tabsContainerEl);
  const resultElements = getResultElements(container);
  const el = resultElements[newIndex] as HTMLElement;
  // eslint-disable-next-line no-unused-expressions
  el?.focus();
  emit('selected', newIndex);
};

watch(() => props.selectedTab, (val, oldVal) => {
  if (val && val !== oldVal) {
    selectedTabIndex.value = val;
  }
}, {
  immediate: true,
});
</script>

<template>
  <div
    class="tabs"
    :style="[ `--gymx-tabs-item-count: ${tabs.length}; --_gymx-tabs-current-index: ${selectedTabIndex}` ]">
    <div
      class="tabs__nav"
      ref="tabsEl"
      role="tablist"
      :aria-label="props.label">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :id="tab.id.toString()"
        :data-tab-trigger-index="index"
        type="button"
        role="tab"
        class="tabs__trigger"
        :class="{ 'tabs__trigger--is-active' : selectedTabIndex === index}"
        @keydown.home.prevent.stop="selectTabIndex(0)"
        @keydown.end.prevent.stop="selectTabIndex((tabs.length - 1))"
        @keydown.right.prevent.stop="selectTabIndex((index + 1))"
        @keydown.left.prevent.stop="selectTabIndex((index - 1))"
        @click="selectTabIndex(index)"
        :aria-selected="selectedTabIndex === index"
        :tabindex="selectedTabIndex === index ? undefined : -1"
        :aria-controls="`${componentId}-content-${index}`">
        <!--
         @slot tab Slot
       -->
        <slot name="tab" v-bind="{ tab, index }">
          <span>{{ tab.title }}</span>
        </slot>
      </button>
      <div class="tabs__slider"></div>
    </div>

    <div
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :id="`${componentId}-content-${index}`"
      role="tabpanel"
      class="tabs__panel"
      :class="{ 'tabs__panel--is-hidden' : selectedTabIndex !== index}"
      tabindex="0"
      :aria-labelledby="tab.id.toString()"
      >
      <!--
       @slot tabpanel Slot
     -->
      <slot name="tabpanel" v-bind="{ tab, index }">
        {{ tab.content }}
      </slot>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.tabs {
  --_gymx-tabs-nav-color: var(--gymx-tabs-nav-color, var(--gymx-color-gray-12));
  --_gymx-tabs-nav-color-background: var(--gymx-tabs-nav-color-background, var(--gymx-color-gray-2));

  --_gymx-tabs-nav-color-active: var(--gymx-tabs-nav-color-active, var(--gymx-color-white-12));
  --_gymx-tabs-trigger-active-color-background: var(--gymx-tabs-trigger-active-color-background, var(--button-color-background));

  --_gymx-tabs-content-color: var(--gymx-tabs-content-color, inherit);

  --_gymx-tabs-border-radius: var(--gymx-tabs-border-radius, var(--gymx-radius-2));
  --_gymx-tabs-nav-outer-spacing: var(--gymx-tabs-nav-outer-spacing, var(--gymx-size-000));
  --_gymx-tabs-item-count: var(--gymx-tabs-item-count, 2);
  --_gymx-tabs-panel-outer-spacing: var(--gymx-tabs-panel-outer-spacing, var(--_gymx-tabs-nav-outer-spacing));
  --_gymx-tabs-nav-transition-duration: var(--gymx-tabs-nav-transition-duration, 300ms);
  --_gymx-tabs-nav-transition: var(--gymx-tabs-nav-transition, transform var(--_gymx-tabs-nav-transition-duration) ease-in-out);

  &__nav {
    position: relative; // for slider
    overflow: hidden;
    display: grid;
    gap: 0;
    padding: var(--_gymx-tabs-nav-outer-spacing);
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    background: var(--_gymx-tabs-nav-color-background);
    border-radius: var(--_gymx-tabs-border-radius);
    align-items: center;
  }

  &__trigger {
    --_tabs-trigger-active-color-background: transparent;

    position: relative;
    border: none;
    background: none;
    display: inline-flex;

    // #(2) outline usage in slider
    outline: none;

    padding: 8px;
    font-size: 1rem;
    border-radius: calc(var(--_gymx-tabs-border-radius) - var(--_gymx-tabs-nav-outer-spacing));
    z-index: 2;
    color: var(--_gymx-tabs-nav-color);
    place-content: center;

    span {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      align-self: center;
      position: relative;
      z-index: 3;
    }

    &--is-active {
      --_gymx-tabs-nav-color:  var(--_gymx-tabs-nav-color-active);
      transition: color 100ms ease calc(var(--_gymx-tabs-nav-transition-duration) - 100ms);
    }
  }

  &__panel {
    color: var(--_gymx-tabs-content-color);
    padding: var(--_gymx-tabs-panel-outer-spacing);

    &--is-hidden {
      display: none;
    }
  }

  &__slider {
    background: var(--_gymx-tabs-trigger-active-color-background);
    border-radius: calc(var(--_gymx-tabs-border-radius) - var(--_gymx-tabs-nav-outer-spacing));
    inline-size: calc((100% / var(--_gymx-tabs-item-count)) - (var(--_gymx-tabs-nav-outer-spacing) / 2));
    // safari render bug by using translate
    // thats why use transform: prevents safari from not respecting the z-index of the background.
    transform: translateX(calc(100% * var(--_gymx-tabs-current-index)));
    transition: var(--_gymx-tabs-nav-transition);
    position: absolute;
    z-index: 1;
    left: var(--_gymx-tabs-nav-outer-spacing);
    block-size: calc(100% - (2 * var(--_gymx-tabs-nav-outer-spacing)));
    // (2) fake outline for better ui experience
    .tabs__trigger:is(:focus-visible) ~ & {
      outline: 1px solid var(--_gymx-tabs-nav-color-active);
      outline-offset: -3px;
    }
  }
}
</style>
