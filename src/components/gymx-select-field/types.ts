import type { GymxSelectOption, GymxSelectProps, GymxSelectSlots } from '@/components';

export interface GymxSelectFieldOption<T = object> extends GymxSelectOption {}

export interface GymxSelectFieldProps extends GymxSelectProps {
  label: string,
  errorMessage?: string,
  hint?: string,
}

export interface GymxSelectFieldSlots extends GymxSelectSlots {
  'input-hint'?: () => any;
  'input-error-message'?: () => any;
}
