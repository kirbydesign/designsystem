// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ElementCssCustomMatchers } from './kirby/testing/element-css-custom-matchers';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = () => {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Then we find all the files which needs test.
const appContext = require.context('./app', true, /^((?!\.tns).)*\.ts/);
const kirbyContext = require.context('./kirby', true, /^((?!(\.tns|\.d\.ts)).)*\.ts/);

// And load the modules.
appContext.keys().map(appContext);
kirbyContext.keys().map(kirbyContext);

beforeAll(() => {
  jasmine.addMatchers(ElementCssCustomMatchers);
});

// Finally, start Karma to run the tests.
__karma__.start();
