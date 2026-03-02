import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxRadio } from './gymx-radio.vue';
import { ref } from 'vue';
import { GymxLabel } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Form/Radio',
  component: GymxRadio,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxRadio>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    value: 'option 1',
    modelValue: '',
  },
};

export const Example: Story = {
  render: () => ({
    setup(args) {
      const singleBool = ref<boolean>(true);
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
      GymxRadio,
      GymxLabel,
    },
    template: `<form style="display: flex; gap: 1rem;" @submit.prevent>
      <fieldset>
        <legend>boolean</legend>
        <div class="item">
          <gymx-label for="bool-true">true value</gymx-label>
          <gymx-radio v-bind="args" v-model="singleBool" id="bool-true" :value="true" />
        </div>
        <div class="item">
          <gymx-label for="bool-false">false value</gymx-label>
          <gymx-radio v-bind="args" v-model="singleBool" id="bool-false" :value="false" />
        </div>
        <div>
          <pre>{{ singleBool }}</pre>
        </div>
      </fieldset>
      <fieldset>
        <legend>string</legend>
        <div class="item">
          <gymx-label for="string-yes">yes</gymx-label>
          <gymx-radio v-bind="args" v-model="singleString" value="yes" id="string-yes" />
        </div>
        <div class="item">
          <gymx-label for="string-no">no</gymx-label>
          <gymx-radio v-bind="args" v-model="singleString" value="no" id="string-no" />
        </div>
        <div>
          <pre>{{ singleString }}</pre>
        </div>
      </fieldset>
      <fieldset>
        <legend>number</legend>
        <div class="item">
          <gymx-label for="number-one">One</gymx-label>
          <gymx-radio v-bind="args" v-model="singleNumber" :value="1" id="number-one" />
        </div>
        <div class="item">
          <gymx-label for="number-two">Two</gymx-label>
          <gymx-radio v-bind="args" v-model="singleNumber" :value="2" id="number-two" />
        </div>
        <div>
          <pre>{{ singleNumber }}</pre>
        </div>
      </fieldset>
    </form>

    <component is="style">
      fieldset {
        margin-trim: block-end;
      }
      .item {
        display: inline-flex;
        margin-block-end: 1rem;
        margin-inline-end: 1rem;
      align-items: center;
        .radio {
          order: -1;
          flex-shrink: 0;
        }
        .label {
          padding-inline-start: 0.6rem;
          inline-size: max-content;
        }
      }
    </component>`,
  }),
};

export const DisabledState: Story = {
  args: {
    modelValue: true,
    value: true,
    state: 'disabled',
  },
};
