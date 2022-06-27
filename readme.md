## Kirby Design System

<!-- Badges section here. -->
<!-- [![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem/next.svg)][npm-badge-url] -->

[![npm](https://img.shields.io/npm/v/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/l/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)
[![npm](https://img.shields.io/npm/dm/@kirbydesign/designsystem.svg)](https://www.npmjs.com/package/@kirbydesign/designsystem)

[![GitHub forks](https://img.shields.io/github/forks/kirbydesign/designsystem.svg?style=social&label=Fork)](https://github.com/kirbydesign/designsystem/fork)
[![GitHub stars](https://img.shields.io/github/stars/kirbydesign/designsystem.svg?style=social&label=Star)](https://github.com/kirbydesign/designsystem/stargazers)

## About

Kirby Design System is a UX Component library implementing the [Kirby Design Philosophy][kirby.design].

Kirby Components are built on top of [Angular][angular] and can be used in Angular projects.

The Kirby Cookbook, containing samples, status of components etc. can be accessed from [https://cookbook.kirby.design][kirby.cookbook].

## Table of Contents

- [Installation](#installation)
  - [Include KirbyModule](#include-kirbymodule)
  - [Sass](#sass)
  - [Icons](#icons)
  - [Testing](#testing)
  - [Migration Guides](#migration-guides)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Polyfills](#polyfills)
- [Chart Components](#chart-components)
- [Contributing](#contributing)

## Installation

Install through npm:

```bash
npm i @kirbydesign/designsystem
```

### Include KirbyModule

Import the `KirbyModule` in your `AppModule` :

```ts
import { KirbyModule } from '@kirbydesign/designsystem';

...

@NgModule({
    imports: [
        ...,
        KirbyModule
    ],
    ...
})
export class AppModule {}
```

### Sass

Include the Kirby global styles in your app, e.g., in `src/styles.scss`:

```css
@import '~@kirbydesign/designsystem/scss/global-styles';
```

In each `.scss` file where you need to access the Sass utility functions from Kirby (e.g. [colors][kirby.cookbook.colors] or [fonts][kirby.cookbook.fonts]) you must import the scss utilities:

```css
@import '~@kirbydesign/designsystem/scss/utils';
```

#### Generic Print Styles (Optional)

Kirby also provides a generic print stylesheet. It includes the basics. You most likely have to add local print styles specific to your app as well.

Import it into your app, e.g., in `src/styles.scss` or in your local print stylesheet if you have one:

```css
@import '~@kirbydesign/designsystem/scss/print';
```

### Testing

To unit-test applications using Kirby's Components, we recommend importing one of the following modules:

- When using [jasmine][jasmine]: `import { KirbyTestingModule } from '@kirbydesign/designsystem/`**`testing-jasmine'`**`;`
- When using [jest][jest]: `import { KirbyTestingModule } from '@kirbydesign/designsystem/`**`testing-jest'`**`;`

Example:

```ts
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing-jasmine';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  ...

});
```

For unit test performance reasons it's highly recommended to utilize these modules, since they provide a template-less implementation of the Kirby Components, but still translude content through `<ng-content></ng-content>` and provide `@Input` -decorated properties and `@Output` -decorated `EventEmitter` s, without
having to reflow the DOM, execute component logic etc.

### Icons

Kirby comes bundled with a default set of icons. Make sure the `.svg` files used by Kirby are copied to your output folder by adding the following to `build > options > assets` in `angular.json` :

```json
{
  ...
  "build": {
    "options": {
      "assets": [
        ...,
        {
          "glob": "**/*.svg",
          "input": "node_modules/@kirbydesign/designsystem/icons/svg",
          "output": "./assets/kirby/icons/svg"
        },
        {
          "glob": "close.svg",
          "input": "node_modules/@kirbydesign/designsystem/icons/svg",
          "output": "./svg"
        },
        ...
      ],
    }
  }
}
```

### Migration Guides

For details on migrating from earlier versions of Kirby see our [Migration Guides](./MIGRATION.md).

## Folder Structure

The folder structure of the repository is based on [Nrwl][nrwl]'s [NX][nx] mono-repository project.

A basic walkthrough is outlined in the structure below:

```
@kirbydesign/designsystem
├── apps                    # Contains source code for applications
|  └── cookbook             # - Cookbook application (showcase and examples)
├── dist                    # Contains output files when building artifacts (for distribution)
|  ├── apps
|  └── libs
├── libs                    # Contains source code for libraries
|  └── designsystem         # - Actual implementation of library (designsystem)
├── scripts                 # Scripts for building artifacts
└── tools                   # Contains various tools
   ├── generate-mocks       # - CLI utility for generating mocks for `@kirbydesign/designsystem/testing-jasmine`
   |                        #   and `@kirbydesign/designsystem/testing-jest` entry points.
   ├── sass-to-ts           # - CLI and Webpack plugin for extract global variables from SASS to TS
   ├── schematics           # - Angular schematics
   └── tslint-rules         # - Custom lintiong rules
```

## Scripts

Below is an overview of most widely used scripts, available for this project.  
Use them in your terminal like: `npm run <script>` :

| Command           | Description                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| start             | Starts the development server, providing a means of running (and developing on the Cookbook)                                                           |
| lint              | Lints the entire project (both TypeScript and SCSS source code)                                                                                        |
| lint:cookbook     | Lints the Cookbook application (both TypeScript and SCSS source code)                                                                                  |
| lint:designsystem | Lints the Designsystem library (both TypeScript and SCSS source code)                                                                                  |
| dist:cookbook     | Builds a distribution folder of the Cookbook application                                                                                               |
| dist:designsystem | Builds a distribution folder of the Designsystem library                                                                                               |
| transpile:tools   | Transpiles tools, required to produce library distribution (this is done as a `post-install` hook, but may have value if altering tool implementation) |

## Polyfills

Some features of Kirby requires polyfills to ensure compability across all major browsers _(e.g. the `ResizeObserverService` used by the automagic sizing feature of the `Kirby Card` component)_.

To enable the polyfill, you register a _polyfill loader_ that checks whether the polyfill is needed or the feature is already supported by the browser (and can skip requesting the polyfill).  
To use the sizing feature of Kirby Card across all major browsers, you must copy additional files from the Kirby package to your output folder.  
Add the following to `build > options > assets` in `angular.json` :

```json
{
  ...
  "build": {
    "options": {
      "assets": [
        ...,
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

Finally, add the following to `index.html` :

```html
<head>
  ...
  <script src="kirby/polyfills/resize-observer-polyfill-loader.min.js"></script>
</head>
```

_**Please note:** If you don't want the additional http request for the polyfill loader, you can copy the contents of `node_modules/@kirbydesign/designsystem/polyfills/resize-observer-polyfill-loader.js` into a `script` tag in `index.html` instead_

## Chart Components

The Kirby chart components use Highcharts. Note that this is a licensed product.

## Contributing

If you wish to contribute new features, bug fixes or something third to the project have a look at the [contribution guidelines](./github/CONTRIBUTING.md).

[angular]: https://angular.io
[jasmine]: https://jasmine.github.io/
[jest]: https://jestjs.io/
[nrwl]: https://nrwl.io/
[nx]: https://nx.dev/angular
[kirby.design]: https://kirby.design/
[kirby.cookbook]: https://cookbook.kirby.design
[kirby.cookbook.fonts]: https://cookbook.kirby.design/home/showcase/fonts
[kirby.cookbook.colors]: https://cookbook.kirby.design/home/showcase/colors
[kirby.cookbook.list]: https://cookbook.kirby.design/home/showcase/list
