import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxCheckbox } from './gymx-checkbox.vue';
import { ref } from 'vue';
import { GymxLabel } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Checkbox',
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
        <legend>Single Types</legend>
        <div class="item">
          <gymx-label for="single-bool">Single boolean</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleBool" id="single-bool" />
        </div>
        <div class="item">
          <gymx-label for="single-string">Single string</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleString" value="a string" id="single-string" />
        </div>
        <div class="item">
          <gymx-label for="single-number">Single number</gymx-label>
          <gymx-checkbox v-bind="args" v-model="singleNumber" :value="1" id="single-number" />
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
        story: `Usage of multiple checkboxes. Single boolean can be used without value (v-model only).`,
      },
    },
  },
};

export const Multiple: Story = {
  render: () => ({
    setup(args) {
      const fruits = ref<string[]>([]);
      const colors = ref<string[]>([]);

      const fruitsMap = new Map([
        ['apple', '\u{1F34F}'],
        ['banana', '\u{1F34C}'],
        ['peach', '\u{1F351}'],
      ]);

      const getIcon = (fruit: string) => fruitsMap.get(fruit);

      return {
        args,
        fruits,
        colors,
        getIcon,
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
          <gymx-checkbox v-bind="args" v-model="fruits" value="apple" name="fruits" id="apple" />
        </div>
        <div class="item">
          <gymx-label for="banana">Banana</gymx-label>
          <gymx-checkbox v-bind="args" v-model="fruits" value="banana" name="fruits" id="banana" />
        </div>
        <div class="item">
          <gymx-label for="peach">Peach</gymx-label>
          <gymx-checkbox v-bind="args" v-model="fruits" value="peach" name="fruits" id="peach" />
        </div>
      </fieldset>
      <fieldset>
        <legend>Colors</legend>
        <div class="item">
          <gymx-label for="red">Red</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="red" name="colors" id="red" />
        </div>
        <div class="item">
          <gymx-label for="green">Green</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="green" name="colors" id="green" />
        </div>
        <div class="item">
          <gymx-label for="blue">Blue</gymx-label>
          <gymx-checkbox v-bind="args" v-model="colors" value="blue" name="colors" id="blue" />
        </div>
      </fieldset>
      <div class="demo">
        <h3>Fruits</h3>
        <ul>
          <li v-for="fruit in fruits" :key="fruit">
            {{ getIcon(fruit) }} {{ fruit }}
          </li>
        </ul>
      </div>

      <div class="demo">
      <h3>Colors</h3>
      <ul>
        <li v-for="color in colors" :key="color" class="demo__color" :style="{ '--demo-item-background': color }">
          {{ color }}
        </li>
      </ul>
      </div>


    </form>
    <component is="style">
      .demo {
        & ul { list-style: none; margin: 1rem 0; padding: 0; }

        & li {
        background: var(--demo-item-background);
        padding: 0.2rem;
        color: light-dark(#999, #fff);
      }

        & .demo__color {
          color: #fff}

      }
      fieldset {
        margin-trim: block-end;
      }
      .item {
      display: inline-flex;
      margin-block-end: 1rem;
      align-items: center;
        margin-block-end: 1rem;
        .checkbox {
          order: -1;
        }
      .label {
      padding-inline-start: 0.6rem;
      inline-size: max-content;
      }
      }
    </component>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `Usage of multiple checkboxes`,
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    modelValue: true,
    value: true,
    state: 'disabled',
  },
};
