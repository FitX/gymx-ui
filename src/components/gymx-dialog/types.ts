
export interface GymxDialogProps {
  title?: string;
  /**
   * Whether the dialog should be modal or not.
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
   */
  isModal?: boolean;
  modelValue?: boolean;
  closeOnOutside?: boolean;
}

export interface GymxDialogSlots {
  header?: () => any;
  default?: () => any;
  footer?: () => any;
}
