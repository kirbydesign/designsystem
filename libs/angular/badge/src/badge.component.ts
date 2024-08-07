import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone } from '@angular/core';
import { BadgeSize, BadgeVariant, KirbyBadge } from '@kirbydesign/core/badge';
import '@kirbydesign/core/kirby-badge'; // TODO: Is this how we want to import the web comp registration??

@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: [CommonModule],
})
export class BadgeComponent {
  constructor(elementRef: ElementRef<KirbyBadge>, cdr: ChangeDetectorRef, private zone: NgZone) {
    this.el = elementRef.nativeElement;
    cdr.detach();
  }

  private el: KirbyBadge;

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
