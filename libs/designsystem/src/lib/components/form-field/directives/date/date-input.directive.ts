import { Directive, ElementRef, OnDestroy, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

import { DateInputAnalyzer } from './date-input.analyzer';
/**
 * Directive for handling input in locale specific date format.
 * Uses LOCALE_ID to read initial separator settings, this can be overriden by the directive user
 * Supports these features:
 * #1: Adds date-month-year separators
 *
 *
 * Example:
 * ```
 * <input kirby-input kirby-date-input formControlName="dateDemo" />
 * ```
 *
 */

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-date-input]',
  providers: [DateInputAnalyzer, DatePipe],
})
export class DateInputDirective implements OnInit, OnDestroy {
  constructor(
    @Self() public ngControl: NgControl,
    private analyzer: DateInputAnalyzer,
    @Self() public hostElement: ElementRef<HTMLInputElement>
  ) {
    if (!hostElement.nativeElement.setSelectionRange) {
      throw new Error("'kirby-date-input' can only be applied to input element");
    }
  }

  private destroy$ = new Subject();
  private lastValue = '';
  private cursorPosition = -1;

  ngOnInit(): any {
    // @ts-ignore
    this.ngControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value: string) => this.findCursorPosition(value)),
        map((value: string) => this.analyzer.analyse(this.cursorPosition, value, this.lastValue))
      )
      .subscribe((value: string) => {
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
