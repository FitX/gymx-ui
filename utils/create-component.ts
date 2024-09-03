import fs from 'fs';
import path from 'path';

/**
 * Usage: npx tsx utils/create-component.ts fancy-button
 */

/**
 * @link https://stackoverflow.com/a/53952925
 */
const toPascalCase = (string: string): string => `${string}`
  .toLowerCase()
  .replace(new RegExp(/[-_]+/, 'g'), ' ')
  .replace(new RegExp(/[^\w\s]/, 'g'), '')
  .replace(
    new RegExp(/\s+(.)(\w*)/, 'g'),
    ($1, $2, $3) => `${$2.toUpperCase() + $3}`
  )
  .replace(new RegExp(/\w/), s => s.toUpperCase());

const libNamePrefix = 'gymx';

const contentTemplates = {
  index: (name) => `
export * from './types';
export { default as ${toPascalCase(libNamePrefix)}${toPascalCase(name)} } from './${libNamePrefix}-${name}.vue';
// @TODO update components/index before publishing\n`,
  types: (name) => `
export interface ${toPascalCase(libNamePrefix)}${toPascalCase(name)}Props {
// @TODO Define your props here
}\n`,
  test: (name) => {
    const componentName = `${toPascalCase(libNamePrefix)}${toPascalCase(name)}`;
    return `
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ${componentName} } from './index';

describe('${componentName}', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(${componentName});
    expect(wrapper.exists()).toBeTruthy();
  });
});\n`
  },
  vue: (name) => `
<script lang="ts" setup></script>
<template>${libNamePrefix}-${name}</template>
<style lang="scss" scoped></style>`,
  story: (name) => {
    const componentName = `${toPascalCase(libNamePrefix)}${toPascalCase(name)}`;
    return `
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as ${componentName} } from './${libNamePrefix}-${name}.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/${name}',
  component: ${componentName},
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
  },
};

  `
  },
  e2e: (name) => {
    const format = name
      .split('-')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).toString().replaceAll(',', ' ');
    return `
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('${format} Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('${name}'));
  await expect(page).toHaveScreenshot();
});

  `
  },
};

function createComponent(name: string): void {
  // Verzeichnis- und Dateinamen definieren
  const dirPath = path.join('src', 'components', `${libNamePrefix}-${name}`);

  const files = [
    { name: 'index.ts', content: contentTemplates.index(name) },
    { name: 'types.ts', content: contentTemplates.types(name) },
    { name: `${libNamePrefix}-${name}.test.ts`, content: contentTemplates.test(name) },
    { name: `${libNamePrefix}-${name}.vue`, content: contentTemplates.vue(name) },
    { name: `${libNamePrefix}-${name}.stories.ts`, content: contentTemplates.story(name) },
    { name: `${libNamePrefix}-${name}.spec.ts`, content: contentTemplates.e2e(name) }
  ];

  if (fs.existsSync(dirPath)) {
    console.error(`Folder for ${name} already exists.`);
    process.exit(1);

  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    files.forEach(file => {
      fs.writeFileSync(path.join(dirPath, file.name), file.content);
      console.log(`${file.name} added`)
    });
  }

  console.log(`Component '${libNamePrefix}-${name}' created successfully in 'src/components/'`);
  console.log(`dont forget to include '${libNamePrefix}-${name}' in 'src/components/index'`);
}



// get Parameters from command line
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: ts-node utils/create-component.ts <name>');
  process.exit(1);
}
if (args.length > 1) {
  console.warn('currently we just accept 1 Parameter <name>')
}

const componentName = args[0];
createComponent(componentName);
