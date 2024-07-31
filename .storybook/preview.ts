import type { Preview } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '@/assets/styles/normalize.css';
import '@/assets/styles/sizes.css';
import '@/assets/styles/borders.css';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
];

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
