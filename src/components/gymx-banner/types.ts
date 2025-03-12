export const modifier = [
  'warning',
  'start',
  'end',
  'error',
  'success'
] as const;

export interface GymxBannerProps {
  content?: string;
  type?: typeof modifier[number] | typeof modifier[number][];
}
