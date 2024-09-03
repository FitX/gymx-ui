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
  },
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

export const Hover: Story = {
  args: {
    default: 'Hello Hover',
    state: 'hover',
  },
};

export const Focused: Story = {
  args: {
    default: 'Hello Focused',
    state: 'focused',
  },
};

export const Disabled: Story = {
  args: {
    default: 'Hello Disabled',
    state: 'disabled',
  },
};

export const OptionalIconStart: Story = {
  args: {
    'icon-start': '🚀',
    default: 'Hello Icon',
  },
};

export const OptionalIconEnd: Story = {
  args: {
    default: 'Hello Icon',
    'icon-end': '🐨',
  },
};

export const OptionalIcons: Story = {
  args: {
    'icon-start': '🚀',
    default: 'Hello Icons',
    'icon-end': '🐨',
  },
};
