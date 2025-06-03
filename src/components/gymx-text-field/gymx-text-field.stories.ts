import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxTextField } from './gymx-text-field.vue';
import { ref } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Form/Text Field',
  component: GymxTextField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: 'Firstname',
  },
} satisfies Meta<typeof GymxTextField>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    onClick: () => console.log('onclick'),
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

export const HasHint: Story = {
  args: {
    modelValue: '',
    hint: 'The part of your name before your last name',
  },
};

export const HasError: Story = {
  args: {
    modelValue: '',
    errorMessage: 'Please enter your name',
  },
};

export const WithErrorAndHint: Story = {
  args: {
    modelValue: '',
    hint: 'The part of your name before your last name',
    errorMessage: 'Please enter your name',
  },
};


export const PasswordInput: Story = {
  args: {
    label: 'Password jojo',
    modelValue: '',
    showPasswordText: 'password visibility toggle',
    id: 'password-example',
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
      GymxTextField,
    },
    template: `<form style="display: flex; flex-direction: column; gap: 1rem;" @submit.prevent>
      <gymx-text-field v-bind="args" label="Password" v-model="modelValue" v-model:show-password="showPassword" id="custom-password" type="password">
        <template #input-show-password="{ toggleShowPassword }">
          <button @click="toggleShowPassword">
            {{ !showPassword ? 'Passwort anzeigen' : 'Passwort verstecken' }}
          </button>
        </template>
      </gymx-text-field>
    </form>`
  })
};

export const PasswordInputWithoutToggle: Story = {
  args: {
    label: 'Password',
    modelValue: '',
    id: 'password',
    inputAttributes: {
      type: 'password',
    },
  },
};
