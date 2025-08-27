
<script lang="ts" setup>
import type { GymxAccordionProps, GymxAccordionSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';

defineSlots<GymxAccordionSlots>();
const props = withDefaults(defineProps<GymxAccordionProps>(), {
  nativeIcons: false,
});
const open = defineModel<boolean>({ default: false });

const handleToggle = (e: Event) => {
  open.value = (e.target as HTMLDetailsElement).open;
};
</script>
<template>
  <details
    class="accordion"
    :class="[
      getModifierClasses('accordion', props.nativeIcons ? 'has-native-icons' : undefined),
    ]"
    :open="open"
    @toggle="handleToggle">
    <summary class="accordion__title">
      <slot name="icon-start" v-bind="{ open }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="accordion__icon"
          aria-hidden="true"
          style="block-size: var(--icon-block-size, 1em); inline-size: var(--icon-inline-size, 1em);"
          viewBox="0 0 18 18">
          <path fill="var(--icon-fill, currentColor)" d="M4.29 6.29a.992.992 0 0 0 0 1.403l4.097 4.096a.937.937 0 0 0 1.326 0l4.097-4.096a.992.992 0 0 0-1.403-1.403L9.015 9.683 5.693 6.29a.992.992 0 0 0-1.403 0Z"></path>
        </svg>
      </slot>
      <slot name="title">{{ props.title }}</slot>
      <slot name="icon-end" :open="open" />
    </summary>
    <div class="accordion__content">
      <slot name="default">
        {{ props.content }}
      </slot>
    </div>
  </details>
</template>
<style lang="scss">
.accordion {
  $self: &;

  --_gymx-accordion-content-transition: var(--gymx-accordion-content-transition, block-size 0.5s, content-visibility 0.5s);
  --_gymx-accordion-content-color-background: var(--gymx-accordion-content-color-background, transparent);
  --_gymx-accordion-content-color-text: var(--gymx-accordion-content-color-text, inherit);
  --_gymx-accordion-content-padding-inline: var(--gymx-accordion-content-padding-inline, var(--gymx-size-00));
  --_gymx-accordion-content-padding-block: var(--gymx-accordion-content-padding-block, var(--gymx-size-000));

  --_gymx-accordion-title-transition: var(--gymx-accordion-title-transition, none);
  --_gymx-accordion-title-color-background: var(--gymx-accordion-title-color-background, transparent);
  --_gymx-accordion-title-color-text: var(--gymx-accordion-title-color-text, inherit);
  --_gymx-accordion-title-padding-inline: var(--gymx-accordion-title-padding-inline, var(--gymx-size-00));
  --_gymx-accordion-title-padding-block: var(--gymx-accordion-title-padding-block, var(--gymx-size-000));

  --_gymx-accordion-icon-fill: var(--gymx-accordion-icon-fill, currentColor);
  --_gymx-accordion-icon-inline-size: var(--gymx-accordion-icon-inline-size, 1em);
  --_gymx-accordion-icon-block-size: var(--gymx-accordion-icon-block-size, 1em);

  &__content {
    display: flow-root;
    color: var(--_gymx-accordion-content-color-text);
    background: var(--_gymx-accordion-content-color-background);
    padding-inline: var(--_gymx-accordion-content-padding-inline);
    padding-block: var(--_gymx-accordion-content-padding-block);
  }

  &__title {
    transition: var(--_gymx-accordion-title-transition);
    color: var(--_gymx-accordion-content-color-text);
    background: var(--_gymx-accordion-title-color-background);
    padding-inline: var(--_gymx-accordion-title-padding-inline);
    padding-block: var(--_gymx-accordion-title-padding-block);
    font-weight: 700;

    #{$self}:not(#{$self}--has-native-icons) & {
      display: flex; // flex also removes ::marker, if revert display: use ::marker { content: none }
      align-items: center;
    }
  }

  &__icon {
    --icon-fill: var(--_gymx-accordion-icon-fill);
    --icon-inline-size: var(--_gymx-accordion-icon-inline-size);
    --icon-block-size: var(--_gymx-accordion-icon-block-size);
    transition: rotate 0.5s ease-in-out;
    margin-inline-end: 1ch;

    #{$self}:open & {
      rotate: 180deg;
    }

    #{$self}--has-native-icons & {
      display: none;
    }
  }

  &::details-content {
    block-size: 0;
    overflow: clip;
    transition: var(--_gymx-accordion-content-transition);
    transition-behavior: allow-discrete;
  }

  &:open::details-content {
    block-size: auto;
  }
}

:root {
  interpolate-size: allow-keywords;
}
</style>
