## Kirby Design System

<!-- Badges section here. -->
<!-- [![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem/next.svg)][npm-badge-url] -->

[![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/l/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/dm/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)

[![GitHub forks](https://img.shields.io/github/forks/kirbydesign/designsystem.svg?style=social&label=Fork)](https://github.com/kirbydesign/designsystem/fork)
[![GitHub stars](https://img.shields.io/github/stars/kirbydesign/designsystem.svg?style=social&label=Star)](https://github.com/kirbydesign/designsystem/stargazers)

## About

Kirby Design System is a UX Component library implementing the [Kirby Design Philosophy](https://kirby.design/).

<!-- Read more at: https://kirby.design -->

Kirby Components are built on top of [Angular](https://angular.io) and can be used in Angular projects.

The Kirby Cookbook, containing samples, status of components etc. can be accessed from [https://cookbook.kirby.design](https://cookbook.kirby.design).

## Note

**Please note:** The package currently contains the _uncompiled_ typescript (.ts), markup (.html) and styling (.scss) source code. See the [Installation](#installation) section below on how to enable typescript compilation of the package in your project.

## Table of Contents

- [Installation](#installation)
  - [devDependencies](#devdependencies)
  - [Typescript Configuration](#typescript-configuration)
  - [Sass](#sass)
  - [Ionic](#ionic)
  - [Icons](#icons)
  - [Testing](#testing)
- [Polyfills](#polyfills)
- [Chart Components](#chart-components)

## Installation

Install through npm:

```bash
npm i @kirbydesign/designsystem
```

### devDependencies

As devDependencies of the npm package doesn't automatically get installed, you also need to install `sass-extract`, `sass-extract-loader` and `ng-mocks` (_remember to include the `-D` flag_):

```
npm i sass-extract sass-extract-loader ng-mocks@7.7.0 -D
```

### Typescript Configuration

**Please note:** To enable typescript compilation of the package in your project, you need to add the following to your `tsconfig.json`:

```json
...
  "include": [
    "./src/**/*",
    "./node_modules/@kirbydesign/designsystem/**/*.ts"
  ],
...
```

For testing purposes Kirby includes a [testing module](#testing). To **avoid** including this in your app, you need to add the following to your `src/tsconfig.app.json`:

```json
...
  "exclude": [
    ...
    "../node_modules/@kirbydesign/designsystem/testing/**/*.*",
    ...
  ],
...
```

To enable typescript compilation of the package in your unit tests, you need to add the following to your `src/tsconfig.spec.json`:

```json
...
  "include": [
    ...
    "../node_modules/@kirbydesign/designsystem/**/*.ts",
    ...
  ],
...
```

### Sass

Include the Kirby global styles in your app:

- Eg. in `src/styles.scss`:
  ```css
  @import '~@kirbydesign/designsystem/scss/global-styles';
  ```
  In each `.scss` file where you need to access the Sass utility functions from Kirby (e.g. [colors](https://cookbook.kirby.design/home/showcase/colors) or [fonts](https://cookbook.kirby.design/home/showcase/fonts)) you must import the scss utilities:

```css
@import '~@kirbydesign/designsystem/scss/utils';
```

### Ionic

The Kirby web components are build on top of [Ionic](https://ionicframework.com/docs/components). The [`@ionic/angular`](https://www.npmjs.com/package/@ionic/angular) package should automatically be installed as a dependency of Kirby. If not, please execute the following:

```bash
npm i @ionic/angular
```

### Icons

Kirby comes bundled with a default set of icons. Make sure the `.svg` files used by Kirby are copied to your output folder by adding the following to `build > options > assets` in `angular.json`:

```json
{
  ...
  "build": {
    "options": {
      "assets": [
        ...
        {
          "glob": "**/*.svg",
          "input": "node_modules/@kirbydesign/designsystem/icons/svg",
          "output": "./assets/kirby/icons/svg"
        },
        ...
      ],
    }
  }
}
```

### Testing

Kirby includes a testing module for mocking out Kirby components in unit tests. To mock out Kirby in tests of components that use a `<kirby-` tag, you need to configure your testing module with the following:

```ts
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    ...
    imports: [KirbyTestingModule],
    ...
  }).compileComponents();
}));
```

### Autocompletion

To enable autocompletion (e.g. in VS Code), you need to add the following line to your `reference.d.ts`:

```ts
/// <reference path="./node_modules/@kirbydesign/designsystem/index.d.ts" /> Needed for autocompletion and compilation.
```

## Polyfills

Some features of Kirby requires polyfills to ensure compability across all major browsers _(e.g. the `ResizeObserverService` used by the automagic sizing feature of the `Kirby Card` component)_.

To enable the polyfill, you register a _polyfill loader_ that checks whether the polyfill is needed or the feature is already supported by the browser (and can skip requesting the polyfill).  
To use the sizing feature of Kirby Card across all major browsers, you must copy additional files from the Kirby package to your output folder.  
Add the following to `build > options > assets` in `angular.json`:

```json
{
  ...
  "build": {
    "options": {
      "assets": [
        ...
        {
          "glob": "**/*",
          "input": "./node_modules/@kirbydesign/designsystem/polyfills",
          "output": "./kirby/polyfills"
        },
        ...
      ],
    }
  }
}
```

Finally, add the following to `index.html`:

```html
<head>
  ...
  <script src="kirby/polyfills/resize-observer-polyfill-loader.min.js"></script>
</head>
```

_**Please note:** If you don't want the additional http request for the polyfill loader, you can copy the contents of `node_modules/@kirbydesign/designsystem/polyfills/resize-observer-polyfill-loader.js` into a `script` tag in `index.html` instead_

## Chart Components

The Kirby chart components use Highcharts. Note that this is a licensed product.
