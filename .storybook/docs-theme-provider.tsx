import { DocsContainer, type DocsContextProps } from '@storybook/blocks'
import { themes } from '@storybook/theming'
import { type PropsWithChildren } from 'react'
import * as React from 'react'

export function ThemedContainer(props: PropsWithChildren<{ context: DocsContextProps }>) {
  return (
    <DocsContainer
      context={props.context}
      theme={(props.context as any).store.globals.globals.theme === 'dark' ? themes.dark : themes.light}
    >
      {props.children}
    </DocsContainer>
  )
}
