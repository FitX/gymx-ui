import type { UIState } from '@/types';

export interface GymxButtonProps {
  tag?: 'button' | 'span' | 'a'; // default button
  state?: UIState;
}

export interface GymxButtonSlots {
  'icon-start': () => any;
  default: () => any;
  'icon-end': () => any;
}
