import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAppContent } from './gymx-app-content.vue';
import { default as FormExample } from '../../../docs/demo/forms-example.vue';
import DemoHTMLContent from '../../../docs/demo/demo-html-content.html?raw';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Layout/App Content',
  component: GymxAppContent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    layout: {
      options: ['default', 'centered'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof GymxAppContent>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: () => h('span', { innerText: 'Main Content' }),
  },
};

export const Centered: Story = {
  args: {
    layout: 'centered',
    default: () => h(FormExample),
  },
};

export const ContentExample: Story = {
  args: {
    default: () => h('div', {
      innerHTML: DemoHTMLContent,
    })
  },
};
