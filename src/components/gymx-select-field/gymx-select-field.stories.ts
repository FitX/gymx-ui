
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxSelectField } from './gymx-select-field.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/select-field',
  component: GymxSelectField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxSelectField>;

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
    label: 'Select any Number'
  },
};


export const WithCustomInterface: Story = {
  args: {
    options: [{ value: 1, text: 'jo' }, { value: 2, text: 'jo' }],
    label: 'Select any Number',
    modelValue: { value: 1, text: 'jo'}
  },
};

