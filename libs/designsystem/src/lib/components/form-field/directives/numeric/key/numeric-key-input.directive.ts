import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Self,
} from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';


import { NumericInputAnalyzer } from '../numeric-input.analyzer';
import { NumericKeyRules } from './numeric-key.rules';

/**
 * Directive for filtering input keys matching digits + decimal and grouping separator.
 * Uses LOCALE_ID to read initial separator settings, this can be overriden by the directive user
 * Supports these features:
 * #1: Allows for configurable thousand (grouping) separator
 * #2: Allows for configurable decimal separator
 * #3: Allows for configurable number of decimals. Default is no limit. Can be set to 0 to prevent decimals
 * #4: Allows for using negative sign or blocking it
 *
 *
 * Example:
 * ```
 * <input type="text" [value]="xyz" inputmode="decimal"  clearInput="true" kirby-key-numeric-input maximumNumberOfDecimals="2"
 * allowNegativeNumber="'false'" thousandSeparatorEnabled="'true'"  maxNumberOfIntegrals="'10'"></input>
 * ```
 * * ```
 * <input type="text" inputmode="decimal"  clearInput="true" kirby-key-numeric-input ></input>
 * ```
 *
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-key-numeric-input]',
  providers: [DecimalPipe, CurrencyPipe],
})
export class NumericKeyInputDirective implements OnInit {
  @Input() thousandSeparatorEnabled = true;
  @Input() allowNegativeNumber = true;
  @Input() maximumNumberOfDecimals = -1;
  @Input() maxNumberOfIntegrals = 15;
  private analyzer: NumericInputAnalyzer;
  private lastValue = '';
  private cursorPosition = -1;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private keyRules: NumericKeyRules,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    @Self() private hostElement: ElementRef<HTMLInputElement>
  ) {
    if (!this.hostElement.nativeElement.setSelectionRange) {
      throw new Error("'kirby-key-numeric-input' can only be applied to input element");
    }
  }

  ngOnInit(): any {
    this.thousandSeparatorEnabled = this.thousandSeparatorEnabled.toString() === 'true';
    this.allowNegativeNumber = this.allowNegativeNumber.toString() === 'true';
    this.maxNumberOfIntegrals = parseInt(this.maxNumberOfIntegrals.toString(), 10);
    this.maximumNumberOfDecimals = parseInt(this.maximumNumberOfDecimals.toString(), 10);

    this.analyzer = new NumericInputAnalyzer(this.locale, this.decimalPipe, this.currencyPipe, {
      maxNumberOfIntegrals: this.maxNumberOfIntegrals,
      thousandSeparatorEnabled: this.thousandSeparatorEnabled,
      allowNegativeNumber: this.allowNegativeNumber,
      maximumNumberOfDecimals: this.maximumNumberOfDecimals,
    });
  }

  @HostListener('focusout', ['$event'])
  blur($event: any): void {
    this.analyzeValue(this.hostElement.nativeElement);
  }

  @HostListener('keyup', ['$event'])
  keyup($event: KeyboardEvent): void {
    this.handleKeyup($event);
  }

  @HostListener('keydown', ['$event'])
  keydown($event: KeyboardEvent): void {
    this.handleKeydown($event);
  }

  public handleKeyup($event: KeyboardEvent): void {
    const input = $event.target as HTMLInputElement;
    const value: string = input.value;
    if (this.keyRules.isMetaKeyAllowed($event.key)) {
      if (value !== this.lastValue) {
        this.analyzeValue(input);
      }
      return;
    }
    const isValid = this.keyRules.isKeyValid(
      this.allowNegativeNumber,
      this.maximumNumberOfDecimals,
      this.cursorPosition,
      $event.key
    );
    if (!isValid) {
      $event.preventDefault();
      this.updateValue(input, this.lastValue);
      return;
    }
    this.analyzeValue(input);
  }

  public handleKeydown($event: KeyboardEvent): void {
    const input = $event.target as HTMLInputElement;
    let value: string = input.value; // this.hostElement.nativeElement.value;
    this.lastValue = value;
    if (this.keyRules.isMetaKeyAllowed($event.key)) {
      return;
    }
    this.findCursorPosition(input);
    const isValid = this.keyRules.isKeyValid(
      this.allowNegativeNumber,
      this.maximumNumberOfDecimals,
      this.cursorPosition,
      $event.key
    );
    if (!isValid) {
      $event.preventDefault();
      return;
    }
    value = this.insertKey(value, $event.key, this.cursorPosition);
    this.analyzer.analyse(this.cursorPosition, value, this.lastValue);
    if (this.analyzer.invalid) {
      $event.preventDefault();
    }
  }

  private analyzeValue(input: HTMLInputElement): void {
    const value: string = input.value;
    this.findCursorPosition(input);
   const result = this.analyzer.analyse(this.cursorPosition, value, this.lastValue);
    if (result !== value) {
      this.cursorPosition = this.analyzer.cursorPosition;
      this.updateValue(input, result);
    }
  }

  private insertKey(value: string, key: string, keyDownPosition: number): string {
    if (value.length === 0) {
      return value + key;
    }
    if (keyDownPosition >= value.length) {
      return value + key;
    }
    if (keyDownPosition >= 0 && keyDownPosition < value.length) {
      return value.substring(0, keyDownPosition) + key + value.substring(keyDownPosition);
    }
    return value;
  }

  private findCursorPosition(input: HTMLInputElement): void {
    this.cursorPosition = input.selectionStart;
  }

  private updateCursorPosition(input: HTMLInputElement): void {
    input.setSelectionRange(this.cursorPosition, this.cursorPosition);
  }

  private updateValue(input: HTMLInputElement, value: string): void {
    if (value === undefined || value === null) {
      return;
    }
    input.value = value;
    this.lastValue = value;
    if (this.cursorPosition !== undefined) {
      this.updateCursorPosition(input);
    }
  }
}
