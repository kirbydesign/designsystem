import { Compiler, Plugin } from 'webpack';
import * as validateOptions from 'schema-utils';
import * as chokidar from 'chokidar';

import { SassToTsWebpackPluginOptions, SCHEMA } from './schema';
import { SassToTypescriptEngine } from './sass-to-ts.engine';

export class SassToTsWebpackPlugin implements Plugin {
  static readonly NAME = 'SassToTsWebpackPlugin';
  engine: SassToTypescriptEngine;

  constructor(private options: SassToTsWebpackPluginOptions) {
    validateOptions(SCHEMA, options, 'SASS to TS Plugin');
    this.engine = new SassToTypescriptEngine();
  }

  apply(compiler: Compiler) {
    console.warn('SassToTsWebpackPlugin - watching:', JSON.stringify(this.options.watchGlob));
    console.warn('SassToTsWebpackPlugin - will transform:', JSON.stringify(this.options.transform));
    const watch = [...this.options.watchGlob, ...this.options.transform];
    chokidar.watch(watch).on('all', (event, path) => {
      if (event === 'add' || event === 'change') {
        this.engine.transform(...this.options.transform);
      }
    });
  }
}
