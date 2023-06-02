import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  Renderer2,
} from '@angular/core';
import 'inputmask/lib/extensions/inputmask.date.extensions';
import Inputmask from 'inputmask/lib/inputmask';

@Directive({
  standalone: true,
  selector: '[kirby-input][type="date"]',
})
export class DateInputDirective implements AfterViewInit {
  @HostListener('input')
  onInput() {
    this.updateMask(this.elementRef.nativeElement.value);
  }

  @Input() prefillYear = false;

  private maskingElement: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(LOCALE_ID) private locale: string
  ) {
    // Remove type to avoid user-agent specific behaviour for [type="date"]
    this.elementRef.nativeElement.removeAttribute('type');
  }

  ngAfterViewInit(): void {
    this.initMask();
  }

  private initMask(): void {
    const inputFormat = this.getInputFormat();
    const placeholder = this.getPlaceholder(inputFormat);

    // Set initial placeholder ex. dd/mm/yyyy
    this.renderer.setAttribute(this.elementRef.nativeElement, 'placeholder', placeholder);

    // Init InputMask
    new Inputmask('datetime', {
      inputFormat,
      placeholder,
      prefillYear: this.prefillYear,
    }).mask(this.elementRef.nativeElement);

    // Append input overlay, so it's possible to style typed date differntly than the date-mask
    this.appendMaskingElement();
  }

  // Keeps order and seperator from speficied locale
  private getInputFormat(): string {
    const localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    return localeDateFormat
      .toLowerCase()
      .replace(/d+/, 'dd')
      .replace(/m+/, 'mm')
      .replace(/y+/, 'yyyy');
  }

  private getPlaceholder(inputFormat: string): string {
    return this.locale === 'da' ? inputFormat.split('y').join('å') : inputFormat;
  }

  private appendMaskingElement(): void {
    const wrapper = this.wrapElement(this.elementRef.nativeElement);
    this.renderer.addClass(wrapper, 'date-mask-wrapper');

    this.maskingElement = this.renderer.createElement('div');
    this.renderer.appendChild(wrapper, this.maskingElement);

    this.renderer.addClass(this.maskingElement, 'date-mask');
  }

  private wrapElement(element: HTMLElement): HTMLElement {
    const wrapper = this.renderer.createElement('div');
    const parent = element.parentElement;
    this.renderer.insertBefore(parent, wrapper, element);
    this.renderer.appendChild(wrapper, element);
    return wrapper;
  }

  private updateMask(value: string): void {
    if (!this.maskingElement) return;
    const lastNumber = value.match(/.*?(\d)[^\d]*$/); // get last number in string
    this.maskingElement.innerHTML = value
      ? value.slice(0, value.lastIndexOf(lastNumber[1]) + 1)
      : '';
  }
}
