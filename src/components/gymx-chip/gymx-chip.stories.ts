
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxChip } from './gymx-chip.vue';
import { ref } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/chip',
  component: GymxChip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxChip>;

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
    modelValue: 'option 1'
  },
};

export const Multiple: Story = {
  render: () => ({
    setup(args) {
      const colors = ref<string[]>([]);

      return {
        args,
        colors,
      };
    },
    components: {
      GymxChip,
    },
    template: `
      <div class="demo">
        <gymx-chip v-model="colors" value="red" />
        <gymx-chip v-model="colors" value="green" />
        <gymx-chip v-model="colors" value="blue" />
        <pre>{{ colors }}</pre>
      </div>
    <component is="style">
      .demo {
        display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
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
