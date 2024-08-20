
import type { Meta, StoryObj } from '@storybook/vue3';
import GymxLabel from './gymx-label.vue';
import type { UIState } from '@/types';

const uiState: UIState[] = ['disabled', 'focused', 'hover'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Label',
  component: GymxLabel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select', options: uiState
    }
  },
} satisfies Meta<typeof GymxLabel>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Firstname',
  },
};

