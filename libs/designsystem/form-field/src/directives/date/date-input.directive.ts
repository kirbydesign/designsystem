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
    if (!this.isDateInput) return;

    if (this.enableInputMask) {
      this.updateMask(this.elementRef.nativeElement.value);
    }
  }

  @Input() prefillYear = false;
  @Input() useNativeDatePicker = false;

  private maskingElement: HTMLElement;

  /**
   * `isDateInput` is used to avoid removing the type attribute on the input element and calling updateMask()
   * when the directive is not used on a date input.
   * This is needed for the standalone component 'InputComponent', which includes the directive
   * using the `hostDirectives` component decorator prop. Angular ignores the selector of directives
   * applied in the `hostDirectives` property which effectively applies the directive to all kirby-inputs, not only date inputs.
   * This check prevents the directive from executing it's masking on non-date inputs.
   * See: https://angular.io/guide/directive-composition-api
   */
  private isDateInput = false;

  /**
   * Inputmask should be enabled exclusively when _not_ using the platform
   * native date picker.
   *
   * `enableInputMask` should be ignored if the type attribute of the `<input>`
   * element is different from 'date' and/or the platform native date picker is
   * explicitly enabled.
   *
   * @private
   * @memberof DateInputDirective
   */
  private enableInputMask = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.isDateInput = this.elementRef.nativeElement.type === 'date';
    if (this.isDateInput) {
      // Remove type to avoid user-agent specific behaviour for [type="date"]
      // Has to be done in constructor to avoid browser behavior kicking in
      this.elementRef.nativeElement.removeAttribute('type');
    }
  }

  ngAfterViewInit(): void {
    if (!this.isDateInput) return;

    this.enableInputMask = !this.useNativeDatePicker;

    // This case is identical to date input fields _before_ native date picker
    // option was introduced
    if (this.enableInputMask) {
      this.initMask();
    }

    if (this.useNativeDatePicker) {
      this.elementRef.nativeElement.setAttribute('type', 'date');
    }
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
