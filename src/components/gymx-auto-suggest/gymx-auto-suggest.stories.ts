import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAutoSuggest } from './gymx-auto-suggest.vue';
import { ref } from 'vue';
import type { Option } from '@/components/gymx-auto-suggest/types';
import ReadmeMarkdown from './readme.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/auto-suggest',
  component: GymxAutoSuggest,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        //story: ComponentDescription,
        component: ReadmeMarkdown,
      },
    },
  },
} satisfies Meta<typeof GymxAutoSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Demo',
    name: 'demo',
    id: 'demo',
    placeholder: 'Demo...',
    options: Array.from({length: 10}, (_, i) => ({
      text: `Text ${i + 1}`,
      value: `Value ${i + 1}`,
    })),
    modelValue: undefined,
    // text: 'This is an error message',
  },
};

export const HasError: Story = {
  args: {
    label: 'Demo',
    name: 'demo',
    id: 'demo',
    errorMessage: 'This is an error message',
    placeholder: 'Demo...',
    options: Array.from({length: 10}, (_, i) => ({
      text: `Text ${i + 1}`,
      value: `Value ${i + 1}`,
    })),
    modelValue: undefined,
    // text: 'This is an error message',
  },
};

export const CustomSlots: Story = {
  args: {
    label: 'Demo',
    name: 'demo',
    id: 'demo',
    placeholder: 'Demo...',
    // text: 'This is an error message',
  },
  render: (args) => ({
    components: { GymxAutoSuggest },
    setup() {
      type ExtraOption = {
        text: string;
        value: string;
        extra: number;
      }
      const options = ref(Array.from({length: 20}, (_, i) => ({
        text: `Text ${i + 1}`,
        value: `Value ${i + 1}`,
        extra: (i + 100),
      })));

      const extraFilter = (options: ExtraOption[], text: string): Option[] => {
        const sanitized = Number(text.toLowerCase().trim());
        return options.filter(option =>
          option.extra > sanitized
        );
      };

      // const model = ref(options.value[2]);
      const model = ref();

      const addOption = () => {
        const currentLength = options.value.length;
        options.value.push({
          text: `Text ${currentLength + 1 }`,
          value: `Value ${currentLength + 1}`,
          extra: (currentLength + 1),
        })
      };
      return {
        args,
        model,
        options,
        addOption,
        extraFilter,
      };
    },
    template: `
      <gymx-auto-suggest
        v-bind="args"
        :options="options"
        label="Search by Amount"
        placeholder="e.g. 100"
        v-model="model"
        :expanded="true"
        :filter-function="extraFilter">
        <template #option="{ option }">
          <div>Custom {{ option.text }} <b>Amount: {{ option.extra }}</b></div>
        </template>
        <template #no-results="{ filteredOptionLength, isListOpen }">
          <li v-if="filteredOptionLength <= 0"><button @click="addOption">Add Option</button></li>
        </template>
      </gymx-auto-suggest>
      <p>model:</p>
      <pre>{{ model }}</pre>
      <component is="style">.auto-suggest__list { max-height: 300px; overflow-y: scroll; }</component>
    `,
  }),
};
