import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { Subscription } from 'rxjs';

import { DateMaskService } from './date-mask.service';

@Directive({
  selector: '[kirby-input][type="date"]',
})
export class DateInputDirective implements AfterViewInit, OnDestroy {
  // Add IMaskDirective
  @HostBinding('attr.imask') imaskDirective = new IMaskDirective(
    this.elementRef,
    this.renderer,
    this.iMaskFactory,
    null
  );

  // Ensure numeric keyboard
  @HostBinding('attr.inputmode') inputmode = 'numeric';
  iMaskAcceptSubscription: Subscription;

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

  // TODO: ADD TESTS
  ngAfterViewInit() {
    const el = this.elementRef.nativeElement;
    const wrapper = this.renderer.createElement('div');
    const parent = el.parentElement;
    const placeholder = this.renderer.createElement('div');
    this.renderer.insertBefore(parent, wrapper, el);

    this.renderer.appendChild(wrapper, el);
    this.renderer.appendChild(wrapper, placeholder);

    this.renderer.addClass(wrapper, 'date-mask-wrapper');
    this.renderer.addClass(placeholder, 'date-mask');

    this.iMaskAcceptSubscription = this.imaskDirective.accept.subscribe((maskedValue) => {
      const unmaskedValue = this.imaskDirective.maskRef.unmaskedValue;
      const lastNumber = maskedValue.match(/.*?(\d)[^\d]*$/, '$1'); // get last number in string
      placeholder.innerHTML = unmaskedValue
        ? maskedValue.slice(0, maskedValue.lastIndexOf(lastNumber[1]) + 1)
        : '';
    });
  }

  ngOnDestroy() {
    this.iMaskAcceptSubscription.unsubscribe();
  }
}
