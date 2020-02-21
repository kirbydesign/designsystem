import { render } from 'sass-extract';

import { SassFileSystem } from './filesystem';
import * as path from 'path';

declare type SassImportResolveCallback = (resolve: { file: string } | null) => void;

export abstract class SassEngine {
  constructor(protected sassFileGlobs: string[]) {}

  abstract async _transformAndWrite(
    file: string,
    fileSystem: SassFileSystem
  ): Promise<string | null>;

  public async transform(files: string[], fileSystem: SassFileSystem): Promise<string[]> {
    return Promise.all(files.map((filename) => this._transformAndWrite(filename, fileSystem)));
  }

  protected async extractGlobalVariables(pathToFile: string, fileSystem: SassFileSystem) {
    // Extract contents from SCSS file
    const compileOptions = {
      file: pathToFile,
      importer: (url: string, prev: string, resolve: SassImportResolveCallback) => {
        const resolved = fileSystem.resolve(url, prev, this.sassFileGlobs);
        resolve(resolved ? { file: resolved } : null);
      },
    };
    const extractOptions = { plugins: [] };
    let result;
    try {
      result = await render(compileOptions, extractOptions);
    } catch (err) {
      result = { vars: { global: {} } };
    }
    const globalVariables = this.flatten(result.vars.global as object);

    return Object.keys(globalVariables).length > 0 ? globalVariables : null;
  }

  private flatten(input: object): object {
    const isArray = (candidate) => Array.isArray(candidate);
    const isObject = (candidate) =>
      candidate !== null && typeof candidate === 'object' && !isArray(candidate);
    const hasValueWithoutUnit = (candidate) => {
      const keys = Object.keys(candidate);
      return (
        isObject(candidate) &&
        keys.includes('value') &&
        (!keys.includes('unit') || candidate['unit'] === '')
      );
    };

    if (input == null || (!isObject(input) && !isArray(input))) {
      return input;
    } else if (isArray(input)) {
      return (input as any[]).map((each) => this.flatten(each['value']));
    } else {
      const flattened = {};
      Object.entries(input)
        .filter(([key]) => key.length > 0)
        .forEach(([key, value]) => {
          if (hasValueWithoutUnit(value)) {
            value = value['value'];
          }
          if (isObject(value)) {
            ['type', 'sources', 'declarations'].forEach((blacklisted) => {
              delete value[blacklisted];
            });
          }
          flattened[key] = this.flatten(value);
        });
      return flattened;
    }
  }
}

export class SassToJsonEngine extends SassEngine {
  constructor(sassFileGlobs: string[]) {
    super(sassFileGlobs);
  }

  async _transformAndWrite(file: string, fileSystem: SassFileSystem) {
    const globalVariables = await this.extractGlobalVariables(file, fileSystem);
    if (globalVariables) {
      const data = JSON.stringify(globalVariables, null, 2);
      const outputFile = `${file}.json`;
      await fileSystem.writeFile(outputFile, data);
      return outputFile;
    }
    return null;
  }
}

export class SassToTypescriptEngine extends SassEngine {
  constructor(sassFileGlobs: string[]) {
    super(sassFileGlobs);
  }

  async _transformAndWrite(file: string, fileSystem: SassFileSystem) {
    const globalVariables = await this.extractGlobalVariables(file, fileSystem);
    if (globalVariables) {
      const data = `export const data = ${this.asSource(globalVariables)};`;
      const inputFile = path.parse(file);
      const outputFile = `${path.join(inputFile.dir, inputFile.name)}.styling.ts`;
      await fileSystem.writeFile(outputFile, data);
      return outputFile;
    }
    return null;
  }

  private asSource(input: any): string {
    if (input === null) {
      return 'null';
    } else if (Array.isArray(input)) {
      return `[${input.map((each) => this.asSource(each)).join(', ')}]`;
    } else {
      switch (typeof input) {
        case 'function':
          return null;
        case 'object':
          const contents = Object.keys(input)
            .map((key) => ({ key: key.replace(/-/g, '_'), value: this.asSource(input[key]) }))
            .map(({ key, value }) => `${key}: ${value}`)
            .join(', ');
          return `{${contents}}`;
        case 'string':
          return `'${input.replace(/\\/g, '\\\\')}'`;
        default:
          return input;
      }
    }
  }
}
