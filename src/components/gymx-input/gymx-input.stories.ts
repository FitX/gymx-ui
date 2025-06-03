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
  parameters: {
    docs: {
      description: {
        story: `
## 🔐 Password Visibility – Feature Overview

This input component includes built-in support for toggling password visibility,
providing enhanced usability and accessibility for password fields.

### 🧩 Props Related to Password Functionality
- **type** (HTMLInputElement['type'])
  When set to 'password', the component enables password visibility toggling.

- **showPasswordText** (string, default: 'show password')
  Defines the accessible label (aria-label) for the toggle button used to show/hide the password.

- **resetTimeShowPassword** (number, default: 8000)
  Optional. If set, the password will automatically be hidden again after the
  specified time in milliseconds to reducing the risk of exposure.

- **show-password** (v-model, boolean)
  A two-way bound value indicating whether the password is currently visible.

### 🧷 Slots Related to Password

- **input-show-password**
  Allows injection of a custom password toggle button.
  Receives { toggleShowPassword } as a slot prop.

- **input-start / input-end**
  Used to place custom elements (e.g. icons or labels) before or after the input field.
  Note: The password toggle is rendered inside input-end by default.

### ✅ Accessibility

- The toggle button includes:
  - aria-label from showPasswordText
  - aria-pressed reflecting the current visibility state
- Icon changes visually indicate the password's visibility status (IconEye / IconEyeClosed).
        `,
      }
    },
  },
};

export const PasswordInputWithSlot: Story = {
  args: {
    modelValue: '',
  },
  decorators: () => ({
    setup(args) {
      const showPassword = ref(false);

      return {
        args,
        showPassword,
      };
    },
    components: {
      GymxInput,
    },
    template: `<form style="display: flex; flex-direction: column; gap: 1rem;" @submit.prevent>
      <gymx-input v-bind="args" v-model="args.modelValue" v-model:show-password="showPassword" id="custom-password" type="password">
        <template #input-show-password="{ toggleShowPassword }">
          <button @click="toggleShowPassword">
            {{ !showPassword ? 'Passwort anzeigen' : 'Passwort verstecken' }}
          </button>
        </template>
      </gymx-input>
    </form>`
  }),
  render: () => ({}),
  parameters: {
    docs: {
      description: {
        story: `Alternatively, you can use the **input-show-password slot** to inject a custom toggle button.`,
      },
    },
  }
};

export const PasswordInputSimple: Story = {
  args: {
    modelValue: '',
    id: 'password',
    inputAttributes: {
      type: 'password',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `### Alternative: Password Input without Toggle Button
By using the **input-attributes** prop, you can set the input's type to 'password' and omit the toggle button.`,
      },
    },
  }
};
