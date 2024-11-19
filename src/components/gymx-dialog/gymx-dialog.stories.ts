import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxDialog } from './gymx-dialog.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Dialog',
  component: GymxDialog,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [() => ({ template: '<div style="height: 50vh;"><story/></div>' })],
} satisfies Meta<typeof GymxDialog>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    modelValue: true,
    default: 'Lorem Ipsum Dolor Sit Amet',
    title: 'Optional Title',
    // style: 'min-height: 30rem; min-width: 30rem;',
  },
};
