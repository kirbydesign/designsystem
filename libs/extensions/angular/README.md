# Kirby Extensions Angular
The Kirby Extensions library is a collection of design guidelines and components that build on top of the core Kirby Design library.
The components follow the Kirby Design guidelines, but they differ from the core components by being more product-specific. 
This means that components in this library are shared across one or more products, and might not be universally useful to the whole ecosystem.
Though some components can also become core-candidates and graduate once they are battle-tested and initial experimentation is over.

Extensions allow for quicker iteration and less focus on generalising behavior, while the test and especially documentation burden is also significantly lower.

Components in this library are developed and maintained by product teams, with support from [Team Kirby](https://github.com/kirbydesign/designsystem/blob/develop/.github/SUPPORT.md#team-kirby).

## Using Kirby Extensions

> [!IMPORTANT]  
> Kirby Extensions uses core designsystem components from the `@kirbydesign/designsystem` package.
> See [guidelines for installing @kirbydesign/designsystem](https://github.com/kirbydesign/designsystem/?tab=readme-ov-file#installation) before continuing below.

1. install the package through npm: `npm i @kirbydesign/extensions-angular`
2. import components directly from their specific entry points, and import them  into your Angular module or standalone component:

```ts
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';

@Component({
  selector: 'my-component'
  standalone: true
  imports: [ImageBannerComponent],
})
export class MyComponent {}

// OR

@NgModule({
  imports: [ImageBannerComponent],
})
export class MyModule {}
```

## Contributing
A comprehensive description of contributing fixes, features or components can be found in the [Extensions Contribution Guidelines](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md).

### Quickstart
1. clone the `kirbydesign/designsystem` repo locally
2. run `npm i` to install dependencies
3. run `npx nx dev extensions-angular` to launch Storybook and build the local component libraries in watch-mode, so any changes you make will be reflected in Storybook
    1. if you are contributing to the documentation and do not need to modify any libraries, you can run Storybook directly with `npx nx storybook extensions-angular`
4. if you are contributing a feature or a bug fix, add it and follow [the guidelines for updating docs and testing components](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md#documenting-components)
5. if you are contributing a component, follow [the steps for creating a new component](https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/CONTRIBUTING.md#creating-a-new-component)