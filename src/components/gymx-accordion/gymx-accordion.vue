
<script lang="ts" setup>
import type { GymxAccordionProps } from './types';
import { getModifierClasses } from '@/utils/css-modifier.ts';

const props = defineProps<GymxAccordionProps>();
const open = defineModel<boolean>({ default: false });

const handleToggle = (e: Event) => {
  open.value = (e.target as HTMLDetailsElement).open;
};
</script>
<template>
  <details
    class="accordion"
    :class="[
      getModifierClasses('accordion', props.customIcon ? 'has-custom-icon' : undefined),
    ]"
    :open="open"
    @toggle="handleToggle">
    <summary class="accordion__title">
      <slot name="icon-start" v-bind="{ open }"></slot>
      <slot name="title">{{ props.title }}</slot>
      <slot name="icon-end" :open="open"></slot>
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
  // --_gymx-accordion-transition: var(--gymx-accordion-transition, all 0.5s ease-in-out);
  --_gymx-accordion-content-transition: var(--gymx-accordion-content-transition, block-size 0.5s, content-visibility 0.5s);
  --_gymx-accordion-content-color-background: var(--gymx-accordion-content-color-background, transparent);
  --_gymx-accordion-content-color-text: var(--gymx-accordion-content-color-text, inherit);
  --_gymx-accordion-content-padding-inline: var(--gymx-accordion-content-padding-inline, 0);
  --_gymx-accordion-content-padding-block: var(--gymx-accordion-content-padding-block, 0);

  --_gymx-accordion-title-transition: var(--gymx-accordion-title-transition, none);
  --_gymx-accordion-title-color-background: var(--gymx-accordion-title-color-background, transparent);
  --_gymx-accordion-title-color-text: var(--gymx-accordion-title-color-text, inherit);
  --_gymx-accordion-title-padding-inline: var(--gymx-accordion-title-padding-inline, var(--gymx-size-00));
  --_gymx-accordion-title-padding-block: var(--gymx-accordion-title-padding-block, var(--gymx-size-000));

  --_gymx-accordion-title-icon: var(--gymx-accordion-title-icon, none);
  --_gymx-accordion-title-icon-open: var(--gymx-accordion-title-icon-open, none);

  // transition: var(--_gymx-accordion-transition);
  // overflow: hidden;

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

  &--has-custom-icon {
    --icon: '+';

    ::marker {
      content: none;
    }
    &:open {
      --icon: '-';
    }

    #{$self}__title {
      &::before {
        content: var(--icon);
      }
    }
  }
}

.accordion::details-content {
  // content-visibility: auto;
  // block-size: auto;
}
.accordion:open::details-content {
  // block-size: auto;
}

:root {
  interpolate-size: allow-keywords;
}
</style>
