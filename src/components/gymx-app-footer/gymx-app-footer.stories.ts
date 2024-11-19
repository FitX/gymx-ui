import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAppFooter } from './gymx-app-footer.vue';
import pkg from '../../../package.json';
import { GymxLink } from '@/components';
import Readme from './readme.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Layout/App Footer',
  component: GymxAppFooter,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Readme,
      },
    },
  },
} satisfies Meta<typeof GymxAppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      GymxAppFooter,
      GymxLink,
    },
    data() {
      return {
        args,
        appVersion: pkg.version,
      };
    },
    template: `
    <gymx-app-footer v-bind="args">
      <template #content>
        <p>v. {{ appVersion }}</p>
      </template>
      <template #actions>
        <gymx-link>Imprint</gymx-link>
        <gymx-link>Data protection</gymx-link>
      </template>
    </gymx-app-footer>`,
  }),
};

export const ActionsOnly: Story = {
  args: {},
  render: (args) => ({
    components: {
      GymxAppFooter,
      GymxLink,
    },
    data() {
      return {
        args,
      };
    },
    template: `
    <gymx-app-footer v-bind="args">
      <template #actions>
        <gymx-link>Imprint</gymx-link>
        <gymx-link>Data protection</gymx-link>
      </template>
    </gymx-app-footer>`,
  }),
};

export const ContentOnly: Story = {
  args: {},
  render: (args) => ({
    components: {
      GymxAppFooter,
    },
    data() {
      return {
        args,
        appVersion: pkg.version,
      };
    },
    template: `
    <gymx-app-footer v-bind="args">
      <template #content>
        <p>v. {{ appVersion }}</p>
      </template>
    </gymx-app-footer>`,
  }),
};
