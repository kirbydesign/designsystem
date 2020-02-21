// schema for options object
export const SCHEMA = {
  type: 'object',
  properties: {
    sassFiles: {
      type: 'array',
    },
    format: {
      type: 'string',
    },
  },
};

export interface SassToJsonWebpackPluginOptions {
  format: 'ts' | 'json';
  sassFiles?: string[];
}
