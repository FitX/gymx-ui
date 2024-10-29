import type { GymxInputProps, GymxInputSlots } from '@/components';

export interface GymxTextFieldProps extends GymxInputProps {
  label: string;
  errorMessage?: string;
  hint?: string;
}

export interface GymxTextFieldSlots extends GymxInputSlots {
  'input-hint': () => any;
  'input-error-message': () => any;
}
