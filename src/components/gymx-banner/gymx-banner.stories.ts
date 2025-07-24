import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxBanner } from './gymx-banner.vue';
import { IconError } from '@/components';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Banner',
  component: GymxBanner,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxBanner>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    content: 'This is a banner.',
  },
};

export const Success: Story = {
  args: {
    content: 'This banner indicates a positive situation or a successful completion.',
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    content: 'This banner indicates an info message.',
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    content: 'This banner indicates a warning.',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    content: 'This banner indicates an error.',
    type: 'error',
  },
};

export const WithIcon: Story = {
  args: {
    content: 'This banner contains an optional icon.',
    icon: () => h(IconError, { 'aria-hidden': true }),
    type: 'error',
    style: '--gymx-banner-icon-fill: var(--gymx-color-error-12)',
  },
};

export const End: Story = {
  args: {
    content: 'This banner contains end-aligned content.',
    icon: () => h(IconError, { 'aria-hidden': true }),
    type: ['error', 'end'],
    style: '--gymx-banner-icon-fill: var(--gymx-color-error-12)',
  },
};
