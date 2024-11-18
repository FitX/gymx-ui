
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import { default as GymxAppLayout } from './gymx-app-layout.vue';
import { GymxAppContent, GymxAppHeader, GymxLink } from '@/components';
import { default as FormExample } from '../../../docs/demo/forms-example.vue';
import Readme from './readme.md?raw';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Layout/App Layout',
  component: GymxAppLayout,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Readme,
      }
    }
  }
} satisfies Meta<typeof GymxAppLayout>;

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
  render: (args) => ({
    components: {
      GymxAppLayout,
      GymxAppHeader,
      GymxAppContent,
      GymxLink,
      FormExample,
    },
    data() {
      return {
        args,
      }
    },
    template: `
    <gymx-app-layout v-bind="args">
      <template #header>
        <gymx-app-header title="Example App">
          <template #logo>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="36" viewBox="0 0 41 36" fill="none" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.0084 18.3047L41 6.56688C37.5039 3.81917 32.7629 1.76505 27.3863 0.804688L20.5 8.16749L13.6137 0.804688C8.23708 1.76505 3.49612 3.79249 0 6.56688L10.9916 18.3047L0 30.0425C3.49612 32.7902 8.23708 34.8443 13.6137 35.8047L20.5 28.4419L27.3863 35.8047C32.7629 34.8443 37.5039 32.8166 41 30.0425L30.0084 18.3047Z"
                    fill="var(--gymx-color-accent, #ED6A12)"/>
            </svg>
          </template>
          <template #actions>
            <gymx-link>Ausloggen</gymx-link>
          </template>
        </gymx-app-header>
      </template>
      <template #main>
        <gymx-app-content>
          <form-example />
        </gymx-app-content>
      </template>
      <template #footer><small>© 2024 GymX</small></template>
    </gymx-app-layout>
    `,
  })
};

export const WithHeader: Story = {
  args: {
    header: h('h1', 'Title')
  },
};

export const WithFooter: Story = {
  args: {
    footer: h('small', '© 2024 GymX')
  },
};

export const Empty: Story = {
  args: {
    main: ''
  },
};

