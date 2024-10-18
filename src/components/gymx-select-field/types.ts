import type { UIState } from '@/types';
import type { SelectHTMLAttributes } from 'vue';

/* export type GymxSelectOptionObject<T> = {
  [Property in keyof T]: T[Property];
} & {
  text: string;
}; */

/* export type GymxSelectOption<T extends object> = T extends object
  ? ({
    [Property in keyof T]: T[Property];
  } & {
    text: string;
  })
  : T; */

export type GymxSelectOption<T extends object> = {
    [Property in keyof T]: T[Property];
  } & {
    text: string;
  }

export interface GymxSelectFieldProps<T extends object> {
  label: string,
  errorMessage?: string,
  hint?: string,
  state?: UIState;
  id?: string,
  inputAttributes?: SelectHTMLAttributes,
  options: GymxSelectOption<T>[]
}

export interface GymxSelectFieldSlots {
  'input-start': () => any;
  'input-end': () => any;
  'input-hint': () => any;
  'input-error-message': () => any;
}
