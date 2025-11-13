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

- [Kirby Design System](#kirby-design-system)
- [About](#about)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Include KirbyModule](#include-kirbymodule)
  - [Sass](#sass)
    - [Generic Print Styles (Optional)](#generic-print-styles-optional)
  - [Testing](#testing)
  - [Icons](#icons)
  - [Migration Guides](#migration-guides)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Installation

Install through npm:

```bash
npm i @kirbydesign/designsystem
```

### Provide Kirby

Environment providers for Kirby are set up with the `provideKirby()` function.

In addition, any host application must use `withGlobalSetup()` when providing Kirby during bootstrapping of the application to register Kirby components correctly in the browser.

#### Example Usage

```ts
providers: [provideKirby(withGlobalSetup())];
```

If multiple Angular contexts exist within the same application, e.g. in a Micro Frontend architecture, the host should set up the global config, and the Micro Frontends should simply call `provideKirby()`.

An additional `KirbyConfig` can be provided to set up shared behavior across the application.

#### Example Host Application Config

```ts
provideKirby(
  withGlobalSetup({
    focusManager: true,
    setHtmlDocTitle: true,
  })
);
```

#### Focus Management

The `focusManager` option enables focus management for components rendered in a `kirby-router-outlet`. For instance, when a `kirby-page` enters the view, focus will automatically be set to the primary heading (`h1`) inside the page toolbar. This improves accessibility and keyboard navigation.

#### Setting the HTML Document Title

The `setHtmlDocTitle` function updates the `<title>` element of the HTML document to match any Kirby Page title on navigation.
This is useful for dynamically reflecting the current page or application state in the browser tab, improving usability and accessibility.

### Sass

Include the Kirby global styles in your app, e.g., in `src/styles.scss`:

```css
@use '@kirbydesign/designsystem/scss/global-styles';
```

In each `.scss` file where you need to access the Sass utility functions from Kirby (e.g. [colors][kirby.cookbook.colors] or [fonts][kirby.cookbook.fonts]) you must import the scss utilities:

```css
@use '@kirbydesign/designsystem/scss/utils';
```

#### Generic Print Styles (Optional)

Kirby also provides a generic print stylesheet. It includes the basics. You most likely have to add local print styles specific to your app as well.

Import it into your app, e.g., in `src/styles.scss` or in your local print stylesheet if you have one:

```css
@use '@kirbydesign/designsystem/scss/print';
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

It is possible to configure the path that the built-in icons are loaded from by providing the `BUILT_IN_ICONS_URL` injection token:

```typescript
// In app providers:
{
  provide: BUILT_IN_ICONS_URL,
  useValue: 'https://example.org/1.0.1/kirby/icons/svg/'
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
```

## Scripts

Below is an overview of most widely used scripts, available for this project.
Use them in your terminal like: `npm run <script>` :

| Command   | Description                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| start     | Starts the development server, providing a means of running the cookbook while developing                                      |
| publish   | When run locally it produces a set of npm packages in `dist/` that can be installed locally with npm install <path to tarball> |
| storybook | Opens up Storybook where component states are set up for snapshot testing with Chromatic                                       |

We use [nx][nx] to run common tasks like building, linting and testing projects.
This is done with `npx nx <target name> <project name>`, e.g. `npx nx lint designsystem` preferrably _from the root of the workspace_ to ensure config paths are resolved correctly.

## Contributing

If you wish to contribute new features, bug fixes or something third to the project have a look at the [contribution guidelines](./.github/CONTRIBUTING.md).

[angular]: https://angular.io
[jasmine]: https://jasmine.github.io/
[jest]: https://jestjs.io/
[nrwl]: https://nrwl.io/
[nx]: https://nx.dev/getting-started/intro
[kirby.design]: https://kirby.design/
[kirby.cookbook]: https://cookbook.kirby.design
[kirby.cookbook.fonts]: https://cookbook.kirby.design/home/showcase/fonts
[kirby.cookbook.colors]: https://cookbook.kirby.design/home/showcase/colors
[kirby.cookbook.list]: https://cookbook.kirby.design/home/showcase/list
