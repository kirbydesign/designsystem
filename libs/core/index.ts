export * from './src';

// TODO: Consider if this is the correct approach.
// We export all types here, to be able to import all types from @kirbydesign/core in our proxies
// This way, we do not need to infer where the types come from, to figure out the correct import path
export { BadgeVariant, BadgeSize } from './badge';
