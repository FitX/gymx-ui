import type { UIState } from '@/types';

export interface GymxLinkProps {
  tag?: 'button' | 'span' | 'a'; // default a
  /**
   * Exclude<UIState, 'disabled'>
   */
  state?: Exclude<UIState, 'disabled'>;
}

export interface GymxLinkSlots {
  'icon-start': () => any,
  default: () => any,
  'icon-end': () => any,
}
