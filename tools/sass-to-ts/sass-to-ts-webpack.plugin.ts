import { Compiler, Plugin } from 'webpack';
import * as validateOptions from 'schema-utils';
import * as chokidar from 'chokidar';

import { SassToTsWebpackPluginOptions, SCHEMA } from './schema';
import { SassToTypescriptEngine } from './sass-to-ts.engine';

export class SassToTsWebpackPlugin implements Plugin {
  static readonly NAME = 'SassToTsWebpackPlugin';
  engine: SassToTypescriptEngine;
  shouldLog = false;

  constructor(private options: SassToTsWebpackPluginOptions) {
    validateOptions(SCHEMA, options, 'SASS to TS Plugin');
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
    compiler.hooks.done.tap(SassToTsWebpackPlugin.NAME, (stats) => {
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
