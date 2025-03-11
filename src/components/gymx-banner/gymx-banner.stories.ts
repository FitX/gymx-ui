import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxBanner } from './gymx-banner.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Banner',
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
    content: 'This is a banner',
  },
};

export const Attention: Story = {
  args: {
    content: 'Attention 1 banner',
    type: 'attention',
  },
};

export const SuccessBanner: Story = {
  args: {
    content: 'Success banner',
    type: 'success',
  },
};

export const ErrorBanner: Story = {
  args: {
    content: 'Error banner',
    type: 'error',
  },
};

export const WithoutIcon: Story = {
  args: {
    content: 'No Icon banner',
  },
};

