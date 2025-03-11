<script lang="ts" setup>
  import type { GymxBannerProps } from './types';
  import { getModifierClasses } from '@/utils/css-modifier';
  import { computed } from 'vue';

  const props = defineProps<GymxBannerProps>();

  const hideIcon = computed(() => props.type === 'no-icon' || props.type?.includes('no-icon'));
</script>

<template>
  <div
    class="banner"
    :class="getModifierClasses('banner', props.type)"
    >
    <div class="banner__content">
      <span
        v-if="!hideIcon"
        class="banner__icon">
        <!--
          @slot Icon Slot
        -->
        <slot name="icon">
          <!--<icon-info v-if="showAttentionIcon" />-->
        </slot>
      </span>
      <span>
        <!--
        @slot Default Content Slot
      -->
      <slot>
        {{ props.content }}
      </slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/component-utils/components.scss";

.banner {
  $self: &;

  --_gymx-banner-icon-fill: var(--gymx-banner-icon-fill, currentColor);
  --_gymx-banner-color: var(--gymx-banner-color, currentColor);
  --_gymx-banner-color-background: var(--gymx-banner-color-background, var(--gymx-color-gray-2));
  --_gymx-banner-radius: var(--gymx-banner-radius, var(--gymx-color-gray-2));
  --_gymx-banner-padding-inline: var(--gymx-banner-padding-inline, var(--gymx-size-0));
  --_gymx-banner-padding-block: var(--gymx-banner-padding-block, var(--gymx-size-00));
  --_gymx-banner-gap: var(--gymx-banner-padding-inline, var(--gymx-size-0));

  border-radius: var(--gymx-banner-radius, var(--gymx-radius-0));
  background: var(--_gymx-banner-color-background);
  color: var(--_gymx-banner-color);
  padding-inline: var(--_gymx-banner-padding-inline);
  padding-block: var(--_gymx-banner-padding-block);

  /* display: grid;
  grid-template-columns: 1fr;
  place-items: center; */

  &__content {
    display: flex;
    flex-wrap: nowrap;
    align-content: stretch;
    align-items: stretch;
    gap: var(--_gymx-banner-gap);
  }

  &--start {
    justify-items: start;
  }

  &--end {
    justify-items: end;
    #{$self}__icon {
      order: 2;
    }
  }

  &__icon {
    --icon-fill: var(--_gymx-banner-icon-fill);
    --icon-width: var(--gymx-banner-icon-size);
    --icon-height: var(--_gymx-banner-icon-size);
    display: inline-flex;
    align-items: center;

    &:empty {
      display: none;
    }
  }

  &--warning {
    --_gymx-banner-color-background: var(--gymx-banner-color-background-warning, var(--gymx-color-warning-5));
    --_gymx-banner-color: var(--gymx-banner-color-warning, currentColor);
  }

  &--success {
    --_gymx-banner-color-background: var(--gymx-banner-color-background-success, var(--gymx-color-success-5));
    --_gymx-banner-color: var(--gymx-banner-color-success, currentColor);
  }

  &--error {
    --_gymx-banner-color-background: var(--gymx-banner-color-background-error, var(--gymx-color-error-5));
    --_gymx-banner-color: var(--gymx-banner-color-error, currentColor);

    // alternative use for more contrast
    // --_gymx-banner-color-background: var(--gymx-banner-color-background-error, var(--gymx-color-error-10));
    // --_gymx-banner-color: var(--gymx-banner-color-error, var(--gymx-color-error-1));
  }
}
</style>
