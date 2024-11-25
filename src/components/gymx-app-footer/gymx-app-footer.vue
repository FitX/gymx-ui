<script lang="ts" setup>
import type { GymxAppFooterSlots } from './types';

defineSlots<GymxAppFooterSlots>();
</script>
<template>
  <div class="app-footer">
    <span class="app-footer__content">
      <slot name="content" />
    </span>
    <span class="app-footer__actions">
      <slot name="actions" />
    </span>
  </div>
</template>
<style lang="scss" scoped>
.app-footer {
  :where(&) {
    --gymx-app-footer-gap: var(--gymx-size-fluid-1) var(--gymx-size-fluid-2);
    --gymx-app-footer-actions-gap: var(--gymx-size-fluid-0) var(--gymx-size-fluid-2);
    --gymx-app-footer-actions-font-size: var(--gymx-font-size-fluid-0);
    --gymx-app-footer-content-font-size: var(--gymx-font-size-fluid-00);
    --gymx-app-footer-color: var(--gymx-color-gray-9);
  }
  display: flex;
  gap: var(--gymx-app-footer-gap);
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  font-size: var(--gymx-app-footer-font-size);
  color: var(--gymx-app-footer-color);

  &__content {
    margin-inline-end: auto;
    font-size: var(--gymx-app-footer-content-font-size);
  }

  &__actions {
    display: flex;
    flex: 0 1 auto;
    justify-self: end;
    flex-wrap: wrap;
    gap: var(--gymx-app-footer-actions-gap);
  }

  &__content:empty,
  &__actions:empty {
    display: none;
  }

  &__content:empty + &__actions {
    margin-inline-start: auto;
  }
}
</style>
