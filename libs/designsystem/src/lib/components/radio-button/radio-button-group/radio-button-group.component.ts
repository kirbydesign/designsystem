import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonRadioGroup } from '@ionic/angular';
import { race, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { RadioButtonComponent } from '../radio-button.component';

@Component({
  selector: 'kirby-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioButtonGroupComponent,
      multi: true,
    },
  ],
})
export class RadioButtonGroupComponent
  implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy {
  @Input()
  value: any;

  @Input()
  set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }

  @Output()
  valueChange = new EventEmitter();

  @ViewChild(IonRadioGroup, { static: true }) ionRadioGroup: IonRadioGroup;

  @ContentChildren(RadioButtonComponent, { descendants: true }) radioButtons: QueryList<
    RadioButtonComponent
  >;

  private _onChangeCallback: Function;
  private _onTouchedCallback: Function;

  private _newRadioButtonsSlotted = new Subject();
  private _destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.radioButtons.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (this.boundToForm) {
        this.stopTrackingTouchedState();
        this.trackTouchedState();
      }
    });

    if (this.boundToForm) {
      this.trackTouchedState();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.boundToForm) {
      const { value } = changes;
      if (value) {
        setTimeout(() => (this.ionRadioGroup.value = value.currentValue));
      }
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.radioButtons.toArray().forEach((each) => (each.disabled = isDisabled));
    this.changeDetectorRef.detectChanges();
  }

  writeValue(value: any): void {
    this.ionRadioGroup.value = value;
    this.changeDetectorRef.detectChanges();
  }

  updateValue() {
    const value = this.ionRadioGroup.value;

    this.valueChange.emit(value);
    if (this.boundToForm) {
      this._onChangeCallback(value);
    }
  }

  private trackTouchedState() {
    const focusChanges = this.radioButtons.toArray().map((each) =>
      each.focusChange.pipe(
        filter((focused) => !!focused),
        take(1)
      )
    );
    race(...focusChanges)
      .pipe(takeUntil(race(this._newRadioButtonsSlotted, this._destroy$)))
      .subscribe(() => this._onTouchedCallback());
  }

  private stopTrackingTouchedState() {
    this._newRadioButtonsSlotted.next();
    this._newRadioButtonsSlotted.complete();
    this._newRadioButtonsSlotted = new Subject();
  }

  private get boundToForm() {
    return !!this._onChangeCallback;
  }
}
