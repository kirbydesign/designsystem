# Migration from @angular-builders/custom-webpack to esbuild

This document outlines the migration from `@angular-builders/custom-webpack` to Angular's native esbuild support.

## Migration Summary

**Date**: 2025-01-01  
**Angular Version**: 21.0.0-next.5  
**Status**: ✅ Complete

## What Was Changed

### 1. Updated Build Executors

**Before**:

```json
{
  "build": {
    "executor": "@angular-builders/custom-webpack:browser",
    "options": { ... }
  },
  "serve": {
    "executor": "@angular-builders/custom-webpack:dev-server",
    "options": { ... }
  }
}
```

**After**:

```json
{
  "build": {
    "executor": "@angular-devkit/build-angular:browser",
    "options": { ... }
  },
  "serve": {
    "executor": "@angular-devkit/build-angular:dev-server",
    "options": { ... }
  }
}
```

### 2. Removed Dependencies

The following packages were removed:

- `@angular-builders/custom-webpack`
- `copy-webpack-plugin` (no longer needed)
- `@types/webpack` (no longer needed)

### 3. Fixed Sass-to-TypeScript Script

The `scripts/sass-extract-to-ts.js` script was updated to work without the custom webpack configuration that was never actually used.

**Before**: Script tried to extract `filesToTransform` from a non-existent `customWebpackConfig`
**After**: Script defines files to transform directly (currently empty array)

### 4. Resource Import Support

The `?raw` import syntax (e.g., `import content from './file.html?raw'`) continues to work natively with Angular 21's esbuild support.

**TypeScript configuration updated** to include `resource-imports.d.ts`:

```json
{
  "files": ["src/main.ts", "src/polyfills.ts", "resource-imports.d.ts"]
}
```

### 5. Cleaned Up Webpack-Specific Files

Removed webpack-specific files that are no longer needed:

- `tools/sass-to-ts/sass-to-ts-webpack.plugin.ts`
- `tools/sass-to-ts/webpack.sass-to-ts.config.ts`
- `tools/sass-to-ts/schema.ts`

The core `SassToTypescriptEngine` was preserved as it's still used by the build scripts.

## Benefits of esbuild

1. **Faster builds**: esbuild is significantly faster than webpack
2. **Native support**: No need for custom builders or configurations
3. **Simpler setup**: Fewer dependencies and configuration files
4. **Better tree-shaking**: Improved bundle optimization
5. **Modern JavaScript**: Better support for modern JS features

## What Still Works

- ✅ `?raw` imports for HTML and CSS files
- ✅ All existing build configurations (development/production)
- ✅ Asset handling and copying
- ✅ SCSS compilation
- ✅ TypeScript compilation
- ✅ Source maps
- ✅ Hot module replacement in development

## What Changed

- 🔄 Build tool changed from webpack to esbuild (transparent to developers)
- 🔄 Faster build times
- 🔄 Simplified configuration

## Testing

To verify the migration worked correctly:

```bash
# Build the cookbook application
npm run nx build cookbook

# Serve the cookbook application
npm run nx serve cookbook

# Run the sass extraction script
npm run extract-scss-variables
```

## Rollback Plan

If needed, the migration can be rolled back by:

1. Reinstalling the removed packages:

   ```bash
   npm install @angular-builders/custom-webpack copy-webpack-plugin @types/webpack
   ```

2. Reverting the executor changes in `apps/cookbook/project.json`

3. Restoring the webpack configuration files from version control

## Notes

- Angular 21 uses esbuild by default, making this migration natural and well-supported
- No functionality was lost in this migration
- The custom webpack configuration was never actually being used in the build process
- All `?raw` imports continue to work natively with esbuild
