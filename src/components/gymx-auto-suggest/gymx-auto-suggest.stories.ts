import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAutoSuggest } from './gymx-auto-suggest.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/auto-suggest',
  component: GymxAutoSuggest,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxAutoSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Demo',
    name: 'demo',
    id: 'demo',
    placeholder: 'Demo...',
    options: Array.from({length: 10}, (_, i) => ({
      text: `Text ${i + 1}`,
      value: `Value ${i + 1}`,
    })),
    modelValue: 'model',
    // text: 'This is an error message',
  },
};

export const CustomSlots: Story = {
  args: {
    label: 'Demo',
    name: 'demo',
    id: 'demo',
    placeholder: 'Demo...',
    options: Array.from({length: 20}, (_, i) => ({
      text: `Text ${i + 1}`,
      value: `Value ${i + 1}`,
    })),
    modelValue: 'model',
    // text: 'This is an error message',
  },
  render: (args) => ({
    components: { GymxAutoSuggest },
    setup() {
      return {args};
    },
    template: `
      <gymx-auto-suggest v-bind="args" :options="args.options">
        <template #option="{ option }">
          <div>Custom Option {{ option }}</div>
        </template>
      </gymx-auto-suggest>`,
  }),
};
