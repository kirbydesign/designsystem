import * as path from 'path';

export default {
  globs: ['libs/core/**/*.component.ts'],
  outdir: 'libs/core',
  litelement: true,
  plugins: [
    {
      name: 'kirby-infer-custom-elements',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            const importPath = moduleDoc.path;

            if (!importPath.endsWith('.component.ts')) {
              return;
            }

            const tagNameWithoutPrefix = path.basename(importPath, '.component.ts');
            const tagName = 'kirby-' + tagNameWithoutPrefix;

            classDoc.tagName = tagName.replace("\'\g", '');
            classDoc.tagNameWithoutPrefix = tagNameWithoutPrefix;
            
          }
        }
      }
    },
  ]
};
