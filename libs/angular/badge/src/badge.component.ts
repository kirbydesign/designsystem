import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone } from '@angular/core';
import { BadgeSize, BadgeThemeColor, KirbyBadgeElement } from '@kirbydesign/core/badge';

@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: [CommonModule],
})
export class KirbyBadgeComponent {
  constructor(
    elementRef: ElementRef<KirbyBadgeElement>,
    cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.el = elementRef.nativeElement;
    cdr.detach();
  }

  private el: KirbyBadgeElement;

  get text(): string {
    return this.el.text;
  }
  /**
   * @deprecated The 'text' property has been deprecated.
   * Please set the text of the Badge between the opening and closing tag.
   */
  @Input() set text(value: string) {
    this.zone.runOutsideAngular(() => (this.el.text = value));
  }

  get size(): BadgeSize {
    return this.el.size;
  }
  @Input() set size(value: BadgeSize) {
    this.zone.runOutsideAngular(() => (this.el.size = value));
  }

  get themeColor(): BadgeThemeColor {
    return this.el.themeColor;
  }
  @Input() set themeColor(value: BadgeThemeColor) {
    this.zone.runOutsideAngular(() => (this.el.themeColor = value));
  }
}
