
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxInput } from './gymx-input.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/input',
  component: GymxInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxInput>;

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

export const OptionalIconStart: Story = {
  args: {
    'input-start': '🐨',
  },
};

export const OptionalIconEnd: Story = {
  args: {
    'input-end': '🐨',
  },
};

export const OptionalIcons: Story = {
  args: {
    'input-start': '🐨',
    'input-end': '🐨',
  },
};

