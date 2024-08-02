import type { VueRenderer } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
export const themeDecorator = withThemeByDataAttribute<VueRenderer>({
  themes: {
    light: 'light',
    dark: 'dark',
  },
  defaultTheme: 'light',
  attributeName: 'data-theme',
});
