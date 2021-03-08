import { defineCustomElements } from '@kirbydesign/core/loader';

export const appInitialize = (doc: Document) => {
  return () => {
    defineCustomElements(doc.defaultView);
  };
};
