export const getResultElements = (container: HTMLDivElement | null) => container
  ? Array.from(container.childNodes).filter((node) => node instanceof HTMLElement && node.role === 'tab')
  : [];
