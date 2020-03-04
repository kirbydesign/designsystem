import * as sassExtract from 'sass-extract';

import * as compactUnitPlugin from './sass-exctract-compact-unit.plugin';
const fs = require('fs').promises;

export class SassToTypescriptEngine {
  async transform(...files: string[]) {
    return Promise.all(files.map((filename) => this._transformAndWrite(filename)));
  }

  getTargetFileName(filename: string) {
    return filename.replace('.scss', '.styles.ts');
  }

  private async _transformAndWrite(filename) {
    const rendered = await sassExtract.render({ file: filename }, { plugins: [compactUnitPlugin] });
    const data = this._serialize(rendered.vars.global);
    const content = `export const styles = ${data};`;
    const newFilename = this.getTargetFileName(filename);
    return fs.writeFile(newFilename, content);
  }

  private _serialize(input: any): string {
    if (input === null) {
      return 'null';
    } else if (Array.isArray(input)) {
      return `[${input.map((each) => this._serialize(each)).join(', ')}]`;
    } else {
      switch (typeof input) {
        case 'function':
          return null;
        case 'object':
          const contents = Object.keys(input)
            .map((key) => ({ key, value: this._serialize(input[key]) }))
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
