import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxTextarea } from './gymx-textarea.vue';
import { computed, ref, toValue } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Textarea',
  component: GymxTextarea,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxTextarea>;

const longContent =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Whats up?',
    modelValue: '',
  },
};

export const Hover: Story = {
  args: {
    label: 'Hover State',
    modelValue: '',
    state: 'hover',
  },
};

export const Focused: Story = {
  args: {
    label: 'Focused State',
    state: 'focused',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled State',
    state: 'disabled',
    modelValue: 'Lorem',
  },
};

export const WithAttributes: Story = {
  args: {
    label: 'With HTML Attributes',
    modelValue: 'Readonly',
    inputAttributes: {
      'aria-label': 'demo field',
      readonly: true,
      rows: 1,
    },
  },
};

export const HasHint: Story = {
  args: {
    label: 'With Hint',
    modelValue: '',
    hint: 'Less is more',
  },
};

export const HasError: Story = {
  args: {
    label: 'Has Error',
    modelValue: '',
    errorMessage: 'Example Error Message',
  },
};

export const WithErrorAndHint: Story = {
  args: {
    label: 'With Hint and Error',
    modelValue: '',
    hint: 'Less is more',
    errorMessage: 'Example Error Message',
  },
};

export const Fixed: Story = {
  args: {
    label: 'Fixed',
    modelValue: '',
    autoGrow: false,
    inputAttributes: {
      rows: 5,
    },
    hint: 'Less is more',
  },
};

export const ExampleCharacterCount: Story = {
  args: {
    label: 'With Character Count',
    inputAttributes: {
      maxLength: 10,
    },
  },
  render: (args) => ({
    components: { GymxTextarea },
    setup() {
      const modelValue = ref(longContent);
      const count = computed(() => toValue(modelValue)?.length);
      const errorMessage = computed(() =>
        toValue(count) > args.inputAttributes?.maxLength ? 'to long' : undefined,
      );
      return {
        modelValue,
        errorMessage,
        count,
        args,
        hint: computed(() => `${toValue(count)}/${toValue(args.inputAttributes?.maxLength)}`),
      };
    },
    template: `
      <gymx-textarea v-bind="args" v-model="modelValue" :error-message="errorMessage" :hint="hint" />`,
  }),
};
