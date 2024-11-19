
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import { default as GymxAppLayout } from './gymx-app-layout.vue';
import { GymxAppContent, GymxAppHeader, GymxAppFooter, GymxLink } from '@/components';
import { default as FormExample } from '../../../docs/demo/forms-example.vue';
import Readme from './readme.md?raw';
import pkg from '../../../package.json';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Layout/App Layout',
  component: GymxAppLayout,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Readme,
      }
    }
  }
} satisfies Meta<typeof GymxAppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
  },
  render: (args) => ({
    components: {
      GymxAppLayout,
      GymxAppHeader,
      GymxAppContent,
      GymxAppFooter,
      GymxLink,
      FormExample,
    },
    data() {
      return {
        args,
        appVersion: pkg.version,
      }
    },
    template: `
    <gymx-app-layout v-bind="args">
      <style>.normal { font-weight: normal; }</style>
      <template #header>
        <gymx-app-header title="Example App">
          <template #logo>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99" fill="none" style="width: auto; aspect-ratio: 1;" aria-hidden="true">
              <path d="M99 0v99H64.162V59.48L36.219 87.438l-24.635-24.65 27.931-27.934H0V0h99Z" fill="var(--gymx-color-accent, #ED6A12)"/></svg>
          </template>
          <template #actions>
            <!--<gymx-link tag="button" class="ignore-default-styles">Ignore Styles</gymx-link>-->
            <gymx-link tag="button" class="normal">Logout</gymx-link>
          </template>
        </gymx-app-header>
      </template>
      <template #main>
        <gymx-app-content>
          <form-example />
        </gymx-app-content>
      </template>
      <template #footer>
        <gymx-app-footer>
          <template #content>
            <p>v. {{ appVersion }}</p>
          </template>
          <template #actions>
            <gymx-link>Imprint</gymx-link>
            <gymx-link>Data protection</gymx-link>
          </template>
        </gymx-app-footer>
      </template>
    </gymx-app-layout>
    `,
  })
};

export const WithHeader: Story = {
  args: {
    header: h('h1', 'Title')
  },
};

export const WithFooter: Story = {
  args: {
    footer: h('small', '© 2024 GymX')
  },
};

export const Empty: Story = {
  args: {
    main: ''
  },
};

