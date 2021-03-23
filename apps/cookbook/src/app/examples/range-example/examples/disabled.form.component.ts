import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-disabled-form-example',
  template: `
    <form [formGroup]="rangeFormDisabled">
    <kirby-range  minLabel="Min value" maxLabel="Max value" formControlName="kirbyRangeName" [formGroup]="rangeFormDisabled" ticks="true" 
            pin="true" snaps="true" max="15" min="1">
     </kirby-range>
    </form>
  `,
  codeSnippet: `public rangeFormDisabled: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormDisabled.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormDisabled = this.formBuilder.group({
      kirbyRangeName: [{ value: '1', disabled: true }],
    });
  }`,
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
