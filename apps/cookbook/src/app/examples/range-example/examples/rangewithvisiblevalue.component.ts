import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import {
  RangeComponent,
  RangeValue,
} from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-visible-value-example',
  template: `
    <form [formGroup]="rangeFormValue">
        <div style="background-color: lightgray;width: 100%">Selected Range value: {{kirbyRangeName.value}}</div>
        <kirby-range formControlName="kirbyRangeName" [formGroup]="rangeFormValue" ticks="5" minLabel="Min value" maxLabel="Max value" pin="true" snaps="true" max="5" min="1"></kirby-range>
     </form>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeWithVisibleValueExampleComponent implements OnInit {
  template: string = config.template;

  public rangeFormValue: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormValue.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormValue = this.formBuilder.group({
      kirbyRangeName: [{ value: '1', disabled: false }],
    });
  }

  valueChanged(value: RangeValue): void {
    this.value = value;
  }
}
