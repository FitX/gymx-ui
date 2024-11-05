import type { Option } from '@/components/gymx-auto-suggest/types';

export const filter = (options: Option[], text: string): Option[] => {
  const sanitized = text.toLowerCase().trim();
  return options.filter(option =>
    option.text.toLowerCase().includes(sanitized)
  );
};
