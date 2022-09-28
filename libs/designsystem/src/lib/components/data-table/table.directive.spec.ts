/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef } from '@angular/core';
import { SpyObject } from '@ngneat/spectator';

import { TableDirective } from './table.directive';

describe('TableDirective', () => {
  let nativeElement: SpyObject<any>;

  const createDirective = (): TableDirective => {
    const directive = new TableDirective({ nativeElement } as ElementRef);
    return directive;
  };

  it('should create an instance', () => {
    expect(createDirective).toBeTruthy();
  });
});
