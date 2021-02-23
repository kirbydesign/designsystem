import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

const config = {
  selector: 'cookbook-form-field-date-input-icon-example',
  template: `
  <form [formGroup]="dateFormGroup">
<kirby-form-field label="Date input with Calendar Icon">
  <input kirby-date-input kirby-input placeholder="Write Date or Select from Calendar"  formControlName="dateDemo"/>
  <kirby-input-icon icon="calendar"  (click)="onClick($event)"></kirby-input-icon>
</kirby-form-field>
  </form>

  <kirby-card *ngIf="showCalendar">
   <kirby-calendar
    [timezone]="'local'"
    [selectedDate]="calendarDateDemo"
    (dateChange)="onDateChange($event)"
  >
  </kirby-calendar>
  </kirby-card>
`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldDateInputIconExampleComponent implements OnInit {
  template: string = config.template;

  public dateFormGroup: FormGroup;
  @Input() showCalendar: boolean;

  public onClick($event: any): void {
    this.showCalendar = !this.showCalendar;
  }

  public onDateChange($event: any): void {
    this.dateFormGroup.patchValue({ dateDemo: '01/01/2021' });
    this.showCalendar = false;
  }

  public get dateDemo(): any {
    return this.dateFormGroup.get('dateDemo').value;
  }

  public get calendarDateDemo(): moment.Moment {
    return moment();
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dateFormGroup = this.formBuilder.group({
      dateDemo: [{ value: new Date().toLocaleDateString(), disabled: false }],
    });
  }
}
