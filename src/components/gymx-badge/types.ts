export interface GymxBadgeProps<T extends keyof HTMLElementTagNameMap = 'span'> {
  text?: string | number; // required if the slot is empty
  tag?: T;
}
