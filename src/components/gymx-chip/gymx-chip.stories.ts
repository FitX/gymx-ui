
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxChip } from './gymx-chip.vue';
import { ref } from 'vue';
import type { ChipValue } from '@/components/gymx-chip/types.ts';
import { default as GymxBadge } from '@/components/gymx-badge/gymx-badge.vue';

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

export const Single: Story = {
  render: () => ({
    setup(args) {
      const color = ref<string>();
      const number = ref<number>();

      return {
        args,
        color,
        number,
      };
    },
    components: {
      GymxChip,
    },
    template: `
      <div class="demo">
        <h3 class="demo__headline">Primitive string</h3>
        <gymx-chip v-model="color" value="red" />
        <gymx-chip v-model="color" value="green" />
        <gymx-chip v-model="color" value="blue" />
        <pre>{{ color }}</pre>
      </div>

      <div class="demo">
        <h3 class="demo__headline">Primitive number</h3>
        <gymx-chip v-model="number" :value="2" />
        <gymx-chip v-model="number" :value="42" />
        <gymx-chip v-model="number" :value="84" />
        <pre>{{ number }}</pre>
      </div>
    <component is="style">
      .demo {
        display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      }
      .demo__headline {
      flex: 1 0 100%;
      }
      pre { display: contents; }
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

export const SingleObjectWithSlot: Story = {
  render: () => ({
    setup(args) {
      const selectedType = ref<ChipValue>();

      return {
        args,
        selectedType,
      };
    },
    components: {
      GymxChip,
    },
    template: `
      <div class="demo">
        <gymx-chip v-model="selectedType" :value="{ value: 'red', type: 'string' }">
          <template #default="{ value: slotValue }">{{ slotValue.value }}</template>
        </gymx-chip>
        <gymx-chip v-model="selectedType" :value="{ value: 5, type: 'number' }">
          <template #default="{ value: slotValue }">{{ slotValue.value }}</template>
        </gymx-chip>
      </div>
      <div class="demo">
        <pre class="demo__code">{{ selectedType }}</pre>
      </div>
    <component is="style">
      .demo {
        display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      }
      .demo__code { flex: 1 0 100%; }
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
      </div>
      <div class="demo">
        <pre>{{ colors }}</pre>
      </div>
    <component is="style">
      .demo {
        display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      }
      pre { display: contents; }
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

export const WithSlot: Story = {
  render: () => ({
    setup(args) {
      const filter = ref([{
        label: 'Filter 1',
        value: 1,
        count: undefined,
      }, {
        label: 'Filter 2',
        value: 2,
        count: 99,
      }, {
        label: 'Filter 3',
        value: 3,
        count: 1,
      }])
      const selectedFilter = ref<ChipValue[]>([]);

      return {
        args,
        selectedFilter,
        filter,
      };
    },
    components: {
      GymxChip,
      GymxBadge,
    },
    template: `
      <div class="demo">
        <gymx-chip v-for="filter in filter" :key="filter.value" v-model="selectedFilter" :value="filter" >
          <template #default="{ value: slotValue }">{{ slotValue.label }}</template>
          <template #count><gymx-badge v-if="filter.count" class="badge-rounded">{{ filter.count }}</gymx-badge></template>
        </gymx-chip>
      </div>
      <div class="demo">
        <pre class="demo__code">{{ selectedFilter }}</pre>
      </div>
    <component is="style">
      .demo {
        display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      }
      .demo__code { flex: 1 1 100%; }
      .badge-rounded {
      --badge-radius: 50%;
      --badge-color-background: var(--gymx-color-gray-4);
      --badge-font-size: 0.75em;
      --badge-padding-inline: 0.2em;
      --badge-padding-block: 0.2em;
      inline-size: 3ch;
      aspect-ratio: 1;
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
