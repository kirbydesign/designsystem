import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-disabled-form-example',
  template: `
    <form [formGroup]="rangeFormDisabled">
      <kirby-range formControlName="kirbyRangeName" [formGroup]="rangeFormDisabled" ticks="5" startLabel="Min value" endLabel="Max value" max="5" min="1"></kirby-range>
    </form>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeDisabledFormExampleComponent implements OnInit {
  template: string = config.template;

  public rangeFormDisabled: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormDisabled.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormDisabled = this.formBuilder.group({
      kirbyRangeName: [{ value: '1', disabled: true }],
    });
  }
}
