import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
} from '@angular/core';
import type { KirbySpinnerElement } from '@kirbydesign/core/spinner';
// START_OF_AUTO_GENERATED_COMPONENT
// AUTO-GENERATED - Any missing type imports can be added manually above, but do not change component source
@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KirbySpinnerComponent {
  private el: KirbySpinnerElement;

  constructor(
    private e: ElementRef<KirbySpinnerElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.el = this.e.nativeElement;
    this.cdr.detach();
  }
}
