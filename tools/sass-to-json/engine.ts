import { render } from 'sass-extract';

import { SassToJsonFileSystem } from './filesystem';

export class SassToJsonEngine {
  public async transform(files: string[], fileSystem: SassToJsonFileSystem): Promise<any> {
    return Promise.all(files.map((filename) => this.transformAndWrite(filename, fileSystem)));
  }

  private async transformAndWrite(file: string, fileSystem: SassToJsonFileSystem) {
    const globalVariables = await this.extractGlobalVariables(file, fileSystem);
    if (globalVariables) {
      const data = JSON.stringify(globalVariables, null, 2);
      const outputFile = `${file}.json`;
      return fileSystem.writeFile(outputFile, data);
    }
    return true;
  }

  private async extractGlobalVariables(pathToFile: string, fileSystem: SassToJsonFileSystem) {
    const compileOptions = {
      file: pathToFile,
      importer: (url, prev, resolve) => {
        resolve({ file: fileSystem.resolve(url, prev) });
      },
    };
    const extractOptions = { plugins: ['compact'] };
    let result;
    try {
      result = await render(compileOptions, extractOptions);
    } catch (err) {
      console.error(err);
      result = { vars: { global: {} } };
    }
    const globalVariables = result.vars.global;
    return Object.keys(globalVariables).length > 0 ? globalVariables : null;
  }
}
