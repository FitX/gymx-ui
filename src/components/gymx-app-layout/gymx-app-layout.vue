<script lang="ts" setup>
defineSlots<{
  header: () => any;
  main: () => any;
  footer: () => any;
}>();
</script>
<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <slot name="header" />
    </header>
    <main class="app-layout__main">
      <slot name="main" />
    </main>
    <footer class="app-layout__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.app-layout {
  --_gymx-app-layout-inline-padding: var(--gymx-app-layout-inline-padding, var(--gymx-size-0));
  --_gymx-app-layout-block-padding: var(--gymx-app-layout-block-padding, var(--gymx-size-00));
  --_gymx-app-layout-grid-template-areas: var(--gymx-app-layout-grid-template-areas, 'header' 'content' 'footer');
  --_gymx-app-layout-grid-template-header-height: var(--gymx-app-layout-grid-template-header-height, min-content);
  --_gymx-app-layout-grid-template-main-height: var(--gymx-app-layout-grid-template-main-height, 1fr);
  --_gymx-app-layout-grid-template-footer-height: var(--gymx-app-layout-grid-template-footer-height, auto);

  --_gymx-app-layout-header-color: var(--gymx-app-layout-header-color, inherit);
  --_gymx-app-layout-header-color-background: var(--gymx-app-layout-header-color-background, transparent);

  --_gymx-app-layout-footer-color: var(--gymx-app-layout-footer-color, inherit);
  --_gymx-app-layout-footer-color-background: var(--gymx-app-layout-footer-color-background, transparent);

  display: grid;

  grid-template-areas: var(--_gymx-app-layout-grid-template-areas);

  grid-template-columns: 1fr;
  grid-template-rows:
    var(--_gymx-app-layout-grid-template-header-height)
    var(--_gymx-app-layout-grid-template-main-height)
    var(--_gymx-app-layout-grid-template-footer-height);

  /* above the fold spacer */
  &::before {
    content: '';
    height: 100vh;
    grid-column: 1 / -1;
    // grid-row: 1 / span 2;
    grid-row: header / footer;
    // background: red;
    z-index: 1;
    pointer-events: none;
  }

  &__header,
  &__main,
  &__footer {
    &:not(:empty) {
      padding-inline: var(--_gymx-app-layout-inline-padding);
      padding-block: var(--_gymx-app-layout-block-padding);
    }
  }

  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    grid-area: header;
    color: var(--_gymx-app-layout-header-color);
    background: var(--_gymx-app-layout-header-color-background);
  }

  &__main {
    grid-area: content;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    z-index: 1;
    grid-area: footer;
    color: var(--_gymx-app-layout-footer-color);
    background: var(--_gymx-app-layout-footer-color-background);
  }
}

// overwrites
.app-layout {
  $self: &;

  &--fixed-main {
    overflow-y: hidden;
    height: 100vh;

    #{$self}__main {
      overflow-y: scroll;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-layout > *,
.app-layout__main > :deep(*), // maybe :slotted
:deep(.app-content > *),
:deep(.app-content__inner) {
  display: grid;
  grid: subgrid / subgrid;
}
</style>
