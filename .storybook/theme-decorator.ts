import type { VueRenderer } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

/**
 * Theme Decorator for Stories
 */
export const themeDecorator = withThemeByDataAttribute<VueRenderer>({
  themes: {
    light: 'light',
    dark: 'dark',
    sg: 'sg',
    'fitx-light': 'fitx-light',
    'fitx-dark': 'fitx-dark',
    exact: 'exact',
  },
  defaultTheme: 'light',
  attributeName: 'data-theme',
});
