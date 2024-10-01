import { type DocsContextProps, DocsContainer, Story } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { type PropsWithChildren } from 'react';
import * as React from 'react';
import { switchCSS } from './switch-theme';

export function ThemedContainer(props: PropsWithChildren<{ context: DocsContextProps }>) {
  /**
   * Decorator function for theming the Docs Pages.
   * The '@storybook/addon-themes' addon only updates the Story Pages.
   * When switching to the Doc Pages, the data-theme attribute is only sporadically updated.
   * Therefore, the manual update here in the Theme Provider
   */
  const theme = (props.context as any).store.globals.globals.theme;
  document.documentElement.setAttribute('data-theme', theme);
  if (theme) {
    console.log('import.meta.env', import.meta.env);
    const isProd = import.meta.env.MODE === 'production';
    /**
     * Handle different paths between prod and preview
     * We cant map src/assets/styles to staticDirs because we loose HMR
     */
    const themePath = isProd ? '/example-themes' : '../src/assets/styles/example-themes';
    // console.log(import.meta.env);
    /**
     * {
     *     "BASE_URL": "/",
     *     "DEV": true,
     *     "MODE": "development",
     *     "PROD": false,
     *     "SSR": false,
     *     "STORYBOOK": "true"
     * }
     */
    switchCSS(`${themePath}/${theme}.css`);
  }


  return (
    <DocsContainer
      context={props.context}
      theme={theme === 'dark' ? themes.dark : themes.light}
      data-theme={theme}
    ><div className={'custom-docs-content'}>{props.children}</div></DocsContainer>
  )
}
/* vielleicht auf dom ebene prüfen ob data-theme schon existiert */
