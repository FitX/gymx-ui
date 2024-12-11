import type { UIState } from '@/types';
import type { SelectHTMLAttributes } from 'vue';

export type GymxSelectOption<T> = {
  [Property in keyof T]: T[Property];
} & {
  text: string;
};

export interface GymxSelectProps<T> {
  state?: UIState;
  id?: string;
  inputAttributes?: SelectHTMLAttributes;
  options: GymxSelectOption<T>[];
  placeholder?: string;
}

export interface GymxSelectSlots {
  // 'select-start': () => any;
  'select-end'?: () => any;
  option?: () => any;
}
