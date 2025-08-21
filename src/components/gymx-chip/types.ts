import type { UIState } from '@/types';

export interface ChipValue {
  value: string | number;
  [key: string]: unknown;
}

export interface GymxChipProps<
  T extends string | number | ChipValue | (string | number | ChipValue)[],
> {
  value: T extends Array<infer U> ? U : T;
  count?: number;
  state?: UIState;
}
