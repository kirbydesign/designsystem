// schema for options object
export const SCHEMA = {
  type: 'object',
  properties: {
    watchGlob: {
      type: 'array',
    },
    transform: {
      type: 'array',
    },
  },
};

export interface SassToTsWebpackPluginOptions {
  watchGlob: string[];
  transform: string[];
}
