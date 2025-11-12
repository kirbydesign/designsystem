import type { Plugin, PluginBuild } from 'esbuild';
import { DocsImportMapEngine } from './docs-import-map.engine';

export interface DocsImportMapPluginOptions {
  distPath: string;
  outputPath: string;
  verbose?: boolean;
}

export default function docsImportMapPlugin(options: DocsImportMapPluginOptions): Plugin {
  return {
    name: 'docs-import-map-plugin',
    setup(build: PluginBuild) {
      const verbose = options.verbose ?? false;
      const engine = new DocsImportMapEngine(options.distPath, options.outputPath, verbose);
      const colorGreen = '\x1b[92m';
      const colorYellow = '\x1b[93m';
      const colorReset = '\x1b[0m';

      build.onStart(async () => {
        if (verbose) {
          console.info(
            `[docs-import-map] Checking: ${colorYellow}${engine.getOutputPath()}${colorReset}`
          );
        }

        try {
          const wasWritten = engine.generate();
          if (verbose) {
            console.info(`[docs-import-map] ${colorGreen}✓${colorReset} Complete`);
          } else if (wasWritten) {
            console.info(
              `[docs-import-map] ${colorGreen}✓${colorReset} Generated: ${engine.getOutputPath()}`
            );
          }
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
    },
  };
}
