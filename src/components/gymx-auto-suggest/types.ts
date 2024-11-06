export interface Option {
  text: string;
  value: string | number;
  disabled?: boolean;
}

export interface GymxAutoSuggestProps {
  disabled?: boolean;
  error?: string;
  expanded?: boolean;
  id?: string;
  label: string;
  loading?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  noResultsText?: string;
  filterFunction?: (options?: Option[], text?: string) => Option[]
}

export interface GymxAutoSuggestEmits {

}
