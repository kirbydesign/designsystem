/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@kirbydesign/core';




export declare interface KirbyBadge extends Components.KirbyBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['size', 'text', 'themeColor']
})
@Component({
  selector: 'kirby-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['size', 'text', 'themeColor']
})
export class KirbyBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
