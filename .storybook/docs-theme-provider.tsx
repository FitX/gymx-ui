import { type DocsContextProps, DocsContainer, Story } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { type PropsWithChildren } from 'react';
import * as React from 'react';
import { switchCSS } from './switch-theme';

export const handleThemeSwitch = (themeName?: string) => {
  const themeMaybeUndefinedOrEmpty = themeName;
  const theme = themeMaybeUndefinedOrEmpty && themeMaybeUndefinedOrEmpty?.length > 0 ? themeMaybeUndefinedOrEmpty : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  if (theme) {
    const isProd = import.meta.env.MODE === 'production';
    /**
     * Handle different paths between prod and preview
     * We cant map src/assets/styles to staticDirs because we loose HMR
     * @see .storybook/main.ts
     */
    const themePath = isProd ? '/example-themes' : '../src/assets/styles/example-themes';
    switchCSS(`${themePath}/${theme}.css`);
  }
}

export function ThemedContainer(props: PropsWithChildren<{ context: DocsContextProps }>) {
  /**
   * Decorator function for theming the Docs Pages.
   * The '@storybook/addon-themes' addon only updates the Story Pages.
   * When switching to the Doc Pages, the data-theme attribute is only sporadically updated.
   * Therefore, the manual update here in the Theme Provider
   */
  const theme = (props.context as any).store.globals.globals.theme;
  handleThemeSwitch(theme);

  const darkThemeList = ['dark', 'exact'];

  const isDark = darkThemeList.includes(theme)

  return (
    <DocsContainer
      context={props.context}
      theme={isDark ? themes.dark : themes.light}
      data-theme={theme}
    ><div className={'custom-docs-content'}>{props.children}</div></DocsContainer>
  )
}
