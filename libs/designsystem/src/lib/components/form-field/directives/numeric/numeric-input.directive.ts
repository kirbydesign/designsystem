import { CurrencyPipe, DecimalPipe } from '@angular/common';
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
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { NumericInputAnalyzer } from './numeric-input.analyzer';

/**
 * Directive for filtering input keys matching digits + decimal and grouping separator.
 * Uses LOCALE_ID to read initial separator settings, this can be overriden by the directive user
 * Supports these features:
 * #1: Thousand (grouping) separator in integral part
 * #2: Decimal separator
 * #3: Allows for configurable number of decimals. Default is no limit. Can be set to 0 to disallow decimals
 * #4: Allows for using negative sign or blocking it
 *
 *
 * Example:
 * ```
 * <input type="text" [value]="xyz" inputmode="decimal"  clearInput="true" kirby-numeric-input maximumNumberOfDecimals="2"
 * allowNegativeNumber="'false'" thousandSeparatorEnabled="'true'"  maxNumberOfIntegrals=10></input>
 * ```
 * * ```
 * <input type="text" inputmode="decimal"  clearInput="true" kirby-numeric-input ></input>
 * ```
 *
 */

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-numeric-input]',
})
export class NumericInputDirective implements OnInit, OnDestroy {
  @Input() thousandSeparatorEnabled = true;
  @Input() allowNegativeNumber = true;
  @Input() maximumNumberOfDecimals = -1;
  @Input() maxNumberOfIntegrals = 15;
  private analyzer: NumericInputAnalyzer;
  private destroy$ = new Subject();
  private lastValue = '';
  private cursorPosition = -1;
  private lastCursorPosition = -1;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
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

    this.analyzer = new NumericInputAnalyzer(this.locale, {
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
        map((value: string) =>
          this.analyzer.analyse(this.cursorPosition, this.lastCursorPosition, value, this.lastValue)
        )
      )
      .subscribe((value: string) => {
        this.cursorPosition = this.analyzer.cursorPosition;
        this.updateCursorPosition();
        this.updateValue(value);
        this.lastValue = value;
        this.lastCursorPosition = this.cursorPosition;
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
