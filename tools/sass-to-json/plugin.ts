import { Compiler, Plugin } from 'webpack';
import * as validateOptions from 'schema-utils';
import * as multimatch from 'multimatch';

import { SassToJsonWebpackPluginOptions, SCHEMA } from './schema';
import { SassToJsonEngine } from './engine';
import { SassToJsonFileSystem, WebpackFilesystem } from './filesystem';

export class SassToJsonWebpackPlugin implements Plugin {
  static readonly NAME = 'SassToJsonWebpackPlugin';

  fileSystem: SassToJsonFileSystem;
  engine: SassToJsonEngine;
  startTime: number;
  prevTimestamps: Map<string, number>;

  constructor(private options: SassToJsonWebpackPluginOptions = {}) {
    validateOptions(SCHEMA, options, 'SASS to JSON Plugin');

    this.engine = new SassToJsonEngine();
    this.startTime = Date.now();
    this.prevTimestamps = new Map<string, number>();
  }

  apply(compiler: Compiler) {
    this.fileSystem = new WebpackFilesystem(compiler);

    // Do initial processing of "all" SCSS files
    if (compiler.options.watch) {
      this.fileSystem
        .findFiles(this.options.sassFiles)
        .then((files) => this.engine.transform(files, this.fileSystem));
    }

    // Enable hooks (to handle watching, and processing before compile)
    compiler.hooks.beforeRun.tapPromise(SassToJsonWebpackPlugin.NAME, (compiler) => {
      const files = this.changedScssFiles(compiler.fileTimestamps);
      return this.engine.transform(files, this.fileSystem);
    });
    compiler.hooks.watchRun.tapPromise(SassToJsonWebpackPlugin.NAME, (compiler) => {
      const files = this.changedScssFiles(compiler.fileTimestamps);
      return this.engine.transform(files, this.fileSystem);
    });
  }

  private changedScssFiles(filesWithTimestamp: Map<string, number>): string[] {
    // Determine changed files
    const files = Array.from(filesWithTimestamp.keys());
    const hasChanged = (file) =>
      (this.prevTimestamps.get(file) || this.startTime) <
      (filesWithTimestamp.get(file) || Infinity);
    const changedFiles = files.filter(hasChanged).map(this.fileSystem.makeRelative);

    // Update timestamps
    this.prevTimestamps = filesWithTimestamp;

    // Match on SASS glob-expression and make paths absolute
    return multimatch(changedFiles, this.options.sassFiles).map(this.fileSystem.makeAbsolute);
  }
}
