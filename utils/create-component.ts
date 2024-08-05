import fs from 'fs';
import path from 'path';

/**
 * Usage: npx ts-node utils/create-component.ts fancy-button
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
};

function createComponent(name: string): void {
  // Verzeichnis- und Dateinamen definieren
  const dirPath = path.join('src', 'components', `${libNamePrefix}-${name}`);

  const files = [
    { name: 'index.ts', content: contentTemplates.index(name) },
    { name: 'types.ts', content: contentTemplates.types(name) },
    { name: `${libNamePrefix}-${name}.test.ts`, content: contentTemplates.test(name) },
    { name: `${libNamePrefix}-${name}.vue`, content: contentTemplates.vue(name) }
  ];

  if (fs.existsSync(dirPath)) {
    console.error(`Folder for ${name} already exists.`);
    process.exit(1);

  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    files.forEach(file => {
      fs.writeFileSync(path.join(dirPath, file.name), file.content);
    });
  }

  console.log(`Component '${libNamePrefix}-${name}' created successfully in 'src/components/'`);
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