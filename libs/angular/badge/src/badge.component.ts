import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
} from '@angular/core';
import type { BadgeSize, BadgeThemeColor, KirbyBadgeElement } from '@kirbydesign/core/badge';
// START_OF_AUTO_GENERATED_COMPONENT
// AUTO-GENERATED - Any missing type imports can be added manually above, but do not change component source
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KirbyBadgeComponent {
  private el: KirbyBadgeElement;

  constructor(
    private e: ElementRef<KirbyBadgeElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.el = this.e.nativeElement;
    this.cdr.detach();
  }

  /**
   * The badge's theme variant.
   */
  @Input()
  set themeColor(v: BadgeThemeColor) {
    this.ngZone.runOutsideAngular(() => (this.el.themeColor = v));
  }

  get themeColor(): BadgeThemeColor {
    return this.el.themeColor;
  }

  /**
   * The badge's size.
   */
  @Input()
  set size(v: BadgeSize) {
    this.ngZone.runOutsideAngular(() => (this.el.size = v));
  }

  get size(): BadgeSize {
    return this.el.size;
  }

  /**
   * @deprecated The 'text' property has been deprecated.
Please set the text of the Badge between the opening and closing tag.
   */
  @Input()
  set text(v: string) {
    this.ngZone.runOutsideAngular(() => (this.el.text = v));
  }

  get text(): string {
    return this.el.text;
  }
}
