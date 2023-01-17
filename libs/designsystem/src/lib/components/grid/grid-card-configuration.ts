import { Type } from '@angular/core';
import { ComponentConfiguration } from '@kirbydesign/designsystem/shared';

export class GridCardConfiguration implements ComponentConfiguration {
  constructor(public component: Type<any>, public data: any, public preferredSize: number) {}
}
