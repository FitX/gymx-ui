import fs from 'fs';
import path from 'path';

/**
 * Usage: npx ts-node utils/create-component.ts button
 */

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

const libNamePrefix = 'gymx';

const contentTemplates = {
  index: (name) => `
export * from './types';
export { default as ${capitalize(libNamePrefix)}${capitalize(name)} } from './${libNamePrefix}-${name}.vue';\n`,
  types: (name) => `
export interface ${capitalize(libNamePrefix)}${capitalize(name)}Props {
// @TODO Define your props here
}\n`,
  test: (name) => {
    const componentName = `${capitalize(libNamePrefix)}${capitalize(name)}`;
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

const componentName = args[0];
createComponent(componentName);
