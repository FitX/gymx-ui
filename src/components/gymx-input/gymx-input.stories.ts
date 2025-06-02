import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import { default as GymxInput } from './gymx-input.vue';
import { computed, ref, toValue } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Form/Input',
  component: GymxInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    a11y: {
      config: {
        // wen know....
        rules: [{ id: 'label', enabled: false }],
      },
    },
    // actions: { argTypesRegex: '^on.*' },
  },
  args: {
    // onClick: fn(),
  },
} satisfies Meta<typeof GymxInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
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
    state: 'disabled',
    modelValue: 'Jon Doe',
  },
};

export const OptionalIconStart: Story = {
  args: {
    'input-start': '🐨',
  },
};

export const OptionalIconEnd: Story = {
  args: {
    'input-end': '🐨',
  },
};

export const WithAttributes: Story = {
  args: {
    modelValue: 'Readonly',
    inputAttributes: {
      'aria-label': 'demo field',
      readonly: true,
    },
  },
};

export const DateInput: Story = {
  args: {
    // modelValue: '2025-08-11',
    type: 'date',
    'onUpdate:modelValue': (e) => console.log('update date', e),
  },
};

export const TimeInput: Story = {
  args: {
    modelValue: '',
    id: 'date-time',
    type: 'time',
    'onUpdate:modelValue': (e) => console.log('update time', e),
  },
};

export const DateTimeInput: Story = {
  args: {
    modelValue: '',
    id: 'date-time',
    type: 'datetime-local',
    'onUpdate:modelValue': (e) => console.log('update time', e),
  },
};

export const DateDemos: Story = {
  decorators: () => ({
    setup(args) {
      const dateTime = ref();
      const dateOnly = ref();
      const timeOnly = ref();
      const dateTimeUi = computed(() => toValue(dateTime) ? new Date(toValue(dateTime))?.toISOString() : null);
      return {
        args,
        timeOnly,
        dateOnly,
        dateTime,
        dateTimeUi,
      };
    },
    components: {
      GymxInput,
    },
    template: '<div style="display: flex; flex-direction: column; gap: 1rem;">' +
      '<gymx-input v-bind="args" v-model="dateTime" type="datetime-local" />' +
      '<gymx-input v-bind="args" v-model="dateOnly" type="date" />' +
      '<gymx-input v-bind="args" v-model="timeOnly" type="time" /></div>' +
      '<pre>date-time: {{ dateTime }} date-time to iso: {{ dateTimeUi}}</pre>' +
      '<pre>date only: {{ dateOnly }}</pre>' +
      '<pre>time only: {{ timeOnly }}</pre>'
  })
};

export const PasswordInput: Story = {
  args: {
    modelValue: '',
    id: 'password',
    type: 'password',
  },
};

export const PasswordInputWithOptions: Story = {
  decorators: () => ({
    setup(args) {
      const modelValue = ref();
      const showPassword = ref(false);

      return {
        args,
        showPassword,
        modelValue,
      };
    },
    components: {
      GymxInput,
    },
    template: `<form style="display: flex; flex-direction: column; gap: 1rem;" @submit.prevent>
      <gymx-input v-bind="args" v-model="modelValue" v-model:show-password="showPassword" id="custom-password" type="password">
        <template #input-show-password="{ toggleShowPassword }">
          <button @click="toggleShowPassword">
            {{ !showPassword ? 'Passwort anzeigen' : 'Passwort verstecken' }}
          </button>
        </template>
      </gymx-input>
    </form>`
  })
};

export const PasswordInputWithoutToggle: Story = {
  args: {
    modelValue: '',
    id: 'password',
    inputAttributes: {
      type: 'password',
    },
  },
};
