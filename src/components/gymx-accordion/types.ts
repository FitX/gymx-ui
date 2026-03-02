export interface GymxAccordionProps {
  title?: string;
  content?: string;
  open?: boolean; // modelValue
  nativeIcons?: boolean; // shows native details ::marker if set to true and icon-start slot is empty
}

export interface GymxAccordionSlots {
  'icon-start'?: (scope: { open: boolean }) => any;
  title?: () => any; // summary slot
  'icon-end'?: (scope: { open: GymxAccordionProps['open'] }) => any;
  default?: () => any; // Content slot
}
