
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as GymxToast } from './gymx-toast.vue';
import IconError from '@/assets/icons/error.svg';
import { h, ref, computed } from 'vue';
import { useToast } from '@/composables/use-toast';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Toast',
  component: GymxToast,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GymxToast>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Unstyled Toast',
  },
};

export const Info: Story = {
  args: {
    text: 'Info',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    text: 'Success',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    text: 'Error',
    type: 'error',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'No way!',
    type: 'error',
    icon: h(IconError),
  },
};

export const Usage: Story = {
  args: {},
  render: (args) => ({
    components: {
      GymxToast,
    },
    setup() {
      const {
        toasts,
        addToast,
        removeToast,
      } = useToast();

      const demoId = ref(0); // only for screen-reader content testing

      const add = (type?: string) => {
        demoId.value += 1;
        addToast({
          id: demoId.value,
          msg: type ? `${type} ${demoId.value}` : `Default ${demoId.value}`,
          type,
        })
      };

      const alertMessage = computed(() => toasts.value.find(t => t.type === 'error')?.msg);
      const statusMessage = computed(() => toasts.value.find(t => t.type !== 'error')?.msg);
      return {
        args,
        toasts,
        add,
        removeToast,
        alertMessage,
        statusMessage,
      };
    },
    template: `
      <main style="min-height: 600px;">
        <header>
          Header
        </header>
        <article>
          <h1>Content</h1>
          <p>Lorem Ipsum</p>
          <button @click="add()">Add Toast</button>
          <button @click="add('error')">Add Error Toast</button>
          <button @click="add('warning')">Add Warning Toast</button>
          <button @click="add('success')">Add Success Toast</button>
        </article>
        <section class="toasts">
          <transition-group name="slide">
            <gymx-toast
              v-for="toast in toasts"
              :key="toast.id"
              :text="toast.msg"
              :type="toast.type"
              :role="toast.type === 'error' ? 'alert' : 'status'"
              :duration="toast.duration"
              @close="removeToast(toast.id)"
            />
          </transition-group>
        </section>
      </main>
      <div id="alert-live-region" aria-live="assertive" aria-atomic="false" class="sr-only">
        {{ alertMessage }}
      </div>

      <div id="status-live-region" aria-live="polite" aria-atomic="false" class="sr-only">
        {{ statusMessage }}
      </div>
      <component is="style">
        .toast { min-width: 300px; }
        .toasts {
          position: fixed;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-items: center;
        gap: 1.15rem;
        overflow: hidden;

        @media screen and (min-width: 600px) {
           left: auto;
        }

        .slide-move,
        .slide-enter-active,
        .slide-leave-active {
        transition: all 600ms ease;
        }
        .slide-enter-from,
        .slide-leave-to {
        transform: translateX(100%);
        }

        .slide-leave-active {
        /* position: absolute; */
        }
      </component>
    `,
  })
};

