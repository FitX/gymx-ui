import type { Meta, StoryObj } from '@storybook/vue3';
import { GymxButton } from './index';
import { uiStates } from '@/types';
import { IconDonutSmall } from '@/components';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Button',
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

export const LoadingStart: Story = {
  args: {
    default: 'Hello Loading',
    isLoading: true,
  },
};

export const LoadingStartCustomIcon: Story = {
  args: {
    default: 'Hello Loading',
    'loading-start': () => h('span', { class: 'demo-icon'}, [
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
    'icon-start': '🐨',
    isLoading: true,
  },
};

export const LoadingEndCustomIcon: Story = {
  args: {
    default: 'Hello Loading',
    isLoading: true,
    'loading-end': () => h(IconDonutSmall, { class: 'foo' }),
  },
};
