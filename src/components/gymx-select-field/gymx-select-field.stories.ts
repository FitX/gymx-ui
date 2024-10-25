
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxSelectField } from './gymx-select-field.vue';

/**
 * Buggy storybook issue: https://github.com/storybookjs/storybook/issues/24238#issuecomment-2152883652
 */
type GenericMeta<C> = Omit<Meta<C>, 'component'> & {
  component: Record<keyof C, unknown>
}

type DemoValue = { text: string, value: number };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Select Field',
  component: GymxSelectField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: 'Select any',
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    modelValue: { text: '2', },
  }
} satisfies GenericMeta<typeof GymxSelectField<DemoValue>>;
// } satisfies Meta<typeof GymxSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
  },
};

export const Focused: Story = {
  args: {
    state: 'focused',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
};

