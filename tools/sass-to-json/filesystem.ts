import { Compiler } from 'webpack';
import * as util from 'util';
import * as multimatch from 'multimatch';

import * as fs from 'fs';
import * as path from 'path';

const readdirAsync = util.promisify(fs.readdir);
const statAsync = util.promisify(fs.stat);

export function findPathOf(context: string, filename: string): string {
  do {
    const root = path.resolve(context, filename);
    if (fs.existsSync(root)) {
      return context;
    }
    context = path.resolve(context, '..');
    if (!fs.existsSync(context)) {
      context = null;
    }
  } while (context);
}

/**
 * Traverses a path (directory) recursively to find files using a filter (or all files if filter is omitted).
 * @param root the directory to traverse for finding files
 * @param filter the (optional) filter to use for including / excluding files
 */
async function walk(root: string, filter: (string) => boolean): Promise<string[]> {
  let files: any = await readdirAsync(root);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(root, file);
      const stats = await statAsync(filePath);
      if (stats.isDirectory()) {
        return walk(filePath, filter);
      } else if (stats.isFile() && filter(filePath)) {
        return filePath;
      }
    })
  );

  return files
    .reduce((all, folderContents) => all.concat(folderContents), [])
    .filter((each) => !!each);
}

export abstract class SassFileSystem {
  abstract getProjectRoot(): string;

  writeFile(path: string, data: string): Promise<unknown> {
    const fn = util.promisify(fs.writeFile);
    return fn(path, data);
  }

  findFiles(globs: string[]): Promise<string[]> {
    const filter = (file) => {
      const relativePath = this.makeRelative(file);
      return multimatch(relativePath, globs).length > 0;
    };
    return walk(this.getProjectRoot(), filter);
  }

  resolve(target: string, origin: string, globs: string[]): string {
    const originPath = path.dirname(origin);
    const targetPath = target.match('\\.s?css$') ? target : `${target}.scss`;
    const parsed = path.parse(targetPath);

    const strategies = [
      // Use <target> without modifications
      () => target,

      // Join <root> + <target dir> + <target filename>
      () => path.join(this.getProjectRoot(), parsed.dir, parsed.base),

      // Join <root> + <target dir> + "_" + <target filename>
      () => path.join(this.getProjectRoot(), parsed.dir, `_${parsed.base}`),

      // Join <root> + <origin> + <target dir> + <target filename>
      () => path.join(this.getProjectRoot(), originPath, parsed.dir, parsed.base),

      // Join <root> + <origin> + <target dir> + "_" + <target filename>
      () => path.join(this.getProjectRoot(), originPath, parsed.dir, `_${parsed.base}`),

      // Join <origin> + <target dir> + <target filename>
      () => path.join(originPath, parsed.dir, parsed.base),

      // Join <origin> + <target dir> + "_" + <target filename>
      () => path.join(originPath, parsed.dir, `_${parsed.base}`),
    ];

    // Attempt to resolve modules (imports starting with a ~)
    let resolved;
    if (targetPath.startsWith('~')) {
      resolved = path.resolve(this.getProjectRoot(), 'node_modules', targetPath.substr(1));
      if (!fs.existsSync(resolved)) {
        resolved = null;
      }
    }

    // Fallback strategies to resolving
    for (let i = 0; i < strategies.length && !resolved; i++) {
      resolved = strategies[i]();
      if (!fs.existsSync(resolved)) {
        resolved = null;
      }
    }

    if (!resolved) {
      throw new Error(`Unable to resolve dependencies from target: ${target}, origin: ${origin}`);
    } else {
      const allowed = multimatch(this.makeRelative(resolved), globs).length > 0;
      return allowed ? resolved : null;
    }
  }

  makeAbsolute = (relative: string) => path.resolve(path.join(this.getProjectRoot(), relative));
  makeRelative = (absolute: string) => absolute.replace(this.getProjectRoot(), '');
}

export class NodeFilesystem extends SassFileSystem {
  constructor(private projectRoot: string) {
    super();
  }

  getProjectRoot(): string {
    return this.projectRoot;
  }
}

export class WebpackFilesystem extends SassFileSystem {
  constructor(private compiler: Compiler) {
    super();
  }

  getProjectRoot(): string {
    let context = this.compiler.context;
    return findPathOf(context, 'angular.json');
  }
}
