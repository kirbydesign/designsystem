import { Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import type { KirbySpinnerElement } from '@kirbydesign/core/spinner';
// START_OF_AUTO_GENERATED_COMPONENT
@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class KirbySpinnerComponent {
  private _el: KirbySpinnerElement;
  private _ngZone: NgZone;

  constructor(e: ElementRef<KirbySpinnerElement>, ngZone: NgZone) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
  }
}
