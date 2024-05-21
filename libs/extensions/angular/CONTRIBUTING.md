# Contributing

## Fixing Bugs and Adding Features

- PR workflow
- Release workflow (TBD)

## Creating a new Component

A secondary entry point is.. and generally we provide one entry point per component, alllowing consumers to cherry-pick and lazy load individual components, reducing overhead in the initial bundle.

```shell
npx nx g library-secondary-entry-point --name=new-component-name --library=extensions-angular --skip-module
```

The skip-module flag is added here as in the following we will want to create a self-contained standalone UI component for others to consume. If a module is needed for your specific use-case, omit the flag.

Now with the secondary entry point in place, a new component with the same name as the secondary entry point can be added.

```shell
npx nx g component --name=new-component-name --directory=libs/extensions/angular/new-component-name/src
```

Remember to export the component and any related utils and types needed by consumers from the entry points index.ts file. This ensures that it is picked up by the packaging process, and made available to consumers under `@kirbydesign/extensions-angular/new-component-name`.

The generator adds a tsconfig path `tsconfig.base.json` to resolve any `@kirbydesign/extensions-angular` references during local development. But since we are developing a library we want to make sure that we are correctly compiling and packaging the components so they can be consumed by other projects (https://angular.io/guide/creating-libraries#building-and-rebuilding-your-library). Therefore the added line should be modified to instead target the dist bundle:

```ts
"@kirbydesign/extensions-angular/new-component-name": ["libs/extensions/angular/dist/new-component-name"]
```

something something build in watchmode.

## Local Development

For components in the extensions workspace, we use [Storybook](https://storybook.js.org/docs/get-started) as a one-stop shop for local development, documentation and testing.

For any newly generated component, a story file should be added so we have a starting point for debugging and playing around with the component during development.
Any missing stories file can be generated with nx, and should then be picked up by storybook.

```shell
npx nx g @nx/angular:stories extensions-angular
```

It is important to note that to use the compiled component output, we need to import the component(s) from the package alias - `import { NewComponentName } from '@kirbydesign/extensions-angular/new-component-name';` not a relative import to the component that lives just besides the story.

After generating the story, Storybook can be started for this workspace with

```shell
npx nx storybook extensions-angular
```

Before development can start, we need to specify the correct import alias for the newly created component in the story. Currently it is imported as a relative path but we need to point storybook to our path alias in order to use the compiled version of the component.

import { NewComponentNameComponent } from './new-component-name.component';

## Documenting Components

Components are documented with storybook [Documenting Components](#documenting-components)

## Testing Components

As there is an increased focus on speed of development and experimentation, we focus on light unit testing (with jest?) and screenshot testing of important states with Chromatic (composed storybook sent to chromatic?).
