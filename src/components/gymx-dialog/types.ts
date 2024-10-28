
export interface GymxDialogProps {
  title?: string;
  isModal?: boolean;
  modelValue?: boolean;
  closeOnOutside?: boolean;
}

export interface GymxDialogSlots {
  header?: () => any;
  default?: () => any;
  footer?: () => any;
}
