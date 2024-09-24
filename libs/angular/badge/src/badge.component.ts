import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone } from '@angular/core';
import { BadgeSize, BadgeVariant, KirbyBadgeElement } from '@kirbydesign/core/badge';

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

  //TODO: Should we deprecate `text` prop?
  get text(): string {
    return this.el.innerText;
  }
  @Input() set text(value: string) {
    this.zone.runOutsideAngular(() => (this.el.innerText = value));
  }

  get size(): BadgeSize {
    return this.el.size;
  }
  @Input() set size(value: BadgeSize) {
    this.zone.runOutsideAngular(() => (this.el.size = value));
  }

  get themeColor(): BadgeVariant {
    return this.el.themeColor;
  }
  @Input() set themeColor(value: BadgeVariant) {
    this.zone.runOutsideAngular(() => (this.el.themeColor = value));
  }
}
