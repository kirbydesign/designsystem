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

## Note
**Please note:** To enable the code-sharing capabilities of Angular/NativeScript the package contains the _uncompiled_ typescript (.ts), markup (.html/.tns.html) and styling (.scss/.tns.scss) source code. See the [Installation](#installation) section below on how to enable typescript compilation of the package in your project.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

Install through NPM:
```bash
npm install @kirbydesign/designsystem
```

Include the Kirby Sass variables in your app:

* Web (eg. in `src/styles.scss`):
  ```css
  @import '~@kirbydesign/designsystem/scss/web-imports';
  ```
* {N} (eg. in `src/_app-variables.scss`)::
  ```css
  @import '~@kirbydesign/designsystem/scss/native-common';
  ```



**Please note:** To enable typescript compilation of the package in your project, you need to add the following to your `tsconfig.json`:

```json
...
  "include": [
    "./src/**/*",
    "./node_modules/@kirbydesign/designsystem/**/*.ts"
  ],
...
```
