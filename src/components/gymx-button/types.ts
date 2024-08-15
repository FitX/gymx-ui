import type { UIState } from '@/types';

export interface GymxButtonProps {
  tag: 'button' | 'span' | 'a'; // default button
  /**
   * Active State
   */
  isActive?: boolean;
  state?: UIState;
}
