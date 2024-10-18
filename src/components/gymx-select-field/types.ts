import type { UIState } from '@/types';
import type { SelectHTMLAttributes } from 'vue';

export type GymxSelectOptionObject<T> = {
  [Property in keyof T]: T[Property];
} & {
  text: string;
};
/*
export type GymxSelectOption = GymxSelectOptionObject */
export type GymxSelectOption<T> = GymxSelectOptionObject<T> | string;

export interface GymxSelectFieldProps<T> {
  label: string,
  options: GymxSelectOption<T>[],
  errorMessage?: string,
  hint?: string,
  state?: UIState;
  id?: string,
  inputAttributes?: SelectHTMLAttributes,
}

export interface GymxSelectFieldSlots {
  'input-start': () => any;
  'input-end': () => any;
  'input-hint': () => any;
  'input-error-message': () => any;
}
