import type { GymxSelectOption, GymxSelectProps, GymxSelectSlots } from '@/components';

export type GymxSelectFieldOption<T> = GymxSelectOption<T>;

export interface GymxSelectFieldProps<T> extends GymxSelectProps<T> {
  label: string;
  errorMessage?: string;
  hint?: string;
}

export interface GymxSelectFieldSlots extends GymxSelectSlots {
  'input-hint'?: () => any;
  'input-error-message'?: () => any;
}
