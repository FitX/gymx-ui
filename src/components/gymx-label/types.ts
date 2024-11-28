import type { UIState } from '@/types';

export type GymxLabelProps = {
  for?: string;
  text?: string;
  state?: UIState;
  error?: boolean;
  tag?: 'label' | 'span';
};
