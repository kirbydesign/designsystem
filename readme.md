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
  - [Sass](#sass)
  - [Ionic](#ionic)
  - [Icons](#icons)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Developing new features in Kirby](#developing-new-features-in-kirby)
  - ["New feature"-process](#new-feature-process)
  - [Testing new features](#testing-new-features)
- [Polyfills](#polyfills)
- [Chart Components](#chart-components)

## Installation

Install through npm:

```bash
npm i @kirbydesign/designsystem
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

### Autocompletion

To enable autocompletion (e.g. in VS Code), you need to add the following line to your `reference.d.ts`:

```ts
/// <reference path="./node_modules/@kirbydesign/designsystem/index.d.ts" /> Needed for autocompletion and compilation.
```

## Folder Structure

The folder structure of the repository is based on [Nrwl](https://nrwl.io/)'s [NX](https://nx.dev/angular) mono-repository project.

A basic walkthrough is outlined in the structure below:

```
@kirbydesign/designsystem
├── apps                    # Contains source code for applications
|  ├── cookbook             # - Cookbook application (showcase and examples)
|  └── cookbook-e2e         # - End-to-end tests for Cookbook application
├── config
|  └── helm
├── dist                    # Contains output files when building artifacts (for distribution)
|  ├── apps
|  └── libs
├── libs                    # Contains source code for libraries
|  └── designsystem         # - Actual implementation of library (designsystem)
├── scripts                 # Scripts for building artifacts
└── tools                   # Contains various tools
   ├── sass-to-ts         # - CLI and Webpack plugin for extract global variables from SASS to TS
   ├── schematics           # - Angular schematics
   └── tslint-rules         # - Custom lintiong rules
```

## Scripts

Below is an overview of most widely used scripts, available for this project.  
Use them in your terminal like: `npm run <script>`:

| Command           | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| start             | Starts the development server, providing a means of running (and developing on the Cookbook) |
| lint              | Lints the entire project (both TypeScript and SCSS source code)                              |
| lint:cookbook     | Lints the Cookbook application (both TypeScript and SCSS source code)                        |
| lint:designsystem | Lints the Designsystem library (both TypeScript and SCSS source code)                        |
| dist:cookbook     | Builds a distribution folder of the Cookbook application                                     |
| dist:designsystem | Builds a distribution folder of the Designsystem library                                     |

## Developing new features in Kirby

When developing new features in the Kirby Designsystem library, please follow the process described below:

### "New feature"-process

TBD

### Testing new features

Developing new features should also include that they should be tested.

1. Make sure that the code is unit tested.
2. Make sure that examples and showcases are added for the new features (in the cookbook)

   ... this will also act as documentation for users of the Designsystem library.

3. Test the new features in your own application

   The easiest way to do this is to build a distribution package, and install it in your own project.

   ```
   # 1. From the root of this repository, execute (this may take a minute or two):
   ./scripts/publish.js

   # Them, from the root of your application, execute:
   <path-to-root-of-designsystem>/dist/kirbydesign-designsystem-<version>.tgz

   # ... where <path-to-root-of-designsystem> is replaced with the real path
   #     and <version> is the version of designsystem that was build (in the previous step)

   # You do NOT want to commit the changes made to package.json and package-lock.json to your code base!
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
