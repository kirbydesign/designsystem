import type { Plugin, PluginBuild } from 'esbuild';
import { DocsImportMapEngine } from './docs-import-map.engine.js';

export interface DocsImportMapPluginOptions {
  distPath: string;
  outputPath: string;
}

export default function docsImportMapPlugin(options: DocsImportMapPluginOptions): Plugin {
  return {
    name: 'docs-import-map-plugin',
    setup(build: PluginBuild) {
      const engine = new DocsImportMapEngine(options.distPath, options.outputPath);
      const colorGreen = '\x1b[92m';
      const colorYellow = '\x1b[93m';
      const colorReset = '\x1b[0m';

      // Generate the import map on build start (initial build and every rebuild in watch mode)
      build.onStart(async () => {
        console.info(
          `[docs-import-map] Checking: ${colorYellow}${engine.getOutputPath()}${colorReset}`
        );

        try {
          engine.generate();
          console.info(`[docs-import-map] ${colorGreen}✓${colorReset} Complete`);
        } catch (error) {
          console.error(
            `[docs-import-map] Failed to generate import map: ${error instanceof Error ? error.message : String(error)}`
          );
          // Return an error to fail the build
          return {
            errors: [
              {
                text: `Failed to generate docs import map: ${error instanceof Error ? error.message : String(error)}`,
              },
            ],
          };
        }
      });

      // Watch the dist package.json file for changes
      build.onLoad({ filter: /dist\/package\.json$/ }, async (args) => {
        return {
          contents: '',
          loader: 'empty',
          watchFiles: [args.path],
        };
      });
    },
  };
}
