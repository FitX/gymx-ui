<script lang="ts" setup>
  import type { GymxBannerProps } from './types';
  import { getModifierClasses } from '@/utils/css-modifier';

  const hideIcon = true;

  const props = defineProps<GymxBannerProps>();
</script>

<template>
  <div
    :class="getModifierClasses('banner', props.type)"
    class="banner">
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
  --base-banner-spacing-h: 1.7rem;
  --base-banner-spacing-v: 1.4rem;
  --base-banner-icon-size: 1.8rem;
  --base-banner-icon-fill: var(--brand-color-anthracite);
  --base-banner-background: none;
  //border: 1px solid black;
  border: var(--_gymx-toast-color-border);
  border-radius: var(--_gymx-toast-radius);
  --base-banner-color: var(--brand-color-anthracite);
  background: var(--base-banner-background);
  color: var(--base-banner-color);
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 2.1rem;
  padding: var(--base-banner-spacing-v) var(--base-banner-spacing-h);
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  &--left {
    justify-items: start;
  }

  &--right {
    justify-items: end;
  }

  &--attention {
    --base-banner-background: var(--gymx-color-warning);
    --base-banner-icon-fill: var(--brand-color-orange);
  }

  &--success {
    --base-banner-background: var(--_gymx-color-success);
    --base-banner-icon-fill: var(--brand-color-orange);
  }

  &--error {
    --base-banner-background: var(--_gymx-color-error);
    --base-banner-icon-fill: var(--brand-color-orange);
  }

  &__content {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--base-banner-spacing-h);
  }

  &__icon {
    --icon-fill: var(--base-banner-icon-fill);
    --icon-width: var(--base-banner-icon-size);
    --icon-height: var(--base-banner-icon-size);

    &:empty {
      display: none;
    }
  }
}
</style>
