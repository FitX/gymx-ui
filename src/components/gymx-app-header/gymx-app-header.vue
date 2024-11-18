
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
  --app-header-gap: 1rem;
  display: grid;
  grid-template-columns: var(--app-header-logo-size, auto) var(--app-header-title-size, auto) var(--app-header-actions-size, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'logo title actions';
  gap: var(--app-header-gap);
  align-items: center;
  background: lightcoral;

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
    margin-inline-start: calc(var(--app-header-gap) * -1)
  }
}
</style>
