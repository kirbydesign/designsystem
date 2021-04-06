import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';

import { DateMaskService } from './date-mask.service';

@Directive({
  selector: '[kirby-input][type="date"]',
})
export class DateInputDirective {
  // Add IMaskDirective
  @HostBinding('attr.imask') imaskDirective = new IMaskDirective(
    this.elementRef,
    this.renderer,
    this.iMaskFactory,
    null
  );

  // Ensure numeric keyboard
  @HostBinding('attr.inputmode') inputmode = 'numeric';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private iMaskFactory: IMaskFactory,
    private datemask: DateMaskService
  ) {
    // Remove type to avoid user-agent specific behaviour for [type="date"]
    this.elementRef.nativeElement.removeAttribute('type');

    this.imaskDirective.imask = this.datemask;
    this.imaskDirective.ngAfterViewInit();
  }
}
