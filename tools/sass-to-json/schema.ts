// schema for options object
export const SCHEMA = {
  type: 'object',
  properties: {
    sassFiles: {
      type: 'array',
    },
  },
};

export interface SassToJsonWebpackPluginOptions {
  sassFiles?: string[];
}
