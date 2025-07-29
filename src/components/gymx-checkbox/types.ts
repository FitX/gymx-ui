import type { UIState } from '@/types';
import type { InputHTMLAttributes } from 'vue';

export interface GymxCheckboxProps<T extends string | number | boolean | Array<string | number>> {
  value?: T extends Array<infer U> ? U : T;
  inputAttributes: InputHTMLAttributes;
  state?: UIState;
}
