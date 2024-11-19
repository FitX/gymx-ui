import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxBadge } from './gymx-badge.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Badge',
  component: GymxBadge,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    text: 'Badge',
  },
} satisfies Meta<typeof GymxBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {};

export const ExampleStyles: Story = {
  render: (args) => ({
    components: { GymxBadge },
    setup() {
      return { args };
    },
    template: `
      <div class="badges-demo">
        <gymx-badge v-for="n in 5" text="Demo" :class="'badge-'+n" />
      </div>
      <component is="style">
        .badges-demo { display: flex; gap: 1rem; }
        .badge-1 { --badge-color-background: #0090FF; --badge-color-text: #fff; }
        .badge-2 { --badge-color-background: #E93D82; --badge-color-text: #fff; }
        .badge-3 { --badge-color-background: #FFE629; --badge-color-text: #121212; }
        .badge-4 { --badge-color-background: #ECEEED; --badge-color-text: #121212; }
        .badge-5 { --badge-padding-inline: 2rem; --badge-radius: 2rem; &:hover { --badge-radius: 0; } }
      </component>
    `,
  }),
};
