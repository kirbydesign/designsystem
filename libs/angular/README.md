# Kirby Angular
The Kirby Angular library contains Angular wrappers for the Kirby Core web components.

The components are thin wrappers that proxy properties and events of the underlying web component using Angular's `@Input` and `@Output` decorators.

The Kirby Angular library enables the Kirby Core components to be used in an Angular project without having to use [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) in all modules, effectively ignoring tag validation.

It also enables Angular features such as `ViewChild(SomeComponent)` queries and dependency injection among others.

Read more about the benefits of using Angular wrappers in the [Stencil Angular documentation](https://stenciljs.com/docs/angular), which inspired this approach.