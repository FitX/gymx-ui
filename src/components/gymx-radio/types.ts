import type { InputHTMLAttributes } from 'vue';
import type { UIState } from '@/types';

export interface GymxRadioProps<T extends string | number | boolean> {
  value?: T;
  id?: string;
  inputAttributes?: InputHTMLAttributes;
  state?: UIState;
}
