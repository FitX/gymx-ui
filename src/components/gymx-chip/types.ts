import type { UIState } from '@/types';

export interface GymxChipProps<T extends string | number | Array<string | number>> {
  value?: T extends Array<infer U> ? U : T;
  count?: number;
  state?: UIState;
}
