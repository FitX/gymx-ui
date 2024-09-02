import type { Meta, StoryObj } from '@storybook/vue3';
import { GymxButton } from './index';
import { uiStates } from '@/types';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Button',
  component: GymxButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: uiStates,
    },
  }
} satisfies Meta<typeof GymxButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Hello Button :)',
  },
};
