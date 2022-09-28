/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef } from '@angular/core';
import { SpyObject } from '@ngneat/spectator';

import { DataTableDirective } from './data-table.directive';

describe('DataTableDirective', () => {
  let nativeElement: SpyObject<any>;

  const createDirective = (): DataTableDirective => {
    const directive = new DataTableDirective({ nativeElement } as ElementRef);
    return directive;
  };

  it('should create an instance', () => {
    expect(createDirective).toBeTruthy();
  });
});
