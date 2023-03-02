const fs = require('fs');
import { MockComponent } from 'ng-mocks';

// Define the component to mock
class MyComponent {
  constructor() {
    console.log('MyComponent created');
  }

  doSomething() {
    console.log('MyComponent doing something');
  }
}

// Generate a mock of the component using ng-mocks
const MockedComponent = MockComponent(MyComponent);

// Create the mocked component file
const mockClassName = 'Mock' + MyComponent.name;
const mockComponentFile = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-${mockClassName.toLowerCase()}',
  template: ''
})
export class ${mockClassName} extends MockedComponent {
}
`;

// Write the mocked component file to disk
fs.writeFile(`${mockClassName}.ts`, mockComponentFile, (err: any) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Mocked component file '${mockClassName}.ts' created.`);
});

import { Component, Type } from '@angular/core';
import { readFile } from 'fs/promises';

async function loadComponent<T>(filePath: string): Promise<Type<T>> {
  try {
    const fileContents = await readFile(filePath, 'utf-8');
    const module = {
      exports: {
        default: { prototype: () => {} },
      },
    };
    const evalResult = eval(fileContents);
    const componentType = module.exports?.default;

    if (
      typeof componentType === 'function'
      // &&
      // Component.prototype.isPrototypeOf(componentType.prototype)
    ) {
      return componentType as Type<T>;
    } else {
      throw new Error(`The file at '${filePath}' does not contain a valid Angular component.`);
    }
  } catch (error) {
    console.error(`An error occurred while loading the component from '${filePath}': ${error}`);
    throw error;
  }
}
