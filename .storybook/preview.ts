import { type Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import '@/assets/styles/normalize.css';
import '@/assets/styles/sizes.css';
import '@/assets/styles/borders.css';
import '@/assets/styles/theme.css';
import { themeDecorator } from './theme-decorator';
import { ThemedContainer } from './docs-theme-provider';


export const decorators = [
  themeDecorator,
  (story, context) => {
    console.log('story', story);
    console.log('context', context);
    console.log('root', document.documentElement);
    console.log('viewmode', context.viewMode)
    return {
      setup(props, ctx) {
        return {
          story,
        }
      },
      template: '<story />',
    };
  },
];

const preview: Preview = {
  parameters: {
    docs: {
      // theme: ensure(themes.dark),
      theme: themes.dark,
      container: ThemedContainer
    },
    /* controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    }, */
  },
  decorators,
};

export default preview;
