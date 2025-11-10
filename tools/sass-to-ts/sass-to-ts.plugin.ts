import type { Plugin, PluginBuild } from 'esbuild';
import * as chokidar from 'chokidar';
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

      let isWatchMode = false;
      let watcher: chokidar.FSWatcher | null = null;

      // Transform files on build start
      build.onStart(async () => {
        const transformedFiles = options.transform
          .map(
            (filename) =>
              `${colorYellow}${filename}${colorReset} => ${colorGreen}${engine.getTargetFileName(
                filename
              )}${colorReset}`
          )
          .join('\n');

        console.info(`[sass-to-ts] Initial transform:\n${transformedFiles}`);
        await engine.transform(...options.transform);

        // Set up file watcher on first run
        if (!watcher) {
          isWatchMode = true;
          const watch = [...options.watchGlob, ...options.transform];

          console.info(
            `[sass-to-ts] Watching:\n${colorYellow}${options.watchGlob.join('\n')}${colorReset}`
          );
          console.info(
            `[sass-to-ts] Will transform:\n${colorYellow}${options.transform.join('\n')}${colorReset}`
          );

          watcher = chokidar.watch(watch).on('change', async (path) => {
            const transformedFiles = options.transform
              .map(
                (filename) =>
                  `${colorYellow}${filename}${colorReset} => ${colorGreen}${engine.getTargetFileName(
                    filename
                  )}${colorReset}`
              )
              .join('\n');

            console.info(
              `[sass-to-ts] Detected changes in: ${colorYellow}'${path}'${colorReset}, transforming:\n${transformedFiles}`
            );
            await engine.transform(...options.transform);
          });
        }
      });

      // Clean up watcher on build end
      build.onEnd(() => {
        if (watcher && !isWatchMode) {
          watcher.close();
          watcher = null;
        }
      });
    },
  };
}
