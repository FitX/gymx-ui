
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxToggleSwitch } from './gymx-toggle-switch.vue';
import { IconCheckmark } from '@/components';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Toggle Switch',
  component: GymxToggleSwitch,
  args: {
    label: 'Toggle Switch',
    modelValue: false,
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {

  },
};

export const Activated: Story = {
  args: {
    modelValue: true,
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
  },
};

export const Focused: Story = {
  args: {
    state: 'focused',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: true,
    state: 'disabled',
  },
};

export const WithIcon: Story = {
  args: {
    modelValue: true,
    // thumb: () => (h(IconCheckmark, { style: '--icon-width: 10px; --icon-height: 10px; padding: 2px;'}))
  },
  render: (args) => ({
    components: {
      GymxToggleSwitch,
      IconCheckmark,
    },
    setup() {
      return { args };
    },
    template: `
      <component is="style">
        :where(.demo) {
        --icon-width: 10px;
        --icon-height: 10px;
        }
        :where(.toggle-switch--off .demo-icon) {
          opacity: 0;
        }
      </component>
      <div class="demo">
        <gymx-toggle-switch v-bind="args">
          <template #thumb><icon-checkmark class="demo-icon" /></template>
        </gymx-toggle-switch>
      </div>
    `,
  })
};
