# GymX UI - Vue Component Library

![npm (scoped)](https://img.shields.io/npm/v/@fitx/gymx-ui?style=flat-square&color=blue)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@fitx/gymx-ui)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@fitx/gymx-ui)

GymX UI is a Vue 3 component library designed to be used across FitX / vipion projects.
It provides a collection of reusable UI components and composables, built with Vue 3 and TypeScript,
to ensure a consistent design and user experience across all applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Development](#development)
  - [Create a new component](#Create-a-new-component)
- [Testing](#testing)
- [Storybook](#storybook)

## Installation

To install the GymX UI library, you can use npm or yarn:

```
npm install @fitx/gymx-ui
# or
yarn add @fitx/gymx-ui
```

## Usage

Once installed, you can import components from the library and use them in your Vue 3 application.

### Basic Example

```vue
<script lang="ts" setup>
import { GymxButton } from '@fitx/gymx-ui';
</script>
<template>
  <div>
    <gymx-button label="Click me!" />
  </div>
</template>
```

Make sure to import any necessary styles as well:

```ts
import '@fitx/gymx-ui/index.css';
// or
import '@fitx/gymx-ui/dist/index.css';
```

or svg icons

```ts
import '@fitx/gymx-ui/icons/icon-close.svg';
// or as vue Component
import { IconClose } from '@fitx/gymx-ui';
```

## Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Available Scripts

you can run the following scripts:

- `npm run build`: Builds the Storybook documentation and runs unit tests.
- `npm run build:lib`: Builds the component library.
- `npm run test:unit`: Runs unit tests with Vitest.
- `npm run test:e2e`: Runs end-to-end tests using Playwright.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run format`: Formats the code using Prettier.
- `npm run storybook`: Starts the Storybook server for local component development.

To start developing new components or working on the library,
[use Storybook as dev server](#storybook):

```sh
npm install
npm run storybook
```
This will start a local storybook server.
You can now work on your components in the `src/` directory and see the changes live.

### Create a new component

```
npx tsx utils/create-component.ts example-button
```
This will automatically create a folder called 'gymx-example-button' with the prefix 'gymx'.
The folder will contain the vue file, a test files, story file for Storybook, index and types.


### Type Checking and linitng

The project uses TypeScript for type safety. You can run type checks with:

```sh
npm run type-check
# Lint with [ESLint](https://eslint.org/)
npm run lint
```

## Testing

### Unit Tests

We use [Vitest](https://vitest.dev/) for unit testing. To run the tests:

```
npm run test:unit
```

### End-to-End Tests

For e2e testing, we use [Playwright](https://playwright.dev/). To run the e2e tests:

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

## Storybook

GymX UI is integrated with Storybook for UI component development and documentation.
To start the Storybook server locally, run:

```
npm run storybook
```

To build the Storybook static files and generate Unit Tests documentation, run:

```
npm run build
```

Access the live Storybook documentation at [Storybook on GymX UI](https://gymx-ui-dev.fitx.de).

## Contributing

We welcome contributions to GymX UI!.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a pull request.


