import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxLink } from './gymx-link.vue';
import { uiStates } from '@/types';
import type { GymxLinkProps } from '@/components/gymx-link/types';

const linkStates: GymxLinkProps['state'] = uiStates.filter((type) => type !== 'disabled');

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Link',
  component: GymxLink,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: linkStates,
    },
  },
  args: {
    href: '#',
  },
} satisfies Meta<typeof GymxLink>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Link',
    // text: 'This is an error message',
  },
};

export const Hover: Story = {
  args: {
    default: 'Link hovered',
    state: 'hover',
  },
};

export const Focused: Story = {
  args: {
    default: 'Link focused',
    state: 'focused',
  },
};

export const OptionalIconStart: Story = {
  args: {
    default: 'Link',
    'icon-start': '🐨',
  },
};

export const OptionalIconEnd: Story = {
  args: {
    default: 'Link',
    'icon-end': '🐨',
  },
};
