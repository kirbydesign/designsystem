import * as prettier from 'prettier';
import * as sass from 'sass';

const fs = require('fs').promises;

export class SassToTypescriptEngine {
  async transform(...files: string[]) {
    return Promise.all(files.map((filename) => this._transformAndWrite(filename)));
  }

  getTargetFileName(filename: string) {
    return filename.replace('.scss', '.styles.ts');
  }

  private async _transformAndWrite(filename: string) {
    const css: string = this.renderCss(filename);
    const json = this.convertCssToJson(css);
    const styleObject = this.parseJSON(json);
    const tsOutput = this.renderStyleObject(styleObject);
    const tsOutputFormatted = await this.formatWithPrettier(tsOutput);
    const newFilename = this.getTargetFileName(filename);
    return fs.writeFile(newFilename, tsOutputFormatted);
  }

  private renderCss(filename: string): string {
    return sass
      .compile(filename, {
        loadPaths: ['libs/designsystem/src/lib/scss', 'libs/core/src/scss'],
        style: 'compressed', // Don't render comments
      })
      .css.toString();
  }

  private convertCssToJson(css: string): string {
    const cssSelectorDelimiterRegEx = /}(?:\s\n)*(\w+)/gm;
    const jsonObjectDelimiterReplacement = '},\n\n $1';
    const cssPropertyRegEx = /([\w.-]+)\:/gm;
    const jsonPropertyReplacement = '"$1":';
    const cssPropertyDelimiterRegEx = /;/gm;
    const jsonPropertyDelimiterReplacement = ',';
    const cssSelectorRegEx = /([\w-]+) *{/gm;
    const jsonRootKeyReplacement = '"$1":{';

    const cssToJson = css
      .replace(cssSelectorDelimiterRegEx, jsonObjectDelimiterReplacement)
      .replace(cssPropertyRegEx, jsonPropertyReplacement)
      .replace(cssPropertyDelimiterRegEx, jsonPropertyDelimiterReplacement)
      .replace(cssSelectorRegEx, jsonRootKeyReplacement);
    return `{${cssToJson}}`;
  }

  private parseJSON(jsonRoot: string) {
    const parseFlattenedKeyToObject = this.parseFlattenedKeyToObject;
    const kebabToCamelCase = (kebabString: string) =>
      kebabString.replace(/-./g, (x) => x[1].toUpperCase());

    const reviverFn = function (key: string, value: string) {
      const nestedKeys = key.split('.').map(kebabToCamelCase);
      const rootKey = nestedKeys[0];
      // Return root value +  root entries as-is:
      if (!key || key === rootKey) return value;

      // 'this' in context of the reviver function is the object
      // containing the property while parsing the JSON string:
      const jsonObject: {} = this;
      // Unflatten dot-separated property tree (e.g. 'transition-easings.modal.enter'):
      parseFlattenedKeyToObject(nestedKeys, value, jsonObject);
    };

    return JSON.parse(jsonRoot, reviverFn);
  }

  private parseFlattenedKeyToObject(nestedKeys: string[], value: string, jsonObject: {}) {
    nestedKeys.reduce((nestedMap, nestedKey, index) => {
      let nestedObject = nestedMap[nestedKey];
      if (!nestedObject) {
        const isLeafProperty = index === nestedKeys.length - 1;
        nestedObject = nestedMap[nestedKey] = isLeafProperty ? value : {};
      }
      return nestedObject;
    }, jsonObject);
  }

  private renderStyleObject(styleObject: {}): string {
    return Object.entries(styleObject)
      .map(([style, styleValue]) => {
        const propertyWithQuotationRegEx = /\"(\w+)\"\:/gm;
        const tsPropertyReplacement = '$1:';
        const doubleQuoteRegEx = /\"/gm;
        const singleQuoteReplacement = "'";
        const tsStyleMap = JSON.stringify(styleValue)
          .replace(propertyWithQuotationRegEx, tsPropertyReplacement)
          .replace(doubleQuoteRegEx, singleQuoteReplacement);
        return `export const ${style} = ${tsStyleMap};`;
      })
      .join('\n\n');
  }

  private async formatWithPrettier(code: string) {
    const filePath = await prettier.resolveConfigFile();
    const options = await prettier.resolveConfig(filePath);
    return prettier.format(code, { ...options, parser: 'babel' });
  }
}
