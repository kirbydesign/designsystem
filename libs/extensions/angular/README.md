# Kirby Extensions Angular
The Kirby Extensions library is a collection of design guidelines and components that build on top of the core Kirby Design library.
The components follow the Kirby Design guidelines, but they differ from the core components by being more product-specific. 
This means that components in this library are shared across one or more products, and might not be universally useful to the whole ecosystem.
Though some components can also become core-candidates and graduate once they are battle-tested and initial experimentation is over.

Extensions allow for quicker iteration and less focus on generalising behavior, while the test and especially documentation burden is also significantly lower.

Components in this library are developed and maintained by product teams, with support from [Team Kirby](https://github.com/kirbydesign/designsystem/blob/develop/.github/SUPPORT.md#team-kirby).

## Using Kirby Extensions
This section is work in progress, and the Kirby Extensions package has not yet been published.
It will be updated with information on how to install and use the extensions shortly. 

## Contributing
A comprehensive description of contributing fixes, features or components can be found in the [Extensions Contribution Guidelines](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md).

### Quickstart
- clone the `kirbydesign/designsystem` repo locally
- run `npm i` to install dependencies
- run `npx nx dev extensions-angular` to launch Storybook and build the local component libraries in watch-mode, so any changes you make will be reflected in Storybook
  - if you are contributing to the documentation and do not need to modify any libraries, you can run Storybook directly with `npx nx storybook extensions-angular`
- if you are contributing a feature or a bug fix, add it and follow [the guidelines for updating docs and testing components](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md#documenting-components)
- if you are contributing a component, follow [the steps for creating a new component](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md#creating-a-new-component)