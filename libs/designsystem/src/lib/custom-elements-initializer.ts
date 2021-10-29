import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';

import { defineCustomElements } from '@kirbydesign/core/loader';

const appInitialize = (doc: Document) => {
  return () => {
    defineCustomElements(doc.defaultView);
  };
};

export function customElementsInitializer() {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitialize,
    deps: [DOCUMENT],
    multi: true,
  };
}
