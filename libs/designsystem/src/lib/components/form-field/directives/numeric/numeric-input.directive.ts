import {
  Directive,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NumericInputAnalyzer } from './numeric-input.analyzer';
import { NumericKeyRules } from './key/numeric-key.rules';

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
 * <input type="text" [value]="xyz" inputmode="decimal"  clearInput="true" kirby-numeric-input maximumNumberOfDecimals="2"
 * allowNegativeNumber="'false'" thousandSeparatorEnabled="'true'"  maxNumberOfIntegrals="'10'"></input>
 * ```
 * * ```
 * <input type="text" inputmode="decimal"  clearInput="true" kirby-numeric-input ></input>
 * ```
 *
 */

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-numeric-input]',
  providers: [DecimalPipe, CurrencyPipe],
})
export class NumericInputDirective implements OnInit, OnDestroy {
  @Input() thousandSeparatorEnabled = true;
  @Input() allowNegativeNumber = false;
  @Input() maximumNumberOfDecimals = -1;
  @Input() maxNumberOfIntegrals = 100;
  private analyzer: NumericInputAnalyzer;
  private destroy$ = new Subject();
  private lastValue = '';
  private cursorPosition = -1;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    @Self() private ngControl: NgControl,
    @Self() private hostElement: ElementRef<HTMLInputElement>
  ) {
    if (!this.hostElement.nativeElement.setSelectionRange) {
      throw new Error("'kirby-numeric-input' can only be applied to input element");
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

    // @ts-ignore
    this.ngControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value: string) => this.findCursorPosition(value)),
        map((value: string) => this.analyzer.analyse(this.cursorPosition, value, this.lastValue))
      )
      .subscribe((value: string) => {
        console.log('updating value', value);
        console.log('lastvalue value', this.lastValue);
        this.cursorPosition = this.analyzer.cursorPosition;
        this.updateCursorPosition();
        this.updateValue(value);
        this.lastValue = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private findCursorPosition(value: string): string {
    this.cursorPosition = this.hostElement.nativeElement.selectionStart;
    return value;
  }
  private updateCursorPosition(): void {
    this.hostElement.nativeElement.selectionStart = this.cursorPosition;
  }
  private updateValue(value: string): void {
    if (value === undefined || value === null) {
      return;
    }
    console.log('updateValue value', value);
    this.ngControl.control.setValue(value, {
      emitEvent: false,
      onlySelf: true,
      emitModelToViewChange: true,
    });

    if (this.cursorPosition !== undefined) {
      this.hostElement.nativeElement.setSelectionRange(this.cursorPosition, this.cursorPosition);
    }
  }
}
