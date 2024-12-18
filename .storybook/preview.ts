import { type Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import { themeDecorator } from './theme-decorator';
import { handleThemeSwitch, ThemedContainer } from './docs-theme-provider';
import { computed } from 'vue';

import './sb-theme-overwrites.css';

/*
import '@/assets/styles/normalize.css';
import '../src/assets/styles/tokens/sizes.css';
import '../src/assets/styles/tokens/typo.css';
import '../src/assets/styles/tokens/colors.css';
import '../src/assets/styles/tokens/borders.css';
import '@/assets/styles/theme.css'; */
import '@/assets/styles/index.css';
/* import '@/assets/styles/example-themes/fx.css';
import '@/assets/styles/example-themes/sg.css'; */

export const decorators = [
  themeDecorator,
  (story, context) => {
    /* if (context.viewMode === 'story') {
      console.log('context.globals.theme', context.globals.theme)
      console.log('themes.dark', themes.dark)
      context.hooks.renderListener((e) => {
        console.log('context?????????????', e)
      })

      // console.log('story only', store.globals.globals.theme === 'dark' ? themes.dark : themes.light)
    }*/

    handleThemeSwitch(context.globals.theme);
    return {
      setup(props) {

        return {
          story,
          theme: computed(() => context.viewMode === 'story' ? context.globals.theme : undefined),
        }
      },
      template: '<div :data-theme-story="theme"><story /></div>',
    };
  },
];

const preview: Preview = {
  parameters: {
    docs: {
      // theme: ensure(themes.dark),
      theme: themes.dark,
      container: ThemedContainer,
      inline: false,
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Icons',
          'Tests',
          'Tokens',
          'Examples',
          'Components',
          ['Layout',
            ['App Layout'],
            'Form'],
          'Composables'],
      },
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
