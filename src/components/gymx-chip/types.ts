import type { UIState } from '@/types';

export interface GymxChipProps<T extends string | number | boolean | object> {
  value?: T;
  count?: number;
  state?: UIState;
}
