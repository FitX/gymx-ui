import fs from 'fs';
import path from 'path';

/**
 * Usage: npx ts-node utils/create-component.ts button
 */

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

const libNamePrefix = 'gymx';

const contentTemplates = {
  index: (name) => `export { default } from './${libNamePrefix}-${name}.vue';\n// @TODO add to index.ts`,
  types: (name) => `export interface ${capitalize(name)}Props {\n  // @TODO Define your props here\n}\n`,
  test: (name) => `import { mount } from '@vue/test-utils';\nimport { descripe, test } from 'vitest';\nimport Blubb${capitalize(name)} from './${libNamePrefix}-${name}.vue';\n\ndescribe('${libNamePrefix}${capitalize(name)}', () => {\n  test('is a Vue instance', () => {\n    const wrapper = mount(${libNamePrefix}${capitalize(name)});\n    expect(wrapper.exists()).toBeTruthy();n  });\n});\n`,
  vue: (name) => `@TODO <script></script>\n<template>\n<!-- Have fun with ${name}</template>\n<style scoped></style>`,
};

function createComponent(name: string): void {
  // Verzeichnis- und Dateinamen definieren
  const dirPath = path.join(__dirname, 'src', 'components', `${libNamePrefix}-${name}`);
  const files = [
    { name: 'index.ts', content: contentTemplates.index(name) },
    { name: 'types.ts', content: contentTemplates.types(name) },
    { name: `${libNamePrefix}-${name}.test.ts`, content: contentTemplates.test(name) },
    { name: `${libNamePrefix}-${name}.vue`, content: contentTemplates.vue(name) }
  ];

  // Verzeichnis erstellen
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Dateien erstellen und Inhalt hinzufügen
  files.forEach(file => {
    fs.writeFileSync(path.join(dirPath, file.name), file.content);
  });

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
