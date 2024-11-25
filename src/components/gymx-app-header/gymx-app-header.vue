<script lang="ts" setup>
import type { GymxAppHeaderProps } from './types';

const props = defineProps<GymxAppHeaderProps>();
</script>
<template>
  <div class="app-header">
    <span class="app-header__logo">
      <slot name="logo" />
    </span>
    <h1 class="app-header__title">
      <slot name="title">{{ props.title }}</slot>
    </h1>
    <span class="app-header__actions">
      <slot name="actions" />
    </span>
  </div>
</template>
<style lang="scss" scoped>
.app-header {
  :where(&) {
    --gymx-app-header-gap: 0.2rem 1rem;
    --gymx-app-header-actions-gap: 0.2rem 1rem;
    --gymx-app-header-title-font-size: var(--gymx-font-size-fluid-3);
    --gymx-app-header-title-font-weight: var(--gymx-font-weight-3);
  }

  display: flex;
  gap: var(--gymx-app-header-gap);
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;

  &__actions {
    display: flex;
    flex: 0 1 auto;
    justify-self: end;
    margin-inline-start: auto;
    flex-wrap: wrap;
    gap: var(--gymx-app-header-actions-gap);

    & > :deep(*:not(.ignore-default-styles)) {
      font-weight: var(--gymx-font-weight-6);
    }
  }

  &__logo {
    flex: 0 0 var(--gymx-app-header-logo-width, var(--gymx-font-size-fluid-3));
  }

  &__title {
    font-size: var(--gymx-app-header-title-font-size);
    font-weight: var(--gymx-app-header-title-font-weight);
    margin: 0;
  }

  &__logo:empty,
  &__title:empty,
  &__actions:empty {
    display: none;
  }
}
.app-header2 {
  --gymx-app-header-gap: 1rem;
  display: grid;
  grid-template-columns: var(--gymx-app-header-logo-size, auto) var(--gymx-app-header-title-size, auto) var(
      --gymx-app-header-actions-size,
      1fr
    );
  grid-template-rows: 1fr;
  grid-template-areas: 'logo title actions';
  gap: var(--gymx-app-header-gap);
  align-items: center;

  &__logo {
    grid-area: logo;
  }

  &__title {
    grid-area: title;
  }

  &__actions {
    grid-area: actions;
    display: flex;
    justify-self: end;
  }

  &__logo:empty,
  &__title:empty,
  &__actions:empty {
    display: none;
  }

  & > :first-child:empty + * {
    margin-inline-start: calc(var(--gymx-app-header-gap) * -1);
  }
}
</style>
