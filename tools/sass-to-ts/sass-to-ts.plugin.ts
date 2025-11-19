import { readFileSync } from 'fs';
import type { Plugin, PluginBuild } from 'esbuild';
import { SassToTypescriptEngine } from './sass-to-ts.engine';

export interface SassToTsPluginOptions {
  watchGlob: string[];
  transform: string[];
}

export default function sassToTsPlugin(options: SassToTsPluginOptions): Plugin {
  return {
    name: 'sass-to-ts-plugin',
    setup(build: PluginBuild) {
      const engine = new SassToTypescriptEngine();
      const colorGreen = '\x1b[92m';
      const colorYellow = '\x1b[93m';
      const colorReset = '\x1b[0m';

      // Register Sass files as dependencies so esbuild knows to watch them
      build.onLoad({ filter: /\.(scss|sass)$/ }, async (args) => {
        const contents = readFileSync(args.path, 'utf8');
        return {
          contents,
          loader: 'text',
          watchFiles: [args.path],
        };
      });

      // Transform files on build start (initial build and every rebuild in watch mode)
      build.onStart(async () => {
        const transformedFiles = options.transform
          .map(
            (filename) =>
              `${colorYellow}${filename}${colorReset} => ${colorGreen}${engine.getTargetFileName(
                filename
              )}${colorReset}`
          )
          .join('\n');

        console.info(`[sass-to-ts] Transforming:\n${transformedFiles}`);
        await engine.transform(...options.transform);
      });
    },
  };
}
