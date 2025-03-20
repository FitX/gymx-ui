
import { type Meta, type StoryObj } from '@storybook/vue3';
import { default as GymxTabs } from './gymx-tabs.vue';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Tabs',
  component: GymxTabs,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    tabs: [
      { id: 'a', title: 'Title 1' },
      { id: 'b', title: 'Title 2' },
      { id: 'c', title: 'Title 3 - Long Content for testing purpose only.' },
    ],
    selectedTab: 1,
    label: 'Example Tabs',
    'tabpanel': ({ tab }) => h('p',  `Content from ${ tab.title }`),
  },
};

