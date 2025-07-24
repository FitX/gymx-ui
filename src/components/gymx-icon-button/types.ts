import type { UIState } from '@/types';

export interface GymxIconButtonProps {
  tag?: 'button' | 'span' | 'a'; // default button
  state?: UIState;
  isLoading?: boolean;
  text: string; // Accessibility Text
  loadingText?: string; // default Loading
}

export interface GymxIconButtonSlots {
  default: () => any;
  loading: () => any;
}
