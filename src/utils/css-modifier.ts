type Modifier = string | undefined;
const getModifierClass = (block: string, modifier: Modifier) => `${block}--${modifier}`;
export const getModifierClasses = (block: string, modifiers?: Modifier[] | Modifier) => {
  if (!modifiers) {
    return [];
  }
  if (typeof modifiers === 'string') {
    return [getModifierClass(block, modifiers)];
  }
  return modifiers.filter((mod) => mod).map((mod) => getModifierClass(block, mod));
};
