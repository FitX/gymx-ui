import type { GymxInputProps, GymxInputSlots } from '@/components';
import type { TextareaHTMLAttributes } from 'vue';

export interface GymxTextareaProps extends GymxInputProps {
  label: string;
  errorMessage?: string;
  hint?: string;
  autoGrow?: boolean;
  inputAttributes?: TextareaHTMLAttributes;
}

export interface GymxTextareaSlots extends GymxInputSlots {
  'input': () => any;
  'input-hint': () => any;
  'input-error-message': () => any;
}
