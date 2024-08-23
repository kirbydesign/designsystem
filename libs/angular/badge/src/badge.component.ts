// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY. See generate-angular-proxies.ts.
import { Component, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import type { KirbyBadge as KirbyBadgeElement } from '@kirbydesign/core/badge';

@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class KirbyBadge {
  private _el: KirbyBadgeElement;
  private _ngZone: NgZone;

  constructor(e: ElementRef<KirbyBadgeElement>, ngZone: NgZone) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
  }

  /**
   * The badge's theme variant.
   */
  @Input()
  set themeColor(v: BadgeVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.themeColor = v));
  }

  get themeColor(): BadgeVariant {
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
   * @deprecated The badge's text content. This property is deprecated in favor of directly slotting text in the <kirby-badge> element.
   */
  @Input()
  set text(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.text = v));
  }

  get text(): string {
    return this._el.text;
  }
}
