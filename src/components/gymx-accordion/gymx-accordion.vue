
<script lang="ts" setup>
import type { GymxAccordionProps } from './types';

const props = defineProps<GymxAccordionProps>();
</script>
<template>
  <details class="accordion" :open="props.open">
    <summary class="accordion__title">
      <slot name="title">{{ props.title }}</slot>
    </summary>
    <div class="accordion__content">
      <slot name="default">
        {{ props.content }}
      </slot>
    </div>
  </details>
</template>
<style lang="scss">
.accordion::details-content {
  // transition: height 0.5s ease, content-visibility 0.5s ease allow-discrete;
  // height: 0;
}

.accordion[open]::details-content {
  // height: auto;
}

.accordion {
  // --_gymx-accordion-transition: var(--gymx-accordion-transition, all 0.5s ease-in-out);
  --_gymx-accordion-content-transition: var(--gymx-accordion-content-transition, block-size 0.5s, content-visibility 0.5s);

  --_gymx-accordion-title-padding-inline: var(--gymx-accordion-title-padding-inline, var(--gymx-size-00));
  --_gymx-accordion-title-padding-block: var(--gymx-accordion-title-padding-block, var(--gymx-size-000));
  --_gymx-accordion-title-transition: var(--gymx-accordion-title-transition, all 0.5s ease-in-out);

  // transition: var(--_gymx-accordion-transition);

  &__title {
    transition: var(--_gymx-accordion-title-transition);
    padding: var(--_gymx-accordion-title-padding-block) var(--_gymx-accordion-title-padding-inline);
    font-weight: 700;

    [open] & {
      // padding: 1em;
    }
  }
}

.accordion::details-content {
  // transition: all 0.5s ease, content-visibility 0.5s allow-discrete;
  block-size: 0;
  overflow: clip;
  transition: var(--_gymx-accordion-content-transition);
  transition-behavior: allow-discrete;
}
.accordion:open::details-content {
  block-size: auto;
}

@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }

  ::details-content {
    padding-inline: 2em;
    background: red;
  }

  /*.accordion:where([open])::details-content,
  {
    height: auto;
    padding: 0.5em 1em;
  } */
}
</style>
