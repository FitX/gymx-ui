import { GymxLabel } from '@/components';

/**
 * @link https://stackoverflow.com/a/77619585
 */
export type GymxLabelProps = Partial<Omit<InstanceType<typeof GymxLabel>, `$${string}`>>
