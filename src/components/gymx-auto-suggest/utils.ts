import type { Option } from '@/components/gymx-auto-suggest/types';

export const filter = <T extends Option>(options: T[], text: string): T[] => {
  const sanitized = text.toLowerCase().trim();
  return options.filter((option) => option.text.toLowerCase().includes(sanitized));
};
