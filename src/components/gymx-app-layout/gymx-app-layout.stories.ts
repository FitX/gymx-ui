
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import { default as GymxAppLayout } from './gymx-app-layout.vue';
import { GymxAppContent } from '@/components';
import { default as FormExample } from '../../../docs/demo/forms-example.vue';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Layout/App Layout',
  component: GymxAppLayout,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
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
      GymxAppContent,
      FormExample,
    },
    data() {
      return {
        args,
      }
    },
    template: `
    <gymx-app-layout v-bind="args">
      <template #header><h1>Title</h1></template>
      <template #main>
        <gymx-app-content>
          <form-example />
        </gymx-app-content>
      </template>
      <template #footer><small>© 2024 GymX</small></template>
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

