import * as chokidar from 'chokidar';
import { validate } from 'schema-utils';
import { Compiler, WebpackPluginInstance } from 'webpack';

import { SassToTypescriptEngine } from './sass-to-ts.engine';
import { SassToTsWebpackPluginOptions, SCHEMA } from './schema';

export class SassToTsWebpackPlugin implements WebpackPluginInstance {
  static readonly NAME = 'SassToTsWebpackPlugin';
  engine: SassToTypescriptEngine;
  shouldLog = false;

  constructor(private options: SassToTsWebpackPluginOptions) {
    const configuration = { name: 'SASS to TS Plugin' };
    validate(SCHEMA, options, configuration);
    this.engine = new SassToTypescriptEngine();
  }

  apply(compiler: Compiler) {
    const colorGreen = '\x1b[92m';
    const colorYellow = '\x1b[93m';
    const colorReset = '\x1b[0m';

    console.info(
      `${SassToTsWebpackPlugin.NAME} - watching:\n${colorYellow}${this.options.watchGlob.join(
        '\n'
      )}${colorReset}`
    );
    console.info(
      `${SassToTsWebpackPlugin.NAME} - will transform:\n${colorYellow}${this.options.transform.join(
        '\n'
      )}${colorReset}`
    );
    // We don't want to bloat the output on initial compilation,
    // so only log changes after first compilation:
    compiler.hooks.done.tap(SassToTsWebpackPlugin.NAME, () => {
      this.shouldLog = true;
    });
    const watch = [...this.options.watchGlob, ...this.options.transform];
    chokidar.watch(watch).on('all', (event, path) => {
      if (event === 'add' || event === 'change') {
        if (this.shouldLog) {
          const transformedFiles = this.options.transform.map(
            (filename) =>
              `${colorYellow}${filename}${colorReset} => ${colorGreen}${this.engine.getTargetFileName(
                filename
              )}${colorReset}`
          );
          console.info(
            `${
              SassToTsWebpackPlugin.NAME
            } - detected changes on: ${colorYellow}'${path}'${colorReset}, transforming:\n${transformedFiles.join(
              '\n'
            )}`
          );
        }
        this.engine.transform(...this.options.transform);
      }
    });
  }
}
