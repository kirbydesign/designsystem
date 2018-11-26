import { Type } from '@angular/core';

export class GridCardConfiguration {
  constructor(public component: Type<any>, public preferredSize: number) {
  }
}
