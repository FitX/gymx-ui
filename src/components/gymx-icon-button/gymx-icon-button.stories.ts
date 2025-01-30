import type { Meta, StoryObj } from '@storybook/vue3';
import { GymxIconButton } from './index';
import { uiStates } from '@/types';
import { IconDonutSmall, IconCheckmark } from '@/components';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Icon Button',
  component: GymxIconButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: uiStates,
    },
  },
} satisfies Meta<typeof GymxIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // default: '🚀',
    default: () => h(IconCheckmark),
    text: 'Demo Icon Button with Checkmark Icon'
  },
};

export const Hover: Story = {
  args: {
    default: '🚀',
    state: 'hover',
    text: 'Demo Icon Button with Hover State'
  },
};

export const Focused: Story = {
  args: {
    default: '🚀',
    state: 'focused',
    text: 'Demo Icon Button with Focused State'
  },
};

export const Disabled: Story = {
  args: {
    default: '🚀',
    state: 'disabled',
    text: 'Demo disabled Icon Button'
  },
};

export const Loading: Story = {
  args: {
    default: '🚀',
    isLoading: true,
    text: 'Demo Button with Loading State'
  },
};

export const LoadingCustomIcon: Story = {
  args: {
    default: '🐨',
    text: 'Demo Icon Button with Custom Icon',
    'loading': () => h('span', { class: 'demo-icon'}, [
      h('style', `
      .demo-icon {
      display: inline-flex;
      place-content: center;
      place-items: center;
      aspect-ratio: 1;
      align-self: center;
      }
      .foo {
      --icon-width: 0.5rem;
      --icon-height: 0.5rem;
      --icon-fill: currentColor;
        animation: 1s linear 1s infinite alternate rotateAnimation;
       }
       @keyframes rotateAnimation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      `),
      h(IconDonutSmall, { class: 'foo' })
    ]),
    isLoading: true,
  },
};
