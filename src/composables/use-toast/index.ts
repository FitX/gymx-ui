import { ref } from 'vue';
import type { GymxToastProps } from 'src/components/gymx-toast';

export interface Toast {
  id: number;
  type: GymxToastProps['type'];
  msg: string;
  duration?: number;
}

const DEFAULT_DURATION = 6000;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const useToast = () => {
  const toasts = ref<Toast[]>([]);
  const id = ref(0);

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const addToast = (toastContent: Optional<Omit<Toast, 'id'>, 'type'>) => {
    if (!toastContent.msg) throw new Error('Message is required');
    id.value += 1;

    toasts.value.unshift({
      id: id.value,
      type: toastContent?.type || 'info',
      msg: toastContent.msg,
      duration:
        toastContent.duration || toastContent?.type === 'error' ? undefined : DEFAULT_DURATION,
    });
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
