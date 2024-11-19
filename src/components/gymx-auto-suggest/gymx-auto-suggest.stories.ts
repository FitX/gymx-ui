import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAutoSuggest } from './gymx-auto-suggest.vue';
import { ref } from 'vue';
import type { Option } from '@/components/gymx-auto-suggest/types';
import { GymxButton } from '@/components';
import ReadmeMarkdown from './readme.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Auto Suggest',
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
    options: Array.from({ length: 10 }, (_, i) => ({
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
    options: Array.from({ length: 10 }, (_, i) => ({
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
    components: { GymxAutoSuggest, GymxButton },
    setup() {
      type ExtraOption = {
        text: string;
        value: string;
        extra: number;
        image: string;
      };
      const options = ref(
        Array.from({ length: 20 }, (_, i) => ({
          text: `Text ${i + 1}`,
          value: `Value ${i + 1}`,
          extra: i + 100,
          image: 'https://picsum.photos/seed/picsum/150/50',
        })),
      );

      const extraFilter = (options: ExtraOption[], text: string): Option[] => {
        return options.filter(
          (option) =>
            option.text.includes(text) ||
            option.value.includes(text) ||
            option.extra.toString().includes(text),
        );
      };

      // const model = ref(options.value[2]);
      const model = ref();
      const componentref = ref();

      const addOption = () => {
        const currentLength = options.value.length;
        const newItem = {
          text: `${componentref.value.inputValue} ${currentLength + 1}`,
          value: `${componentref.value.inputValue} Value ${currentLength + 1}`,
          extra: currentLength + 100,
          image: 'https://picsum.photos/seed/picsum/150/50',
        };
        options.value.push(newItem);
        model.value = newItem;
      };
      return {
        args,
        componentref,
        model,
        options,
        addOption,
        extraFilter,
      };
    },
    template: `
      <gymx-auto-suggest
        v-bind="args"
        ref="componentref"
        :options="options"
        label="Search by Amount"
        placeholder="e.g. 100"
        v-model="model"
        class="demo-auto-suggest"
        :expanded="true"
        :filter-function="extraFilter">
        <template #option="{ option }">
          <div class="fancy">
            <img :src="option.image" alt="">
            <span>Custom {{ option.text }} <b>Amount: {{ option.extra }}</b></span>
          </div>
        </template>
        <template #no-results="{ filteredOptionLength, isListOpen }">
         <gymx-button @click="addOption">Add Option</gymx-button>
        </template>
      </gymx-auto-suggest>
      <p>model:</p>
      <pre>{{ model }}</pre>
      <component is="style" scoped>
        .demo-auto-suggest {
          --auto-suggest-list-color-background: var(--input-color-background);
          --auto-suggest-item-block-padding: var(--gymx-size-1);
          max-inline-size: 400px;
        }
        .demo-auto-suggest .auto-suggest__option:nth-child(even) { background: var(--gymx-color-white-1); }
        .auto-suggest__list { max-height: 300px; overflow-y: auto; }
        .fancy {
        display: grid; grid-template-columns: auto 1fr; gap: 1rem;
        & span { display: grid; grid-template-rows: auto auto; gap: 0.2rem; }
        }
        .auto-suggest__no-results {line-height: 1}
      </component>
    `,
  }),
};
