export * from './animation/kirby-animation';
export * from './components';
export * from './directives';
export * from './helpers';
export * from './scss/scss-helper';
// export * from './testing';

// Export BadgeComponent here instead of in ./components as we will otherwise
// have an UMD compilation error when compiling the Kirby bundle in other
// Angular projects. See https://github.com/kirbydesign/designsystem/issues/1740.
export { KirbyBadge as BadgeComponent } from './components/web-component-proxies.component';

export { KirbyModule } from './kirby.module';
