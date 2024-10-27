
export interface GymxDialogProps {
  title?: string;
  isModal?: boolean;
  closeOnOutside?: boolean;
}

export interface GymxDialogSlots {
  header?: () => any;
  content?: () => any;
  footer?: () => any;
}
