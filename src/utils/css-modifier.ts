const getModifierClass = (block: string, modifier: string) => `${block}--${modifier}`;
export const getModifierClasses = (block: string, modifiers?: string | string[]) => {
  if (!modifiers) {
    return [];
  }
  if (typeof modifiers === 'string') {
    return [getModifierClass(block, modifiers)];
  }
  return modifiers.map((mod) => getModifierClass(block, mod));
};
