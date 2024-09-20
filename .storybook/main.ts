import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../docs/**/*.stories.ts', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    { from: '../coverage', to: '/coverage'},
    // Temp for adding theme.css in Theme Provider
    // { from: '../src/assets/styles', to: '/src/assets/styles'},
    '../docs',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // docgen: 'vue-component-meta',
    },
  },
};
export default config;
