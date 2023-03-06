# Move to secondary entry

This guide will demonstrate how to move code from `designsystem/src/lib` to a secondary entry (located in `designsystem/`)

A "chunk" of sourcecode qualifies to be a secondary entry if the following criteria are met:

1. The code doesn't have any dependencies (imports) to the primary entry code.
2. It could benefit the implementer to use this code without `KirbyModule`.

## 1. Prepare a secondary entry (SE)

[ng-pakcagr](https://github.com/ng-packagr/ng-packagr) is a library which Angular uses to pack its code. When we want to make an entry visible for `ng-packagr`, we need the following:

```
├── designsystem
    ├── my-component
        ├── index.ts
        ├── ng-package.json
        ├── src
            ├── index.ts
            ├── public_api.ts
            ├── */source files
```

### 1.a `ng-package.json`

The `ng-package.json` file is the "hook" which tells `ng-packagr` that there is an entry which must be included.
The file must include an empty object `{}` and nothing else.

## 1.b Move the sourcefolder to SE

It is very important that you DO NOT move the files using drag n' drop! You must use the [`git mv`](https://git-scm.com/docs/git-mv) command; Otherwise git will think that the files was deleted in one place and created in another, which will cause all git history on those files to be lost.

```sh
git mv libs/designsystem/src/lib/components/<a-component>/* libs/designsystem/my-component/src
```

Please note;

1.  The asterisk (\*). This ensures that all the content of the folder is moved.
2.  The destinationfolder is the `src/` folder, not the SE root folder.

### 1.c `public_api.ts`

The `public_api.ts` files must export all the source files:

```Typescript
export * from './my.component';
export * from './my.module';
```

### 1.d `index.ts`

As you might have noticed, the filestructure depicted above has two `index.ts` files;

Index in the src file;

```Typescript
export * from './public_api';
```

Index in the root of the SE folder (`my-component`);

```Typescript
export * from './src/index';
```

## 3. tsconfig path

When developing the designsystem, the `@kirbydesign/designsystem` won't be able to import from the SE's, because they aren't compiled, just like the SE won't be able to import from each other.

To solve this, we'll make some [tsconfig path](https://www.typescriptlang.org/tsconfig#paths), so the packages are using the correct import definitions even before the SE are build.

In the following files:

```
// library folders
libs/designsystem/tsconfig.json
libs/designsystem/tsconfig.spec.json

// apps folders
apps/cookbook/tsconfig.json
apps/flows/tsconfig.json
```

Under `path`, add you SE:

```json
// in the library folder
{
  "compilerOptions": {
    "paths": {
        "@kirbydesign/designsystem/my-component": ["my-component/index.ts"],
    ...
    }
...
}

// in the apps folders
{
  "compilerOptions": {
    "paths": {
        "@kirbydesign/designsystem/my-component": ["libs/designsystem/my-component/index.ts"],
    ...
    }
...
}
```

## 4. Change the export

1. Remove the export from the `src/lib/*` subfolders `index.ts`.
   This could be in `libs/designsystem/src/lib/components/index.ts` (you will get an error when building because this export is pointing to the old filelocation).

```

```

2. In the `libs/designsystem/src/lib/index.ts`, add an export for the SE.

```Typescript
export * from '@kirbydesign/designsystem/my-component';
```

## 5. Test

Run `npm run test` and fix, if any, the import errors in the `*.spec.ts` files.

## 6. Build

Run the `npm run build` command. This will cause som errors in the files which imports from the recently moved component, since they won't be able to find it.

Go to the file(s) and change the import path:

```Typescript
// from
import { MyComponent } from './my-component.ts';

// to
import { MyComponent } from '@kirbydesign/designsystem/my-component';
```

Once you have changed all the imports, run the `npm run build` command again.
The library should now compile.

## 7. Verify the entry

To verify the move is successfull, do the following;

1. Run `npm run start` -> navigate to the cookbook page for the component and check that the component looks correct. Also check that there is no errors in the console.
2. Run `npm run start:flows` -> move around in the app and verify there are no errors in the console.

### 7.a Verify in seperate project

Run `npm run publish` -> install the tarball in a freshly installed angular project.

Import the component and add it to the `app-component.html`

In `app.module.ts`

```Typescript
import { MyComponent } from '@kirbydesign/designsystem/my-component';

@NgModule({
    imports: [MyModule]
}) export class AppComponent {}
```

In `app.component.html`

```html
<my-component></my-component>
```

### 7.b Verify it still works with `KirbyModule`

In `app.module.ts`, change the import to `KirbyModule`

```Typescript
@NgModule({
    imports: [KirbyModule]
}) export class AppComponent {}
```

and verify that the component still works.

### 7.c Verify with primary entry import

To prevent breaking changes, it must still be possible to import the component through the primary entry:

In `app.module.ts`

```Typescript
import { MyComponent } from '@kirbydesign/designsystem';

@NgModule({
    imports: [MyModule]
}) export class AppComponent {}
```

In `app.component.html`

```html
<my-component></my-component>
```

Now do the same, but import `kirbyModule`.
