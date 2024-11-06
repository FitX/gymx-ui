import type { InputHTMLAttributes } from 'vue';

export interface Option {
  text: string;
  value: string | number;
  disabled?: boolean;
}

export interface GymxAutoSuggestProps {
  disabled?: boolean;
  errorMessage?: string;
  expanded?: boolean;
  id?: string;
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  noResultsText?: string;
  filterFunction?: (options?: Option[], text?: string) => Option[];
  inputAttributes?: InputHTMLAttributes;
}

export interface GymxAutoSuggestEmits {

}
