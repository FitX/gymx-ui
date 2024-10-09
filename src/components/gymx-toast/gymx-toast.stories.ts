
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxNotification } from './gymx-notification.vue';
import IconError from '@/assets/icons/error.svg';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Notification',
  component: GymxNotification,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxNotification>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Unstyled Notification',
  },
};

export const Info: Story = {
  args: {
    text: 'Info',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    text: 'Success',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    text: 'Error',
    type: 'error',
  },
};

export const WithIcon: Story = {

  args: {
    text: 'No way!',
    type: 'error',
    icon: h(IconError),
  },
};

