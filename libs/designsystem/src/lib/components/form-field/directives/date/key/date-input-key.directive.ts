import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
  Self,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { DateKeyRules } from './date-key.rules';
import { DateInputAnalyzer } from '../date-input.analyzer';
import { DateFormatter } from '../date.formatter';

/**
 * Directive for filtering input keys matching dd.mm.yyyy  yyyy.dd.mm dd.mm.yyyy
 * Uses LOCALE_ID to read initial separator settings, this can be overriden by the directive user
 * Supports these features:
 * #1:
 *
 *
 * Example:
 * ```
 * ```
 */

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kirby-key-date-input]',
})
export class DateInputKeyDirective implements OnInit {
  private analyzer: DateInputAnalyzer;
  private keyRules: DateKeyRules;
  private lastValue = '';
  private cursorPosition = -1;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private datePipe: DatePipe,
    private dateFormatter: DateFormatter,
    @Self() private hostElement: ElementRef<HTMLInputElement>
  ) {
    if (!this.hostElement.nativeElement.setSelectionRange) {
      throw new Error("'kirby-key-date-input' can only be applied to input element");
    }
  }

  ngOnInit(): any {
    this.analyzer = new DateInputAnalyzer(this.locale, this.datePipe);
    this.keyRules = new DateKeyRules(this.locale);
  }

  @HostListener('keyup', ['$event'])
  keyup($event: KeyboardEvent): void {
    const value: string = this.hostElement.nativeElement.value;
    if (this.keyRules.isMetaKeyAllowed($event.key)) {
      if (value !== this.lastValue) {
        this.analyzeValue();
      }
      return;
    }

    const isValid = this.keyRules.isKeyValid($event.key);
    if (!isValid) {
      $event.preventDefault();
      this.updateValue(this.lastValue);
      return;
    }
    this.analyzeValue();
  }

  @HostListener('focusout', ['$event'])
  blur($event: any): void {
    this.analyzeValue();
  }

  @HostListener('keydown', ['$event'])
  keydown($event: KeyboardEvent): void {
    let value: string = this.hostElement.nativeElement.value;
    this.lastValue = value;
    if (this.keyRules.isMetaKeyAllowed($event.key)) {
      return;
    }
    this.findCursorPosition();
    const isValid = this.keyRules.isKeyValid($event.key);
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

  private analyzeValue(): void {
    const value: string = this.hostElement.nativeElement.value;
    this.findCursorPosition();
    const result = this.analyzer.analyse(this.cursorPosition, value, this.lastValue);
    if (result !== value) {
      this.cursorPosition = this.analyzer.cursorPosition;
      this.updateValue(result);
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
      const v = value.substring(0, keyDownPosition) + key + value.substring(keyDownPosition);
      return v;
    }
    return value;
  }

  private findCursorPosition(): void {
    this.cursorPosition = this.hostElement.nativeElement.selectionStart;
  }

  private updateCursorPosition(): void {
    this.hostElement.nativeElement.setSelectionRange(this.cursorPosition, this.cursorPosition);
  }

  private updateValue(value: string): void {
    if (value === undefined || value === null) {
      return;
    }
    this.hostElement.nativeElement.value = value;
    this.lastValue = value;
    if (this.cursorPosition !== undefined) {
      this.updateCursorPosition();
    }
  }
}
