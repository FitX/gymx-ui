
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as UseSortExample } from './demo/use-sort-example.vue';
import { default as UseSortExampleCode } from './demo/use-sort-example.vue?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'examples/useSort',
  component: UseSortExample,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      toc: {
        disable: true, // 👈 Disables the table of contents
      },
      source: {
        type: 'code',
        code: UseSortExampleCode,
      },
    },
  },
} satisfies Meta<typeof UseSortExample>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
  },
};

/* export const TextFields: Story = {
  args: {
    // text: 'This is an error message',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: UseSortExampleCode,
      },
    },
  },
};*/

