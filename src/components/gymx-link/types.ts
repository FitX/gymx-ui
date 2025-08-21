import type { UIState } from '@/types';

export interface GymxLinkProps<T extends keyof HTMLElementTagNameMap> {
  /**
   * Exclude<UIState, 'disabled'>
   */
  tag?: T;
  state?: Exclude<UIState, 'disabled'>;
}

export interface GymxLinkSlots {
  'icon-start': () => any;
  default: () => any;
  'icon-end': () => any;
}
