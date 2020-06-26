import { Directive, HostListener, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `[currencyFormatter]`,
})
export class CurrencyFormatterDirective implements OnInit {
  private el: any;
  private THOUSAND_SEPERATOR: string = '.';
  private DECIMAL_SEPERATOR: string = ',';
  private LOCALIZATION_CODE: string = 'da-DK';
  private LOCALIZATION_MAP: Map<string, LocalizationModel>;

  // tslint:disable-next-line: no-input-rename
  @Input('maxWholeNumberLength') MAX_WHOLE_NUMBER_LENGTH: number = 9;
  // tslint:disable-next-line: no-input-rename
  @Input('maxFractionLength') MAX_FRACTION_LENGTH: number = 2;
  @Input('currencyFormatter') LOCALIZATION_FORMAT: string = 'da';

  @HostListener('input', ['$event.target.value'])
  format(value: string) {
    const currentCaretPosition = this.el.selectionStart;
    const formattedValue = this.parse(value);
    const newCaretPosition = this.getCaretPositionAfterFormatting(
      formattedValue.length,
      value.length,
      currentCaretPosition
    );

    this.el.value = formattedValue;
    this.el.setSelectionRange(newCaretPosition, newCaretPosition);
  }

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }
  ngOnInit(): void {
    // TODO this should probably come from somewhere else
    this.initLocalizationMap();
    this.THOUSAND_SEPERATOR = this.LOCALIZATION_MAP.get(this.LOCALIZATION_FORMAT).thousandSeperator;
    this.DECIMAL_SEPERATOR = this.LOCALIZATION_MAP.get(this.LOCALIZATION_FORMAT).decimalSeperator;
    this.LOCALIZATION_CODE = this.LOCALIZATION_MAP.get(this.LOCALIZATION_FORMAT).code;
  }

  private parse(value: string): string {
    const cleanValue = this.getCleanValue(value);
    const values = this.getWholeAndDecimalValues(cleanValue);
    const formattedWhole =
      values[0].length > 0 ? parseFloat(values[0]).toLocaleString(this.LOCALIZATION_CODE) : '0';

    if (values.length === 1) {
      return formattedWhole;
    } else {
      const fraction = values[1];
      return `${formattedWhole + this.DECIMAL_SEPERATOR + fraction}`;
    }
  }

  private getCleanValue(value: string): string {
    const regex = new RegExp(`[^0-9\\${this.DECIMAL_SEPERATOR}]`, 'g');
    return value.length > 0 ? value.replace(regex, '') : '0';
  }

  private getWholeAndDecimalValues(value: string): string[] {
    const values: string[] = value.split(this.DECIMAL_SEPERATOR);
    const whole = values[0].slice(0, this.MAX_WHOLE_NUMBER_LENGTH);

    if (values.length > 1) {
      const fraction = values[1].slice(0, this.MAX_FRACTION_LENGTH);
      return [whole, fraction];
    }

    return [whole];
  }

  private getCaretPositionAfterFormatting(
    lengthAfterFormatting: number,
    lengthBeforeFormatting: number,
    cursorPosition: number
  ): number {
    if (lengthBeforeFormatting === lengthAfterFormatting + 1) {
      cursorPosition = cursorPosition - 1;
    }
    if (lengthBeforeFormatting === lengthAfterFormatting - 1) {
      cursorPosition = cursorPosition + 1;
    }

    return cursorPosition < 0 ? 0 : cursorPosition;
  }

  private initLocalizationMap(): void {
    this.LOCALIZATION_MAP = new Map();
    this.LOCALIZATION_MAP.set('en', {
      code: 'en-GB',
      thousandSeperator: ',',
      decimalSeperator: '.',
      currency: 'GBP',
    });
    this.LOCALIZATION_MAP.set('da', {
      code: 'da-DK',
      thousandSeperator: '.',
      decimalSeperator: ',',
      currency: 'DKK',
    });
    this.LOCALIZATION_MAP.set('de', {
      code: 'de-DE',
      thousandSeperator: '.',
      decimalSeperator: ',',
      currency: 'EUR',
    });
  }
}

export interface LocalizationModel {
  code: string;
  thousandSeperator: string;
  decimalSeperator: string;
  currency: string;
}

// if (value.charAt(currentCaretPosition - 1) === this.THOUSAND_SEPERATOR) {
//   this.el.setSelectionRange(currentCaretPosition - 1, currentCaretPosition - 1);
// }
