import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
// import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    /* dts({
      tsconfigPath: './tsconfig.build-lib.json',
    }), */
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'styles/styles': fileURLToPath(new URL('./src/assets/styles/index.css', import.meta.url)),
        'styles/borders': fileURLToPath(new URL('./src/assets/styles/borders.css', import.meta.url)),
        'styles/colors': fileURLToPath(new URL('./src/assets/styles/colors.css', import.meta.url)),
        'styles/theme': fileURLToPath(new URL('./src/assets/styles/theme.css', import.meta.url)),
        'styles/sizes': fileURLToPath(new URL('./src/assets/styles/sizes.css', import.meta.url)),
        'styles/normalize': fileURLToPath(new URL('./src/assets/styles/normalize.css', import.meta.url)),
        'styles/typo': fileURLToPath(new URL('./src/assets/styles/typo.css', import.meta.url)),
      },
      formats: ['es'],
      name: '@fitx/gymx-ui', // @fitx/gymx-ui
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },/*
        assetFileNames: (assetInfo) => {
          return `styles/${assetInfo.name}`;
        },*/
      },
    },
    emptyOutDir: false, // to retain the types folder generated by tsc
  },
})
