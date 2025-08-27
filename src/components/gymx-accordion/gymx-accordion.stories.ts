
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAccordion } from './gymx-accordion.vue';
import { ref } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/accordion',
  component: GymxAccordion,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    title: 'This is an collapseable message',
    content: 'Lorem Ipsum Dolor Sit Amet',
  },
};

export const WithSlots: Story = {
  args: {
  },
  render: (args) => ({
    components: { GymxAccordion },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="wrapper" style="min-block-size: 200px;">
        <gymx-accordion>
          <template #title>Accordion 1</template>
          <template #default>Accordion 1 Content</template>
        </gymx-accordion>
        <gymx-accordion>
          <template #title>Accordion 2</template>
          <template #default>Accordion 2 Content</template>
        </gymx-accordion>
      </div>
      <component is="style" scoped>
      </component>
    `,
  }),
};

export const AutoClose: Story = {
  args: {
  },
  render: (args) => ({
    components: { GymxAccordion },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="wrapper" style="min-block-size: 300px;">
        <gymx-accordion name="auto-close">
          <template #title>Accordion 1</template>
          <template #default>Accordion 1 Content</template>
        </gymx-accordion>
        <gymx-accordion name="auto-close" open>
          <template #title>Accordion 1</template>
          <template #default>
            <p>Accordion 2 Content</p>
            <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam &hellip;</p>
          </template>
        </gymx-accordion>
        <gymx-accordion name="auto-close">
          <template #title>Accordion 3</template>
          <template #default>Accordion 3 Content</template>
        </gymx-accordion>
      </div>
      <component is="style" scoped>
      </component>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `Multiple <gymx-accordion> elements with the same name attribute form a logical group.
Within this group, only one element can be open at a time - opening a new one automatically closes the previously open element.`,
      },
    },
  },
};

