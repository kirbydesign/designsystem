/**
 * Generates the docs import map from the built design system.
 *
 * IMPORTANT: This script reads from libs/designsystem/dist (the compiled output).
 * This automatically works if run with the cookbook build process.
 *
 * If running this script on its own, you must build the design system first:
 *
 *   nx build designsystem
 */

import { DocsImportMapEngine } from '../tools/docs-import-map/dist/docs-import-map.engine.js';
import projectConfig from '../apps/cookbook/project.json' with { type: 'json' };

const plugins = projectConfig.targets.build.options.plugins;
const options = plugins.find((plugin) => plugin.path.includes('docs-import-map'))?.options;
const engine = new DocsImportMapEngine(options.distPath, options.outputPath, true);

engine.generate();
