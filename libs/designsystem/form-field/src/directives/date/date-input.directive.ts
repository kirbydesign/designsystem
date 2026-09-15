import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { extendValueAccessors } from '@kirbydesign/designsystem/helpers';
import Inputmask from 'inputmask';

interface InputMask {
  setValue: (val: string) => void;
}

@Directive({})
export class DateInputDirective implements AfterViewInit, OnChanges {
  @HostListener('input')
  onInput() {
    if (!this.isDateInput) return;

    if (this.enableInputMask) {
      this.updateMask(this.elementRef.nativeElement.value);
    }
  }

  @Input() prefillYear = false;
  @Input() useNativeDatePicker = false;
  @Input() dateValue: string;

  private maskingElement: HTMLElement;
  private inputmask: InputMask;

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
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
  ) {
    this.isDateInput = this.elementRef.nativeElement.type === 'date';
    if (this.isDateInput) {
      // Remove type to avoid user-agent specific behaviour for [type="date"]
      // Has to be done in constructor to avoid browser behavior kicking in
      this.elementRef.nativeElement.removeAttribute('type');

      extendValueAccessors(valueAccessors, {
        writeValue: {
          afterWriteValue: (value) => this.updateMask(value as string),
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateValue && this.isDateInput && this.maskingElement) {
      const newValue = changes.dateValue.currentValue;
      this.updateMask(newValue);
      if (newValue != null) {
        this.inputmask?.setValue(newValue);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.isDateInput) return;

    this.enableInputMask = !this.useNativeDatePicker;

    // This case is identical to date input fields _before_ native date picker
    // option was introduced
    if (this.enableInputMask) {
      this.initMask();

      // Update mask with initial value if set via [value] binding on input
      if (this.dateValue && this.inputmask) {
        this.updateMask(this.dateValue);
        this.inputmask.setValue(this.dateValue);
      }
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
    this.inputmask = this.elementRef.nativeElement.inputmask;

    // Append input overlay, so it's possible to style typed date differntly than the date-mask
    this.appendMaskingElement();
  }

  // Keeps order and seperator from speficied locale
  private getInputFormat(): string {
    const localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    return localeDateFormat
      .toLowerCase()
      .replace(/d+/, 'dd')
      .replace(/m+/, 'MM')
      .replace(/y+/, 'yyyy');
  }

  // The visual placeholder keeps the lowercase `mm` month token (e.g. mm/dd/yyyy),
  // independent of the uppercase `MM` used by the parse format above.
  private getPlaceholder(inputFormat: string): string {
    const placeholder = inputFormat.toLowerCase();
    return this.locale === 'da' ? placeholder.split('y').join('å') : placeholder;
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

  private updateMask(value: string | null | undefined): void {
    if (!this.maskingElement) return;
    if (!value) {
      this.maskingElement.innerHTML = '';
      return;
    }
    const lastNumber = value.match(/.*?(\d)[^\d]*$/); // get last number in string
    this.maskingElement.innerHTML = lastNumber
      ? value.slice(0, value.lastIndexOf(lastNumber[1]) + 1)
      : '';
  }
}
