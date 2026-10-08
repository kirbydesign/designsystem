import { Component, Type } from '@angular/core';
import { MetadataOverride, TestBed } from '@angular/core/testing';

import { KIRBY_IMPORTS } from './kirby-imports';
import { KirbyTestingBaseModule } from './kirby-testing-base.module';

/**
 * Component metadata override that replaces the Kirby components, directives and modules
 * imported by a standalone component with their mocks.
 *
 * Standalone components compile against their own `imports`, so unlike components declared in
 * an NgModule, they don't use the mocks from `KirbyTestingModule` without this override.
 *
 * @example
 * TestBed.configureTestingModule({ imports: [KirbyTestingModule, MyStandaloneComponent] });
 * TestBed.overrideComponent(MyStandaloneComponent, kirbyTestingOverride);
 *
 * @example
 * // Spectator:
 * createComponentFactory({
 *   component: MyStandaloneComponent,
 *   imports: [KirbyTestingModule],
 *   overrideComponents: [[MyStandaloneComponent, kirbyTestingOverride]],
 * });
 */
export const kirbyTestingOverride: MetadataOverride<Component> = {
  remove: { imports: KIRBY_IMPORTS },
  add: { imports: [KirbyTestingBaseModule] },
};

/**
 * Replaces the Kirby components, directives and modules imported by the given standalone
 * components with their mocks. See `kirbyTestingOverride`.
 *
 * Call after `TestBed.configureTestingModule()` and before `TestBed.createComponent()`.
 *
 * @example
 * TestBed.configureTestingModule({ imports: [KirbyTestingModule, MyStandaloneComponent] });
 * overrideKirbyImports(MyStandaloneComponent);
 */
export function overrideKirbyImports(...components: Type<unknown>[]): void {
  components.forEach((component) => TestBed.overrideComponent(component, kirbyTestingOverride));
}
