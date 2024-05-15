# Composed UI Angular

## Contributing

Adding a new component in a secondary entry-point in this library. A secondary entrypoint is.. and generally we provide one entry point per component, alllowing consumers to cherry-pick and lazy load individual components, reducing overhead in the initial bundle. 

```shell
npx nx g library-secondary-entry-point --name=new-component-name --library=composed-ui-angular --skip-module
```

The skip-module flag is added here as in the following we will want to create a self-contained standalone UI component for others to consume. If a module is needed for your specific use-case, omit the flag. 

Now with the secondary entrypoint in place, a new component with the same name as the secondary entry-point can be added. 

```shell
npx nx g component --name=new-component-name --directory=libs/composed-ui/angular/new-component-name/src
```

Remember to export the component and any related utils and types needed by consumers from the entrypoints index.ts file. This ensures that it is picked up by the packaging process, and made available to consumers under `@kirbydesign/composed-ui-angular/new-component-name`. 

The generator adds a tsconfig path `tsconfig.base.json` to resolve any `@kirbydesign/composed-ui-angular` references during local development. But since we are developing a library,