## Kirby Design System

<!-- Badges section here. -->
<!-- [![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem/next.svg)][npm-badge-url] -->
[![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/l/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/dm/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)

[![GitHub forks](https://img.shields.io/github/forks/kirbydesign/designsystem.svg?style=social&label=Fork)](https://github.com/kirbydesign/designsystem/fork)
[![GitHub stars](https://img.shields.io/github/stars/kirbydesign/designsystem.svg?style=social&label=Star)](https://github.com/kirbydesign/designsystem/stargazers)

## About

Kirby Design System is a UX Component library implementing the Kirby Design Philosophy.
<!-- Read more at: https://kirby.design -->
Kirby Components are built on top of [Angular](https://angular.io) and [NativeScript](https://www.nativescript.org/) and can be used in a standalone Angular project as well as a [Angular/NativeScript code-sharing project](https://docs.nativescript.org/code-sharing/intro).

The Kirby Cookbook, containing samples, status of components etc. can be accessed from [https://cookbook.kirby.design](https://cookbook.kirby.design).

## Note
**Please note:** To enable the code-sharing capabilities of Angular/NativeScript the package contains the _uncompiled_ typescript (.ts), markup (.html/.tns.html) and styling (.scss/.tns.scss) source code. See the [Installation](#installation) section below on how to enable typescript compilation of the package in your project.

## Table of Contents

* [Installation](#installation)
  * [Sass](#sass)
  * [Typescript Configuration](#typescript-configuration)
  * [NativeScript Webpack Configuration](#nativescript-webpack-configuration)
  * [Ionic](#ionic)
* [NativeScript-Only Components](#nativescript-only-components)
* [Polyfills](#polyfills)
* [Chart Components](#chart-components)
* [Calendar Component](#calendar-component)

## Installation

Install through NPM:
```bash
npm install @kirbydesign/designsystem
```

### Sass

Include the Kirby Sass variables in your app:

* Web (eg. in `src/styles.scss`):
  ```css
  @import '~@kirbydesign/designsystem/scss/web/web-styles';
  ```
* {N} (eg. in `src/_app-variables.scss`)::
  ```css
  @import '~@kirbydesign/designsystem/scss/native-common';
  ```

As devDependencies don't get installed with the package in the target project, you also need to install `sass-extract` and `sass-extract-loader` via npm:
```
npm i sass-extract sass-extract-loader -D
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
### NativeScript Webpack Configuration

For Webpack to resolve `.tns` files also add `["designsystem"]` to the `explicitResolve` parameter for `nsWebpack.getResolver` to your `webpack.config.js`:

```js
...
  const ngCompilerPlugin = new AngularCompilerPlugin({
        hostReplacementPaths: nsWebpack.getResolver([platform, "tns"], ["designsystem"]),
        ...
    });
...
```

### Ionic
The Kirby web components are build on top of [Ionic](https://ionicframework.com/docs/components). The [`@ionic/angular`](https://www.npmjs.com/package/@ionic/angular) package should automatically be installed as a dependency of Kirby. If not, please execute the following:
```bash
npm install @ionic/angular
```
#### Ionicons
Ionic comes bundled with [Ionicons](https://ionicons.com/). Make sure the `.svg` files used by Ionic are copied to your output folder by adding the following to `build > options > assets` in `angular.json`:
```json
{
  ...
  "build": {
    "options": {
      "assets": [
        ...
        {
          "glob": "**/*.svg",
          "input": "node_modules/ionicons/dist/ionicons/svg",
          "output": "./svg"
        }
        ...
      ],
    }
  }
}
```

As the native platforms not support `.svg` files, the `ionicons.ttf` file will have to be copied to your `fonts` folder. This is done by adding the following line to your `webpack.config.js` file:

```json
new CopyWebpackPlugin([
  ...
  { "from": "../node_modules/ionicons/dist/fonts/ionicons.ttf", "to": "fonts" },
  ...
],...
```

## NativeScript-Only Components

Some Kirby components only exists as [Platform-Specific Components](https://docs.nativescript.org/angular/code-sharing/platform-specific-components), e.g. `NativeScriptDoughnutChartComponent`.

To **avoid** typescript compilation of NativeScript-Only Components in your **web** project, you need to add the following to your `tsconfig.json`:

```json
...
  "exclude": [
    ...
    "**/*.tns-only.ts",
    ...
  ],
...
```
Then, make sure you **don't** exclude `tns-only.ts` files in your **{N}** specific `tsconfig.tns.json`:
```json
...
  "exclude": [
    "**/*.tns.ts",
    "**/*.android.ts",
    "**/*.ios.ts",
    "**/*.spec.ts"
  ],
...
```
**Finally**, for all imports in your **{N}** specific typescript files (`*.tns.ts`) you will need to use a path that includes the **{N}** specific typings definition:
```ts
import { NativeScriptDoughnutChartComponent } from '@kirbydesign/designsystem/index.d.tns-only';
```
### Autocompletion
To enable autocompletion (e.g. in VS Code), you need to add the following line to your `reference.d.ts`:
```ts
/// <reference path="./node_modules/@kirbydesign/designsystem/index.d.tns-only.ts" /> Needed for autocompletion and compilation.
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
The Kirby chart components use Highcharts. Note that this is a licensed product. On iOS and Android the charts are rendered inside a webview. To use charts on iOS and Android devices, you must transfer some files to the device by adding this to your `webpack.config.js`:
```json
...
  new CopyWebpackPlugin([
  ...
    { from: "../node_modules/@kirbydesign/designsystem/components/chart/chart.webview.html", to: "chart" },
    { from: "../node_modules/@kirbydesign/designsystem/components/chart/css/styles.css", to: "chart" },
    { from: "../node_modules/@kirbydesign/designsystem/node_modules/highcharts/highcharts.js", to: "chart" },
    { from: "../node_modules/@kirbydesign/designsystem/node_modules/nativescript-webview-interface/www/nativescript-webview-interface.js", to: "chart" }
  ]...
...
```

## Calendar Component
On iOS and Android the calendar is rendered inside a webview. To use the calendar component on iOS and Android devices, you must transfer some files to the device by adding this to your `webpack.config.js`:
```json
...
  new CopyWebpackPlugin([
  ...
    { from: "../node_modules/@kirbydesign/designsystem/components/calendar/calendar.webview.html", to: "calendar" },
    { from: "../node_modules/@kirbydesign/designsystem/components/calendar/calendar.webview.css", to: "calendar" },
    { from: "../node_modules/@kirbydesign/designsystem/node_modules/nativescript-webview-interface/www/nativescript-webview-interface.js", to: "calendar" }
  ]...
...
```
