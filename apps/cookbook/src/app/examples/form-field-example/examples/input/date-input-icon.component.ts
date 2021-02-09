import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    [selectedDate]="dateDemo"
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

  dateFormGroup: FormGroup;
  @Input() showCalendar: boolean;

  public onClick($event: any): void {
    this.showCalendar = !this.showCalendar;
  }

  public onDateChange($event: Date): void {
    this.dateFormGroup.patchValue({ dateDemo: $event.toLocaleDateString() });
    this.showCalendar = false;
  }

  public get dateDemo(): AbstractControl {
    return this.dateFormGroup.get('dateDemo');
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dateFormGroup = this.formBuilder.group({
      dateDemo: [{ value: '01/01/2021', disabled: false }],
    });
  }
}
