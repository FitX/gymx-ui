
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxCheckbox } from './gymx-checkbox.vue';
import { ref } from 'vue';
import { GymxLabel } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/checkbox',
  component: GymxCheckbox,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    modelValue: true,
    value: true,
  },
};

export const Single: Story = {
  render: () => ({
    setup(args) {
      const singleBool = ref<boolean>();
      const singleString = ref<string>();
      const singleNumber = ref<string>();

      return {
        args,
        singleBool,
        singleString,
        singleNumber,
      };
    },
    components: {
      GymxCheckbox,
      GymxLabel,
    },
    template: `<form style="display: flex; gap: 1rem;" @submit.prevent>
      <fieldset>
        <legend>Single Typpes</legend>
        <div class="item">
          <gymx-label for="single-bool">Single boolean</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleBool" :value="true" :input-attributes="{ id: 'single-bool' }" />
        </div>
        <div class="item">
          <gymx-label for="single-string">Single string</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleString" value="a string" :input-attributes="{ id: 'single-string' }" />
        </div>
        <div class="item">
          <gymx-label for="single-number">Single number</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleNumber" :value="1" :input-attributes="{ id: 'single-number' }" />
        </div>
      </fieldset>
      <div>
        <pre>single boolean: {{ singleBool }}</pre>
        <pre>single string: {{ singleString }}</pre>
        <pre>single number: {{ singleNumber }}</pre>
      </div>
    </form>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `Usage of multiple checkboxes`,
      },
    },
  },
};

export const Multiple: Story = {
  render: () => ({
    setup(args) {
      const fruits = ref<string[]>([]);
      const colors = ref<string[]>([]);

      return {
        args,
        fruits,
        colors,
      };
    },
    components: {
      GymxCheckbox,
      GymxLabel,
    },
    template: `<form style="display: flex; gap: 1rem;" @submit.prevent>
      <fieldset>
        <legend>Fruits</legend>
        <div class="item">
          <gymx-label for="apple">Apple</gymx-label>
          <gymx-checkbox v-bind="args" v-model="fruits" value="apple" name="fruits" :input-attributes="{ id: 'apple' }" />
        </div>
        <div class="item">
          <gymx-label for="banana">Banana</gymx-label>
          <gymx-checkbox v-bind="args" v-model="fruits" value="banana" name="fruits" :input-attributes="{ id: 'banana' }" />
        </div>
        <div class="item">
          <gymx-label for="peach">Peach</gymx-label>
          <gymx-checkbox v-bind="args" v-model="fruits" value="peach" name="fruits" :input-attributes="{ id: 'peach' }" />
        </div>
      </fieldset>
      <fieldset>
        <legend>Colors</legend>
        <div class="item">
          <gymx-label for="red">Red</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="red" name="colors" :input-attributes="{ id: 'red' }" />
        </div>
        <div class="item">
          <gymx-label for="green">Green</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="green" name="colors" :input-attributes="{ id: 'green' }" />
        </div>
        <div class="item">
          <gymx-label for="blue">Blue</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="blue" name="colors" :input-attributes="{ id: 'blue' }" />
        </div>
      </fieldset>
      <pre>fruits {{ fruits }}</pre>
      <pre>colors {{ colors }}</pre>
    </form>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `Usage of multiple checkboxes`,
      },
    },
  },
};

