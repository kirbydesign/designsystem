// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ElementCssCustomMatchers } from '@kirbydesign/designsystem/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';

@NgModule({
  providers: [provideZoneChangeDetection()],
  imports: [BrowserDynamicTestingModule],
})
class TestSetupModule {}
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(TestSetupModule, platformBrowserDynamicTesting(), {
  teardown: { destroyAfterEach: false },
});

beforeAll(() => {
  jasmine.addMatchers(ElementCssCustomMatchers);
});
