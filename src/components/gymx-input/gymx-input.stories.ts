
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxInput } from './gymx-input.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Input',
  component: GymxInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    a11y: {
      config: {
        // wen know....
        rules: [{ id: 'label', enabled: false }],
      },
    },
  },
} satisfies Meta<typeof GymxInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
  },
};

export const Hover: Story = {
  args: {
    state: 'hover'
  },
};

export const Focused: Story = {
  args: {
    state: 'focused'
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    modelValue: 'Jon Doe'
  },
};

export const OptionalIconStart: Story = {
  args: {
    'input-start': '🐨',
  },
};

export const OptionalIconEnd: Story = {
  args: {
    'input-end': '🐨',
  },
};

export const WithAttributes: Story = {
  args: {
    modelValue: 'Readonly',
    inputAttributes: {
      'aria-label': 'demo field',
      readonly: true,
    }
  },
};
