<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import Color from 'colorjs.io';

const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)');

const defaultColors = [{
  name: 'Black',
  key: 'black',
}, {
  name: 'White',
  key: 'white',
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
  name: 'accent on Dark',
  key: 'accent',
  scheme: 'dark',
  }, {
    name: 'accent on Light',
    key: 'accent',
    scheme: 'light',
  }];

/**
 * @TODO Refactor after vue 3.5
 * @deprecated since 3.5
 */
const itemRefs = ref([]);

onMounted(() => {
  console.log(itemRefs.value)
  itemRefs.value.forEach((item) => {
    // console.log('getComputedStyle(item)', window.getComputedStyle(item ,null).getPropertyValue('--background-color'))
    // console.log('get', getComputedStyle(item).getPropertyValue('background-color').trim())
    // const currentColor = new Color(getComputedStyle(item).getPropertyValue('--background-color').trim());
    // const currentColor = new Color('white');
    const itemBackground = getComputedStyle(item).getPropertyValue('background-color').trim();
    const currentColor = new Color(itemBackground);
    const parentBackground = getComputedStyle(item.parentNode).backgroundColor;
    const backgroundColor = new Color(parentBackground);
    // console.log(currentColor.alpha.raw)
    // console.log(currentColor.luminance)
    // console.log(item.parentNode, parentBackground);
    const contrastToBlack = currentColor.contrast('#000', 'WCAG21');
    const contrastToWhite = currentColor.contrast('#fff', 'WCAG21');
    const contrastToBackground = backgroundColor.contrast(itemBackground, 'WCAG21');
    const mix = currentColor.mix(parentBackground, Number(currentColor.alpha.raw));

    if (item.innerText.startsWith('accent')) {
      console.log({
        // item,
        // text: item.innerText, // "Gray on Dark 2 dark"
        // contrastToBlack,
        // contrastToWhite,
        // luminance: currentColor.luminance,
        text: item.innerText,
        // parentBackground,
        // contrastToBackground,
        // itemBackground,
        // currentColor: currentColor.toString({format: 'rgb'}),
        mix,
        contrastToBackground,
        currentColor,
        // contrast: currentColor.mix(parentBackground, Number(currentColor.alpha.raw)).contrast(parentBackground, 'WCAG21')
      })
    }

    console.log(contrastToBackground, mix.contrast(itemBackground, 'WCAG21'), currentColor.luminance, currentColor.alpha.raw)

    // item.classList.add(contrastToBlack < 4.5 ? 'text-on-dark' : 'text-on-light')
    /* if (contrastToWhite >= contrastToBlack) {
      item.classList.add(contrastToWhite >= 4.5 ? 'text-on-light' : 'text-on-dark');
    } else {
      item.classList.add(contrastToBlack >= 4.5 ? 'text-on-dark' : 'text-on-light');
    } */

    /* if (contrastToBlack >= 4.5 && contrastToWhite < 4.5) {
      item.classList.add('text-on-dark');
    } else if (contrastToWhite >= 4.5 && contrastToBlack < 4.5) {
      item.classList.add('text-on-light');
    } else {
      if (contrastToBlack > contrastToWhite) {
        item.classList.add('text-on-dark');
      } else {
        item.classList.add('text-on-light');
      }
    }*/
    /*
    if (currentColor.luminance < 1) {
      if (contrastToWhite < contrastToBlack) {
        item.classList.add('text-on-dark');
      } else {
        item.classList.add('text-on-light');
      }
    } else {
      item.classList.add(contrastToBackground > 4.5 ? 'text-on-dark' : 'text-on-light')
      console.log('ayay', contrastToBackground)
    } */

    /*
    if (contrastToBackground > 4.5) {
      item.classList.add('text-on-dark');
    } else {
      item.classList.add('text-on-light');
    }*/
    if (mix.contrast(itemBackground, 'WCAG21') < 4.5) {
      item.classList.add('text-on-dark');
    } else {
      item.classList.add('text-on-light');
    }

  })
})
</script>
<template>
  <section>
    <ul class="color-description">
      <li style="--span: 2">Backgrounds</li>
      <li style="--span: 3">Interactions</li>
      <li style="--span: 3">Borders</li>
      <li style="--span: 2">Highlights</li>
      <li style="--span: 2">Accessible text</li>
    </ul>
    <ul
      class="colors"
      v-for="(palette, index) in defaultColors"
      :data-color-scheme="palette.scheme ?? (isPreferredDark ? 'dark' : 'light')"
      :key="`palette-${index}`">
      <li
        v-for="n in 12"
        ref="itemRefs"
        :key="`item-${index}-${n}`"
        :style="`--background-color: var(--gymx-color-${palette.key}-${n});`">
      <span>{{ palette.name }} {{ n }} {{ palette.scheme ?? (isPreferredDark ? 'dark' : 'light') }}</span>
      </li>
    </ul>
    <!-- <ul class="colors">
      <li style="--background-color: var(--gymx-color-black-1);">Black 1</li>
      <li style="--background-color: var(--gymx-color-black-2);">Black 2</li>
      <li style="--background-color: var(--gymx-color-black-3);">Black 3</li>
      <li style="--background-color: var(--gymx-color-black-4);">Black 4</li>
      <li style="--background-color: var(--gymx-color-black-5);">Black 5</li>
      <li style="--background-color: var(--gymx-color-black-6);">Black 6</li>
      <li style="--background-color: var(--gymx-color-black-7);">Black 7</li>
      <li style="--background-color: var(--gymx-color-black-8);">Black 8</li>
      <li style="--background-color: var(--gymx-color-black-9);">Black 9</li>
      <li style="--background-color: var(--gymx-color-black-10);">Black 10</li>
      <li style="--background-color: var(--gymx-color-black-11);">Black 11</li>
      <li style="--background-color: var(--gymx-color-black-12);">Black 12</li>

      <li style="--background-color: var(--gymx-color-white-1); color: black;">White 1</li>
      <li style="--background-color: var(--gymx-color-white-2); color: black;">White 2</li>
      <li style="--background-color: var(--gymx-color-white-3); color: black;">White 3</li>
      <li style="--background-color: var(--gymx-color-white-4); color: black;">White 4</li>
      <li style="--background-color: var(--gymx-color-white-5); color: black;">White 5</li>
      <li style="--background-color: var(--gymx-color-white-6); color: black;">White 6</li>
      <li style="--background-color: var(--gymx-color-white-7); color: black;">White 7</li>
      <li style="--background-color: var(--gymx-color-white-8); color: black;">White 8</li>
      <li style="--background-color: var(--gymx-color-white-9); color: black;">White 9</li>
      <li style="--background-color: var(--gymx-color-white-10); color: black;">White 10</li>
      <li style="--background-color: var(--gymx-color-white-11); color: black;">White 11</li>
      <li style="--background-color: var(--gymx-color-white-12); color: black;">White 12</li>

      <li style="--background-color: var(--gymx-color-gray-1);">Gray 1</li>
      <li style="--background-color: var(--gymx-color-gray-2);">Gray 2</li>
      <li style="--background-color: var(--gymx-color-gray-3);">Gray 3</li>
      <li style="--background-color: var(--gymx-color-gray-4);">Gray 4</li>
      <li style="--background-color: var(--gymx-color-gray-5);">Gray 5</li>
      <li style="--background-color: var(--gymx-color-gray-6);">Gray 6</li>
      <li style="--background-color: var(--gymx-color-gray-7);">Gray 7</li>
      <li style="--background-color: var(--gymx-color-gray-8);">Gray 8</li>
      <li style="--background-color: var(--gymx-color-gray-9);">Gray 9</li>
      <li style="--background-color: var(--gymx-color-gray-10);">Gray 10</li>
      <li style="--background-color: var(--gymx-color-gray-11);">Gray 11</li>
      <li style="--background-color: var(--gymx-color-gray-12);">Gray 12</li>
    </ul> -->
  </section>
