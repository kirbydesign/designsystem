# Kirby Angular
The Kirby Angular library contains Angular wrappers for the Kirby Core web components.

The components are thin wrappers that proxies properties and events through Angular `@Input` and `@Output` to the underlying web component.

The Kirby Angular library enables the Kirby Core components to be used in an Angular project without having to use [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) in all modules, effectively ignoring tag validation.

It also enables Angular features such as `ViewChild(SomeComponent)` queries and dependency injection among others.

Read more in the [Stencil Angular documentaion](https://stenciljs.com/docs/angular).