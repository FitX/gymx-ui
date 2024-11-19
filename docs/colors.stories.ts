
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as ColorsOverview } from './demo/colors-overview.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Examples/Colors',
  component: ColorsOverview,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      toc: {
        disable: true, // 👈 Disables the table of contents
      },
      /* source: {
        type: 'code',
        code: FormExampleCode,
      }, */
    },
  },
} satisfies Meta<typeof ColorsOverview>;

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

