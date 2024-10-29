import type { UIState } from '@/types';
import type { SelectHTMLAttributes } from 'vue';

export type GymxSelectOption<T extends object = {}> = {
  [Property in keyof T]: T[Property];
} & {
  text: string;
};

export interface GymxSelectProps {
  state?: UIState;
  id?: string;
  inputAttributes?: SelectHTMLAttributes;
  options: GymxSelectOption<object>[];
  placeholder?: string;
}

export interface GymxSelectSlots {
  // 'select-start': () => any;
  'select-end'?: () => any;
  option?: () => any;
}
