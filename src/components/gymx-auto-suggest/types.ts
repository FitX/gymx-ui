import type { InputHTMLAttributes } from 'vue';

export interface Option {
  text: string;
  value: string | number;
  disabled?: boolean;
}

export interface GymxAutoSuggestProps <T extends Option>{
  disabled?: boolean;
  errorMessage?: string;
  expanded?: boolean;
  id?: string;
  label: string;
  name: string;
  options: T[];
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  noResultsText?: string;
  filterFunction?: (options?: T[], text?: string) => T[];
  inputAttributes?: InputHTMLAttributes;
}

export interface GymxAutoSuggestEmits {}
