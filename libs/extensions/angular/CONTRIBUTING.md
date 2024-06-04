# Kirby Extensions Contribution Guidelines

## Adding Features and Fixing Bugs

If you wish to contribute a feature or a bug fix the preferred process is as follows:

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose)** if a similar issue is not already added to the issue tracker (See guidelines on how to write  "[The good: Issue](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Issue)").
2. **Implementation:**
   - Make sure you have read: "[Before you get coding](https://github.com/kirbydesign/designsystem/blob/develop/.github/CONTRIBUTING.md#before-you-get-coding)".
   - Signal to others you are working on the issue by assigning yourself.
   - Create a branch from the [develop branch](https://github.com/kirbydesign/designsystem/tree/develop) following our [branch naming convention](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Branch).
   - Consider creating test(s) that reproduces the bug or validates the feature, following guidelines in: "[The good: Test](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Test)".
3. **Create a PR with your changes.**

## Creating a new Component

Kirby Extensions exposes individual components as secondary entries in the packaged library. This allows cherry-picking and lazy loading individual components in apps, reducing overhead in the initial bundle. At the same time it creates a healthy separation of concerns between components.

A secondary entry point can be seen as a sub-module of the package and is imported in code as `@kirbydesign/extensions-angular/component-name`. Generally there should be one entry point per component, similar to how the core library has entry points for button, card etc.

A secondary entry point can be created from the command line with the following:

```shell
npx nx g library-secondary-entry-point --name=new-component-name --library=extensions-angular --skip-module
```

The `skip-module` flag is added here as we want to create a self-contained standalone UI component for others to consume. If a module is needed for your specific use-case, omit the flag.

With the secondary entry point in place a new component with the same name can be added:

```shell
npx nx g component --name=new-component-name --directory=libs/extensions/angular/new-component-name/src
```

Remember to export the component and any related utils and types needed by consumers from the entry point's `index.ts` file. This ensures that it is picked up by the packaging process, and made available to consumers under `@kirbydesign/extensions-angular/new-component-name`.

The generator adds a path in `tsconfig.base.json` to resolve any local `@kirbydesign/extensions-angular` references during development. This path should be modified to point to the compiled output in the project's `dist`-folder.

```ts
"@kirbydesign/extensions-angular/new-component-name": ["libs/extensions/angular/dist/new-component-name"]
```

This is to ensure that local tools—like Storybook—will not compile the components using their own build-pipeline but import and use the components from the precompiled build output similar to how consuming apps will.

## Local Development

For components in the extensions workspace, we use [Storybook](https://Storybook.js.org/docs/get-started) as a one-stop shop for local development, documentation and screenshot testing.

All components should have a story file as a starting point to debug and interact with the component during development.
Story files can be generated with nx and will be picked up by Storybook automatically.  
_Please note: This command will generate a story file for every component that doesn't already have one. Feel free to delete any generated story file(s) unrelated to your new component/extension. _

```shell
npx nx g @nx/angular:stories extensions-angular
```

It is important to note that to use the compiled component output we need Storybook to import components from their package aliases. This means that any relative import of components should be changed to `import { NewComponentName } from '@kirbydesign/extensions-angular/new-component-name';`.

To get live reload of any changes you make in the component and/or story file, start Storybook and library compilation in watch mode with:

```shell
npx nx dev extensions-angular
```

You can also start the Storybook development server without compiling libraries in parallel if you only need to edit documentation:

```shell
npx nx storybook extensions-angular
```

## Documenting Components

The recommended way to document extensions is to create [Storybook stories](https://Storybook.js.org/docs/get-started/whats-a-story). Documentation pages are automatically created with [Storybook's Autodocs feature](https://storybook.js.org/docs/writing-docs/autodocs) that collects every story and shows them alongside a property table with the component's API.

Consider:

- Documenting each component property with a story, so others can explore options via the 'Controls' panel
- Describing inputs, outputs and methods with `jsdoc` (/\*\*) comments. This shows up as a description in the property table on the docs page
- Adding `jsdoc` (/\*\*) comments for each story. This shows up on the docs page and can act as a short intro to what the story showcases.

For any custom documentation need consider consulting the comprehensive [Storybook documentation](https://Storybook.js.org/docs/get-started).

## Testing Components

The Kirby Extensions library is intentionally created with a focus on speed of development and experimentation. As a result we focus on light unit testing where needed for components created in the extensions package.

It is recommended to add a `.spec.ts` file per component/service/directive. The unit tests should test core functionality such as:

- expected value returned by function calls
- checking that attributes (tab-index, disabled, ...) are applied to markup when expected
- that events are correctly emitted on user-interaction

_We are working towards screenshot-testing all stories added to Storybook. More information will be added here once that is in place._
