
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxSelect } from './gymx-select.vue';
import type { GymxSelectOption } from './types';

/**
 * Buggy storybook issue: https://github.com/storybookjs/storybook/issues/24238#issuecomment-2152883652
 */
type GenericMeta<C> = Omit<Meta<C>, 'component'> & {
  component: Record<keyof C, unknown>
}

type DemoValue = { text: string, value: number };

const demoValues: GymxSelectOption<DemoValue>[] = [
  { text: '1', value: 2, },
  { text: '2', value: 2, },
  { text: '3', value: 3, }
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/select',
  component: GymxSelect,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies GenericMeta<typeof GymxSelect<GymxSelectOption<DemoValue>>>;
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
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    modelValue: { text: '2', },
  },
};

export const Multi: Story = {
  args: {
    // options: GymxSelectOption<GymxSelectOption<any>>[] & GymxSelectOption<any>[]
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    // Vue: Type number is not assignable to type GymxSelectOption<unknown>
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    options: [{ text: '1', value: 1, }, { text: '2', value: 2, }, { text: '3', value: 3, }],
    inputAttributes: {
      multiple: true,
    },
    modelValue: [{ text: '2', value: 2 }],
  },
};

export const Disabled: Story = {
  args: {
    // options: GymxSelectOption<GymxSelectOption<any>>[] & GymxSelectOption<any>[]
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    // Vue: Type number is not assignable to type GymxSelectOption<unknown>
    // Vue: Type number is not assignable to type GymxSelectOption<GymxSelectOption<any>>
    options: [{ text: '1', }, { text: '2', }, { text: '3'}],
    state: 'disabled',
    modelValue: [{ text: '2', }],
  },
};

