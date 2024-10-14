import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
} from '@angular/core';
import type { BadgeSize, BadgeThemeColor, KirbyBadgeElement } from '@kirbydesign/core/badge';
// START_OF_AUTO_GENERATED_COMPONENT

@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KirbyBadgeComponent {
  private _el: KirbyBadgeElement;
  private _ngZone: NgZone;

  constructor(e: ElementRef<KirbyBadgeElement>, ngZone: NgZone, cdr: ChangeDetectorRef) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    cdr.detach();
  }

  /**
   * The badge's theme variant.
   */
  @Input()
  set themeColor(v: BadgeThemeColor) {
    this._ngZone.runOutsideAngular(() => (this._el.themeColor = v));
  }

  get themeColor(): BadgeThemeColor {
    return this._el.themeColor;
  }

  /**
   * The badge's size.
   */
  @Input()
  set size(v: BadgeSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size(): BadgeSize {
    return this._el.size;
  }

  /**
   * @deprecated The 'text' property has been deprecated.
Please set the text of the Badge between the opening and closing tag.
   */
  @Input()
  set text(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.text = v));
  }

  get text(): string {
    return this._el.text;
  }
}
