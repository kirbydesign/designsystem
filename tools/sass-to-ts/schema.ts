// schema for options object
export const SCHEMA = {
  type: 'object' as const,
  properties: {
    watchGlob: {
      type: 'array' as const,
    },
    transform: {
      type: 'array' as const,
    },
  },
};

export interface SassToTsWebpackPluginOptions {
  watchGlob: string[];
  transform: string[];
}
