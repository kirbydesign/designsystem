import { render } from 'sass-extract';

import { SassToJsonFileSystem } from './filesystem';

declare type SassImportResolveCallback = (resolve: { file: string } | null) => void;

export class SassToJsonEngine {
  constructor(private sassFileGlobs: string[]) {}

  public async transform(files: string[], fileSystem: SassToJsonFileSystem): Promise<string[]> {
    return Promise.all(files.map((filename) => this.transformAndWrite(filename, fileSystem)));
  }

  private async transformAndWrite(file: string, fileSystem: SassToJsonFileSystem) {
    const globalVariables = await this.extractGlobalVariables(file, fileSystem);
    if (globalVariables) {
      const data = JSON.stringify(globalVariables, null, 2);
      const outputFile = `${file}.json`;
      await fileSystem.writeFile(outputFile, data);
      return outputFile;
    }
    return null;
  }

  private async extractGlobalVariables(pathToFile: string, fileSystem: SassToJsonFileSystem) {
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
    const globalVariables = result.vars.global;
    return Object.keys(globalVariables).length > 0 ? globalVariables : null;
  }
}
