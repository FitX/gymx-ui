import type { UIState } from '@/types';
import type { InputHTMLAttributes } from 'vue';

export interface GymxInputProps {
  type?: HTMLInputElement['type'], //InputTypeHTMLAttribute
  state?: UIState;
  id?: string,
  inputAttributes?: InputHTMLAttributes,
}
