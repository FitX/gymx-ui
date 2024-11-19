import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAppHeader } from './gymx-app-header.vue';
import { GymxButton } from '@/components';
import { defineComponent, h } from 'vue';

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="36" viewBox="0 0 41 36" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M30.0084 18.3047L41 6.56688C37.5039 3.81917 32.7629 1.76505 27.3863 0.804688L20.5 8.16749L13.6137 0.804688C8.23708 1.76505 3.49612 3.79249 0 6.56688L10.9916 18.3047L0 30.0425C3.49612 32.7902 8.23708 34.8443 13.6137 35.8047L20.5 28.4419L27.3863 35.8047C32.7629 34.8443 37.5039 32.8166 41 30.0425L30.0084 18.3047Z"
                fill="#ED6A12 "/>
        </svg>`;

const demoLogo = defineComponent({ name: 'demoLogo', template: logo });
const demoActions = defineComponent({
  name: 'demoActions',
  components: { GymxButton },
  template: '<gymx-button>Ausloggen</gymx-button>',
});

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Layout/App Header',
  component: GymxAppHeader,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxAppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    title: 'Fancy App',
  },
  render: (args) => ({
    components: {
      GymxAppHeader,
      GymxButton,
      demoLogo,
    },
    data() {
      return {
        args,
      };
    },
    template: `
    <gymx-app-header v-bind="args">
      <template #logo>
       <demo-logo />
      </template>
      <template #actions>
        <gymx-button>Ausloggen</gymx-button>
      </template>
    </gymx-app-header>`,
  }),
};

export const LogoOnly: Story = {
  args: {
    logo: () => h(demoLogo),
  },
};

export const LogoWithTitle: Story = {
  args: {
    logo: () => h(demoLogo),
    title: 'Title',
  },
};

export const LogoWithActions: Story = {
  args: {
    logo: () => h(demoLogo),
    actions: () => h(demoActions),
  },
};

export const TitleWithActions: Story = {
  args: {
    title: 'title',
    actions: () => h(demoActions),
  },
};

export const ActionsOnly: Story = {
  args: {
    actions: () => h(demoActions),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'title',
  },
};