</template>

<style lang="scss" scoped>
.colors, .color-description {

  list-style: none; display: grid; grid-template-columns: repeat(12, 1fr); margin: 0; padding: 0;
  gap: 0.5rem;
  margin-block-end: 0.5rem;

  &[data-color-scheme="dark"] {
    color-scheme: dark;
    background: black;
  }

  &[data-color-scheme="light"] {
    color-scheme: light;
    background: white;
  }

  li {
    grid-column: span var(--span);
    padding: 0.5rem 0;
  }
}

.colors {
  /* background: linear-gradient(45deg, #f3f3f3 25%, transparent 25%),
  linear-gradient(-45deg, #f3f3f3 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #f3f3f3 75%),
  linear-gradient(-45deg, transparent 75%, #f3f3f3 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
  background-image: linear-gradient(45deg, var(--transparency-grid-color-2) 25%, #0000 25%), linear-gradient(135deg, var(--transparency-grid-color-2) 25%, #0000 25%), linear-gradient(45deg, #0000 75%, var(--transparency-grid-color-2) 75%), linear-gradient(135deg, #0000 75%, var(--transparency-grid-color-2) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 0, 8px -8px, 0 8px; */

  li {
    background: var(--background-color);
    margin: 0;
    padding: 0;
    aspect-ratio: 1;
  }
}

.text-on-dark span {
  // color-scheme: dark;
  // color: light-dark(#fff, black);
  color: white;
}

.text-on-light span  {
  // color: light-dark(black, white);;
  color: black;
}

.foo span {
  color: red;
}
</style>
