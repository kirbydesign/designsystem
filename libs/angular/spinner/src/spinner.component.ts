import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { KirbySpinnerElement } from '@kirbydesign/core/spinner';

@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: [CommonModule],
})
export class KirbySpinnerComponent {
  constructor(elementRef: ElementRef<KirbySpinnerElement>, cdr: ChangeDetectorRef) {
    this.el = elementRef.nativeElement;
    cdr.detach();
  }

  private el: KirbySpinnerElement;
}
