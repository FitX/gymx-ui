const dynamicCssId = 'dynamic-css';

export const loadCSSFile = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.id = dynamicCssId;
  document.head.appendChild(link);

  link.addEventListener('load', () => {
    const event = new CustomEvent('theme-css-loaded', {
      detail: { id: dynamicCssId }
    });
    document.dispatchEvent(event);
  });
};

export const removeCSSFile = () => {
  const existingLink = document.getElementById(dynamicCssId);
  if (existingLink) {
    existingLink.parentNode.removeChild(existingLink);
  }
};

export const switchCSS = (url: string) => {
  removeCSSFile();
  loadCSSFile(url);
}

// loadCSSFile('fitx-dark.css');
