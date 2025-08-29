
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxAccordion } from './gymx-accordion.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Accordion',
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
      <div class="wrapper" style="min-block-size: 130px;">
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
      <div class="wrapper" style="min-block-size: 240px;">
        <gymx-accordion name="auto-close">
          <template #title>Accordion 1</template>
          <template #default>Accordion 1 Content</template>
        </gymx-accordion>
        <gymx-accordion name="auto-close" open>
          <template #title>Accordion 2</template>
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
        story: `Multiple &lt;gymx-accordion&gt; elements with the same name attribute form a logical group.
Within this group, only one element can be open at a time - opening a new one automatically closes the previously open element.`,
      },
    },
  },
};

export const CustomIcon: Story = {
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
      <div class="wrapper" style="min-block-size: 130px;">
        <gymx-accordion custom-icon class="custom-icon">
          <template #icon-start="{ open }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="icon" :class="{ 'icon--open' : open }">
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </template>
          <template #title>Accordion 1</template>
          <template #default>Accordion 1 Content</template>
        </gymx-accordion>
        <gymx-accordion custom-icon class="custom-icon">
          <template #icon-start="slotProps">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="icon" :class="{ 'icon--open' : slotProps.open }">
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </template>
          <template #title>Accordion 2</template>
          <template #default>Accordion 2 Content</template>
        </gymx-accordion>
      </div>
      <component is="style" scoped>
        .icon {
        inline-size: 1rem;
        aspect-ratio: 1;
        margin-inline-start: 1rem;
        order: 2;
        transition: rotate 0.5s ease;
        }
        .icon--open {
        rotate: 180deg;
        }
      </component>
    `,
  }),
};

export const NativeIcons: Story = {
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
      <div class="wrapper" style="min-block-size: 240px;">
        <gymx-accordion name="auto-close" native-icons>
          <template #title>Accordion 1</template>
          <template #default>Accordion 1 Content</template>
        </gymx-accordion>
        <gymx-accordion name="auto-close" native-icons open>
          <template #title>Accordion 1</template>
          <template #default>
            <p>Accordion 2 Content</p>
            <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam &hellip;</p>
          </template>
        </gymx-accordion>
        <gymx-accordion name="auto-close" native-icons>
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
        story: `&lt;gymx-accordion&gt; use the &lt;details&gt; HTML Tag.
        For display native ::marker add *native-icons* prop.`,
      },
    },
  },
};
