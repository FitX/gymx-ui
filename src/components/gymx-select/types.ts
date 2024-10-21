import type { UIState } from '@/types';
import type { SelectHTMLAttributes } from 'vue';

export type GymxSelectOption<T extends object> = {
  [Property in keyof T]: T[Property];
} & {
  text: string;
}

export interface GymxSelectProps<T extends GymxSelectOption<T>> {
  state?: UIState;
  id?: string,
  inputAttributes?: SelectHTMLAttributes,
  options: T[]
}

export interface GymxSelectSlots {
  'select-start': () => any;
  'select-end': () => any;
}
