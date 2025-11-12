import { DocsImportMapEngine } from '../tools/docs-import-map/dist/docs-import-map.engine.js';
import projectConfig from '../apps/cookbook/project.json' with { type: 'json' };

const plugins = projectConfig.targets.build.options.plugins;
const options = plugins.find((plugin) => plugin.path.includes('docs-import-map'))?.options;
const engine = new DocsImportMapEngine(options.distPath, options.outputPath);

engine.generate();
