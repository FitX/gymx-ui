
<script lang="ts" setup>

import { ref } from 'vue';

const showContent = ref(false);
</script>
<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <h1>header</h1>
      <p>lorem</p>
    </header>
    <main class="app-layout__main">
      <label>
        Toggle Content
        <input type="checkbox" v-model="showContent" switch />
      </label>
      <p>content</p>
      <div v-if="showContent">
        <p v-for="i in 40" :key="i">lorem ipsum dolor sit amet consetetur adipisicing elit. Vestibulum sapien nunc,</p>
      </div>
    </main>
    <footer class="app-layout__footer">footer</footer>
  </div>
</template>
<style lang="scss" scoped>
header { background: coral; }
main { background: olive; }
footer { background: cornflowerblue}

.app-layout2 {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  height: 100vh;

  header {
    background: coral;
    position: sticky;
    top: 0;
    grid-column-start: 1;
    grid-row-start: 1;

    &:before {
      content: '';
      grid-column: 1 / -1;
      grid-row: 1 / span 2;
    }
  }

  footer {
    background: lightblue;
  }
}

.app-layout_2 {
  display: grid;
  border: 1px solid red;

  grid-template-areas:
    'header'
    'content'
    'footer';

  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr auto;

  height: 100vh;

  header {
    background: coral;
    position: sticky;
    top: 0;
    opacity: 0.8;
  }

  footer {
    background: lightblue;
    position: sticky;
    bottom: 0;
    opacity: 0.8;
  }

  main {
    background: olive;
  }
}


.app-layout-works {
  --app-layout-inline-padding: var(--gymx-size-0);
  --app-layout-block-padding: var(--gymx-size-00);
  --app-layout-main-overflow-y: scroll;
  display: grid;

  grid-template-areas:
    'header'
    'content'
    'footer';

  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr auto;

  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &__header,
  &__main,
  &__footer {
    padding-inline: var(--app-layout-inline-padding);
    padding-block: var(--app-layout-block-padding);
  }

  &__header {
    position: sticky;
    top: 0;
    opacity: 0.8;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    opacity: 0.8;
  }

  &__main {
    // overflow-y: var(--app-layout-main-overflow-y);
  }
}

.app-layout {
  display: grid;

  grid-template-areas:
    'header'
    'content'
    'footer';

  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr auto;

  /* above the fold spacer */
  &::before {
    content:'';
    height: 100vh;
    grid-column: 1 / -1;
    // grid-row: 1 / span 2;
    grid-row: header / content;
    // background: red;
    z-index: 1;
    pointer-events: none;
  }

  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    grid-area: header;
  }

  &__main {
    grid-area: content;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    z-index: 1;
    grid-area: footer;
  }
}
</style>
