import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
} from '@angular/core';
import type { KirbyDividerElement } from '@kirbydesign/core/divider';
// START_OF_AUTO_GENERATED_COMPONENT
// AUTO-GENERATED - Any missing type imports can be added manually above, but do not change component source
@Component({
  selector: 'kirby-divider',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KirbyDividerComponent {
  private el: KirbyDividerElement;

  constructor(
    private e: ElementRef<KirbyDividerElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.el = this.e.nativeElement;
    this.cdr.detach();
  }

  @Input()
  set hasMargin(v: boolean) {
    this.ngZone.runOutsideAngular(() => (this.el.hasMargin = v));
  }

  get hasMargin(): boolean {
    return this.el.hasMargin;
  }
}

export { KirbyDividerComponent as DividerComponent };
