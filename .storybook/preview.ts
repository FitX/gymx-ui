import { type Preview, type VueRenderer } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import '@/assets/styles/normalize.css';
import '@/assets/styles/sizes.css';
import '@/assets/styles/borders.css';
import '@/assets/styles/theme.css';
import { themeDecorator } from './theme-decorator';

export const decorators = [
  themeDecorator,
];

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
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
