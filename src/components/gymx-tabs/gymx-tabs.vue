
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

const generateId = (index) => {
  const { id } = attrs;
  if (id) return `${id}-${index}`;
  return `${toValue(componentId)}-${index}`;
};

const tabs = computed(() => props.tabs.map((tab, index) => ({ id: generateId(index), ...tab })));
const selectedTabIndex = ref(props.selectedTab || 0);

const selectTabIndex = (index) => {
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
  const resultElements = [...toValue(tabsContainerEl).childNodes].filter((node) => node?.role === 'tab');
  const el = resultElements[newIndex];
  // eslint-disable-next-line no-unused-expressions
  el?.focus();
  console.log('elllll', el);
  emit('selected', newIndex);
};

watch(() => props.selectedTab, (val, oldVal) => {
  if (val !== oldVal) {
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
      :aria-labelledby="`${componentId}`">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :id="tab.id"
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
      <div class="slider"></div>
    </div>

    <div
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :id="`${componentId}-content-${index}`"
      role="tabpanel"
      class="tabs__panel"
      :class="{ 'tabs__panel--is-hidden' : selectedTabIndex !== index}"
      :tabindex="selectedTabIndex === index ? 0 : -1"
      :aria-labelledby="tab.id"
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
  --_gymx-tabs-nav-color-background: var(--gymx-tabs-nav-color-background, var(--gymx-color-gray-2));
  --_gymx-tabs-nav-color: var(--gymx-tabs-nav-color, inherit);
  --_gymx-tabs-content-color: var(--_gymx-tabs-nav-color);
  --_gymx-tabs-trigger-active-color-background: var(--gymx-tabs-trigger-active-color-background, var(--gymx-color-accent-5));
  --_gymx-tabs-border-radius: var(--gymx-tabs-border-radius, var(--gymx-radius-2));
  --_gymx-tabs-nav-outer-spacing: var(--gymx-tabs-nav-outer-spacing, var(--gymx-size-000));
  --_gymx-tabs-nav-gap: var(--gymx-tabs-nav-gap, var(--gymx-size-00));
  --_gymx-tabs-item-count: var(--gymx-tabs-item-count, 2);
  --_gymx-tabs-panel-outer-spacing: var(--gymx-tabs-panel-outer-spacing, var(--_gymx-tabs-nav-outer-spacing));

  &__nav {
    position: relative; // for slider
    overflow: hidden;
    display: grid;
    gap: var(--_gymx-tabs-nav-gap);
    // grid-template-columns: repeat(auto-fill, minmax(0, 1fr));
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    background: var(--_gymx-tabs-nav-color-background);
    color: var(--_gymx-tabs-nav-color);
    border-radius: var(--_gymx-tabs-border-radius);
    padding: 2px;
    align-items: center;
  }

  &__trigger {
    --_tabs-trigger-active-color-background: transparent;

    position: relative;
    border: none;
    background: none;
    display: inline-flex;
    outline: none;

    padding: 8px;
    font-size: 1rem;
    border-radius: var(--_gymx-tabs-border-radius);
    z-index: 2;

    place-content: center;
    // background: var(--_tabs-trigger-active-color-background);
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
      // --_tabs-trigger-active-color-background: var(--_gymx-tabs-trigger-active-color-background);
    }
  }

  &__panel {
    color: var(--_gymx-tabs-content-color);
    padding: var(--_gymx-tabs-panel-outer-spacing);

    &--is-hidden {
      display: none;
    }
  }
}

.slider {
  grid-column: 1 / -1;
  background: var(--_gymx-tabs-trigger-active-color-background);
  border-radius: calc(var(--_gymx-tabs-border-radius) - var(--_gymx-tabs-nav-outer-spacing));
  inline-size: calc(
    (100%
    - (2 * var(--_gymx-tabs-nav-outer-spacing))
    - ((var(--_gymx-tabs-item-count) - 1) * var(--_gymx-tabs-nav-gap))
    ) / var(--_gymx-tabs-item-count)
  );
  // Nope. ty safari (1)
  /* translate:
    calc(
      (var(--_gymx-tabs-current-index) * 100%)
      + (var(--_gymx-tabs-current-index) * (var(--_gymx-tabs-nav-gap)))
    ) 0 0;*/
  // (1) safari render bug: prevents safari from not respecting the z-index of the background.
  transform:
    translate3d(
      calc(
        (var(--_gymx-tabs-current-index) * 100%)
        + (var(--_gymx-tabs-current-index) * (var(--_gymx-tabs-nav-gap))
        )
    ), 0, 0);
  transition: transform 300ms ease-in-out;
  position: absolute;
  z-index: 1;
  inset: var(--_gymx-tabs-nav-outer-spacing);
}
</style>
