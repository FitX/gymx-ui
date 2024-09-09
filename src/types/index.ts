export const uiStates = [undefined, 'disabled', 'focused', 'hover'] as const;
export type UIState = (typeof uiStates)[number];
