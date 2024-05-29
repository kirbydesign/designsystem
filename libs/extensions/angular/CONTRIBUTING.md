# Extensions Contribution Guidelines

## Fixing Bugs and Adding Features

If you wish to contribute a fix or a feature the preferred process is as follows:

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose)** (See: "[The good: Issue](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Issue)") if one is not already added to the issue tracker.
2. **Implementation:**
   - Make sure you have read: "[Before you get coding](#before-you-get-coding)".
   - Signal to others you are working on the issue by assigning yourself.
   - Create a branch from the [develop branch](https://github.com/kirbydesign/designsystem/tree/develop) following our [branch naming convention](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Branch).
   - Consider creating test that reproduces the bug or validates the feature, following guidelines in: "[The good: Test](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Test)".
3. **Create a PR with your changes.**

## Creating a new Component

Kirby Extensions exposes individual components as secondary entries in the packaged library. This allows cherry-picking and lazy loading individual components in apps, reducing overhead in the initial bundle. At the same time it creates a healthy separation of concerns between components.

A secondary entry point can be seen as a sub-module of the package, and is imported in code on the form `@kirbydesign/extensions-angular/component-name`. Generally there should be one entry point per extension, similar to how the core library has entry points for button, card etc.

A secondary entry point can be created from the command like with the following:

```shell
npx nx g library-secondary-entry-point --name=new-component-name --library=extensions-angular --skip-module
```

The skip-module flag is added here as in the following we will want to create a self-contained standalone UI component for others to consume. If a module is needed for your specific use-case, omit the flag.

Now with the secondary entry point in place, a new component with the same name as the secondary entry point can be added.

```shell
npx nx g component --name=new-component-name --directory=libs/extensions/angular/new-component-name/src
```

Remember to export the component and any related utils and types needed by consumers from the entry points index.ts file. This ensures that it is picked up by the packaging process, and made available to consumers under `@kirbydesign/extensions-angular/new-component-name`.

The generator adds a tsconfig path `tsconfig.base.json` to resolve any local `@kirbydesign/extensions-angular` references during development. This path should be modified to point to the compiled output in the projects dist-folder.

```ts
"@kirbydesign/extensions-angular/new-component-name": ["libs/extensions/angular/dist/new-component-name"]
```

This is done so that our local tools, like Storybook, will not compile the components using their own build-pipeline but instead use the components similar to how consuming apps will.

## Local Development

For components in the extensions workspace, we use [Storybook](https://Storybook.js.org/docs/get-started) as a one-stop shop for local development, documentation and screenshot testing.

All components should have a story file, so we have a starting point for debugging and playing around with the component during development.
Stories files can be generated with nx, and should then be picked up by Storybook automatically.

```shell
npx nx g @nx/angular:stories extensions-angular
```

It is important to note that to use the compiled component output, we need Storybook to import components from their package aliases. This means that any relative import of components should be changed from `import { NewComponentNameComponent } from './new-component-name.component';` to `import { NewComponentName } from '@kirbydesign/extensions-angular/new-component-name';`.

To see any changes you make in action, start storybook and library compilation in watch mode with

```shell
npx nx dev extensions-angular
```

You can also start the storybook development server without compiling libraries in parallel if you only need to edit documentations.

```shell
npx nx storybook extensions-angular
```

## Documenting Components

The recommended way to document extensions is to create [Storybook stories](https://Storybook.js.org/docs/get-started/whats-a-story) and showcase those on the components docs page. We recommend to add the autodocs tag to the `meta` default export of the component defined in the `.stories.ts` file, as this will auto-generate a docs page with all stories, alongside a property table that showcases the components API.

Consider:

- Documenting properties with a story, so others can explore options via the 'controls' panel
- Describe input and output properties with `jsdoc` (/\*\*) comments so they show up in the property table
- Add `jsdoc` (/\*\*) comments for each story with a short description of the functionality that is showcased

For any custom documentation needs consider consulting the comprehensive [Storybook](https://Storybook.js.org/docs/get-started) documentation.

## Testing Components

As there is an increased focus on speed of development and experimentation focus on light unit testing where needed.

It is recommended to add a `.spec.ts` file per component/service/directive. The unit tests should test core functionality such as:

- expected value returned by function calls
- checking that attributes (tab-index, disabled, ...) are applied to markup when expected
- that events are correctly emitted on user-interaction

_We are working towards screenshot-testing all stories added to storybook. More information will be added here once that is in place._
