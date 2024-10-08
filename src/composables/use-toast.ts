import { ref } from 'vue';
import type { GymxNotificationProps } from '@/components/gymx-notification';

export interface Toast {
  id: number,
  type: GymxNotificationProps['type'],
  msg: string,
  duration?: number,
}

const DEFAULT_DURATION = 6000;

export const useToast = () => {
  const toasts = ref<Toast[]>([]);
  const id = ref(0);

  const removeToast = (id: number) => {
    toasts.value = toasts.value
      .filter((toast) => toast.id !== id);
  };

  const addToast = (toastContent: Omit<Toast, 'id' | 'type'>) => {
    if (!toastContent.msg) throw new Error('Message is required');
    id.value += 1;

    toasts.value.push({
      id: id.value,
      type: toastContent.type || 'info',
      msg: toastContent.msg,
      duration: toastContent.duration || DEFAULT_DURATION,
    });
  };

  return {
    toasts,
    addToast,
    removeToast,
  }
};
