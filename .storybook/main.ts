import type { StorybookConfig } from '@storybook/vue3-vite';

const isProd =  process.env.NODE_ENV === 'production';
const staticDirs = [
  { from: '../coverage', to: '/coverage'},
  // Temp for adding theme.css in Theme Provider
  // { from: '../src/assets/styles', to: '/src/assets/styles'},
  '../docs',
  // { from: '../src/assets/styles/example-themes', to: '/example-themes'}
];

if (isProd) {
  staticDirs.push({ from: '../src/assets/styles/example-themes', to: '/example-themes'})
}

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../docs/**/*.stories.ts', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs,
  addons: [
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
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
};
export default config;
