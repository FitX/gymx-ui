import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAutoSuggest } from './gymx-auto-suggest.vue';
import { ref } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/auto-suggest',
  component: GymxAutoSuggest,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
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
      const options = ref(Array.from({length: 20}, (_, i) => ({
        text: `Text ${i + 1}`,
        value: `Value ${i + 1}`,
      })));

      const model = ref(options.value[2]);

      const addOption = () => {
        const currentLength = options.value.length;
        options.value.push({ text: `Text ${currentLength + 1 }`, value: `Value ${currentLength + 1}`})
      };
      return {
        args,
        model,
        options,
        addOption,
      };
    },
    template: `
      <gymx-auto-suggest v-bind="args" :options="options" v-model="model">
        <template #option="{ option }">
          <div style="display: contents">Custom Option {{ option }}</div>
        </template>
        <template #no-results="{ filteredOptionLength, isListOpen }">
          <li><button @click="addOption">Add Option</button></li>
        </template>
      </gymx-auto-suggest><p>model: {{ model }}</p>`,
  }),
};
