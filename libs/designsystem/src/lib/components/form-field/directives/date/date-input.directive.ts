import {
  Directive,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgControl } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DateInputAnalyzer } from './date-input.analyzer';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-date-input]',
  providers: [DateInputAnalyzer],
})
export class DateInputDirective implements OnInit, OnDestroy {
  constructor(
    @Self() public ngControl: NgControl,
    @Inject(LOCALE_ID) private locale: string,
    private datePipe: DatePipe,
    @Self() public hostElement: ElementRef<HTMLInputElement>
  ) {
    if (!hostElement.nativeElement.setSelectionRange) {
      throw new Error("'kirby-date-input' can only be applied to input element");
    }
  }

  private analyzer: DateInputAnalyzer;
  private destroy$ = new Subject();
  private lastValue = '';
  private cursorPosition = -1;

  ngOnInit(): any {
    this.analyzer = new DateInputAnalyzer(this.locale, this.datePipe);
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
