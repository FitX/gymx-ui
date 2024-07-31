import type { Preview, VueRenderer } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '@/assets/styles/normalize.css';
import '@/assets/styles/sizes.css';
import '@/assets/styles/borders.css';
import '@/assets/styles/theme.css';

export const decorators = [
  withThemeByDataAttribute<VueRenderer>({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
};

export default preview;
