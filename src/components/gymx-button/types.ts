import type { UIState } from '@/types';

export interface GymxButtonProps {
  tag?: 'button' | 'span' | 'a'; // default button
  state?: UIState;
  isLoading?: boolean;
  loadingText?: string; // default Loading
}

export interface GymxButtonSlots {
  'icon-start': () => any;
  'loading-start': () => any;
  default: () => any;
  'icon-end': () => any;
  'loading-end': () => any;
}
