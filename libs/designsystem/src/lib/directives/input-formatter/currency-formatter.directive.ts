import { Directive, HostListener, ElementRef, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `[currencyFormatter]`,
})
export class CurrencyFormatterDirective {
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  // tslint:disable-next-line: no-input-rename
  @Input('maxWholeNumberLength') MAX_WHOLE_NUMBER_LENGTH: number = 9;
  // tslint:disable-next-line: no-input-rename
  @Input('maxFractionLength') MAX_FRACTION_LENGTH: number = 2;
  // tslint:disable-next-line: no-input-rename
  @Input('localizationFormat') LOCALIZATION_FORMAT: string = 'da-DK';

  @HostListener('input', ['$event.target.value'])
  format(value: string) {
    this.el.value = this.parse(value);
  }

  parse(value: string): string {
    const cleanValue = this.getCleanValue(value);
    const values = this.getWholeAndDecimalValues(cleanValue);
    const formattedWhole =
      values[0].length > 0 ? parseFloat(values[0]).toLocaleString(this.LOCALIZATION_FORMAT) : '0';

    console.log(values);
    console.log(formattedWhole);
    console.log(this.LOCALIZATION_FORMAT);

    if (values.length === 1) {
      return formattedWhole;
    } else {
      const fraction = values[1];

      return this.isDotSeperated()
        ? `${formattedWhole}.${fraction}`
        : `${formattedWhole},${fraction}`;
    }
  }

  private getCleanValue(value: string): string {
    if (this.isDotSeperated()) {
      return value.length > 0 ? value.replace(/[^0-9\\.]/g, '') : '0';
    } else {
      return value.length > 0 ? value.replace(/[^0-9\\,]/g, '') : '0';
    }
  }

  private getWholeAndDecimalValues(value: string): string[] {
    const values: string[] = this.isDotSeperated() ? value.split('.') : value.split(',');
    const whole = values[0].slice(0, this.MAX_WHOLE_NUMBER_LENGTH);

    if (values.length > 1) {
      const fraction = values[1].slice(0, this.MAX_FRACTION_LENGTH);
      return [whole, fraction];
    }

    return [whole];
  }

  private isDotSeperated(): boolean {
    return this.LOCALIZATION_FORMAT === 'da-DK' || this.LOCALIZATION_FORMAT === 'de-DE'
      ? false
      : true;
  }
}
