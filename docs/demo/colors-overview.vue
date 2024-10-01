<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import Color from 'colorjs.io';

const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)');

const defaultColors = [{
  name: 'Black',
  key: 'black',
  alpha: true,
}, {
  name: 'White',
  key: 'white',
  alpha: true,
},{
  name: 'Gray on Dark',
  key: 'gray',
  scheme: 'dark',
},
  {
    name: 'Gray on Light',
    key: 'gray',
    scheme: 'light',
  }, {
  name: 'Accent on Dark',
  key: 'accent',
  scheme: 'dark',
  }, {
    name: 'Accent on Light',
    key: 'accent',
    scheme: 'light',
  }];

/**
 * @TODO Refactor after vue 3.5
 * @deprecated since 3.5
 */
const itemRefs = ref([]);

onUpdated(() => {
  console.log('update');
});

const checkContrast = () => {
  // console.log('mounted', itemRefs.value.find((el) => el.innerHTML === 'accent on Dark 9'));
  // console.log('mounted', getComputedStyle(itemRefs.value.find((el) => el.innerHTML === 'accent on Dark 9')).getPropertyValue('background-color').trim());
  itemRefs.value.forEach((item) => {
    const currentColor = getComputedStyle(item).getPropertyValue('background-color').trim();
    // console.log(item.parentNode.parentNode.dataset.colorScheme)
    // const scheme = item.parentNode.parentNode.dataset.colorScheme;
    const textColorLight = '#fff';
    const textColorDark = '#000';

    const contrastLight = new Color(currentColor).contrast(textColorLight, 'WCAG21');
    const contrastDark = new Color(currentColor).contrast(textColorDark, 'WCAG21');

    if (contrastDark < 4.5) {
      item.classList.add('text-on-dark');
    } else {
      item.classList.add('text-on-light');
    }

    item.dataset.contrastLight = contrastLight;
    item.dataset.contrastDark = contrastDark;

    /*
    const currentColor = getComputedStyle(item).getPropertyValue('background-color').trim();
    // const currentColorItem = new Color(currentColor);
    const parentBackgroundColor = getComputedStyle(item.parentNode).backgroundColor;
    const currentBackgroundItem = new Color(parentBackgroundColor);
    const currentContrast = currentBackgroundItem.contrast(currentColor, 'WCAG21');

    console.log('foo', currentBackgroundItem.contrast(currentColor, 'WCAG21'))
    // console.log(currentContrast);
    if (currentContrast < 4.5) {
      item.classList.add('text-on-dark');
    } else {
      item.classList.add('text-on-light');
    } */
  });
};

onMounted(() => {
  document.addEventListener('theme-css-loaded', (event) => {
    console.log('theme-css-loaded:', event.detail.id);
    checkContrast();
  });
})
</script>
<template>
  <section class="wrapper">
    <ul class="color-description">
      <li style="--span: 2">Backgrounds</li>
      <li style="--span: 3">Interactions</li>
      <li style="--span: 3">Borders</li>
      <li style="--span: 2">Highlights</li>
      <li style="--span: 2">Accessible text</li>
    </ul>
    <ul class="color-description color-count">
      <li v-for="n in 12"
          :key="`count-${n}`">{{ n }}</li>
    </ul>
    <ul
      class="colors"
      v-for="(palette, index) in defaultColors"
      :data-alpha="palette?.alpha"
      :data-color-scheme-fallback="palette.scheme ?? (isPreferredDark ? 'dark' : 'light')"
      :data-color-scheme="palette.scheme"
      :key="`palette-${index}`">
      <li
        v-for="n in 12"
        :key="`item-${index}-${n}`">
      <span
        ref="itemRefs"
        class="colors__preview-item"
        :style="`--background-color: var(--gymx-color-${palette.key}-${n});`">
        {{ palette.name }} <!--{{ n }}-->
      </span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>

.wrapper {
  // overflow-x: auto;
  // min-width: 100vw;
  // box-sizing: border-box;
  overflow-x: auto;
}

.colors, .color-description {

  list-style: none;
  display: grid;
  grid-template-columns: repeat(12, minmax(70px, 1fr));
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  margin-block-end: 0.5rem;
  background: light-dark(white, black);
  // overflow-x: scroll;
  box-sizing: border-box;
  // min-width: 100vw;

  &[data-color-scheme="dark"] {
    color-scheme: dark;
  }

  &[data-color-scheme="light"] {
    color-scheme: light;
  }

  li {
    grid-column: span var(--span);
    padding: 0.5rem 0;
  }
}

.colors {
  --transparent-color-bg: light-dark(#808080, #808080);
  --transparent-color-highlight: light-dark(#999, #999);
  --colors-color-bg: transparent;

  &[data-alpha="true"] {
    --colors-color-bg: repeating-linear-gradient(
        45deg,
        var(--transparent-color-highlight) 0px 2px,
        var(--transparent-color-bg) 2px 12px
    );
  }

  li {
    display: flex;
    place-items: center;
    padding: 0;
    aspect-ratio: 1;
    background: var(--colors-color-bg);
  }

  &__preview-item {
    flex: 1 0 100%;
    align-self: stretch;
    place-content: center;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.85rem;
    background: var(--background-color);
  }
}

.text-on-dark {
  color: white;
}

.text-on-light {
  color: black
}
</style>
