
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxSelect } from './gymx-select.vue';

/**
 * Buggy storybook issue: https://github.com/storybookjs/storybook/issues/24238#issuecomment-2152883652
 */
type GenericMeta<C> = Omit<Meta<C>, 'component'> & {
  component: Record<keyof C, unknown>
}

type DemoValue = { text: string, value: number };

const demoValues = [
  { text: '1', value: 2, },
  { text: '2', value: 2, },
  { text: '3', value: 3, }
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Select',
  component: GymxSelect,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies GenericMeta<typeof GymxSelect<DemoValue>>;
// } satisfies Meta<typeof GymxSelect>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // options: GymxSelectOption<GymxSelectOption<any>>[] & GymxSelectOption<any>[]
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    // Vue: Type number is not assignable to type GymxSelectOption<unknown>
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    options: demoValues,
    modelValue: { text: '2', },
    inputAttributes: {
      "aria-label": "Default Example"
    }
  },
};

export const Hover: Story = {
  args: {
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    state: 'hover',
    modelValue: { text: '2', },
    inputAttributes: {
      "aria-label": "Hovered Example"
    }
  },
};

export const Focused: Story = {
  args: {
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    state: 'focused',
    modelValue: { text: '2', },
    inputAttributes: {
      "aria-label": "Focused Example"
    }
  },
};

export const Disabled: Story = {
  args: {
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    state: 'disabled',
    modelValue: { text: '2', },
    inputAttributes: {
      "aria-label": "Disabled Example"
    },
  },
};

/* export const WithPlaceholder: Story = {
  args: {
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    placeholder: 'Select any Number',
  },
}; */

