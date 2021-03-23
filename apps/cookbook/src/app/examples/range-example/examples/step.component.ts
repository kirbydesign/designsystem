import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-step-example',
  template: `
    <form [formGroup]="rangeFormStep">
    <div style="background-color: lightgray;width: 100%">Selected Range value: {{kirbyRangeName.value}}</div>
      <kirby-range minLabel="Min value" maxLabel="Max value" formControlName="kirbyRangeName" [formGroup]="rangeFormStep" ticks="true"  
            pin="true" snaps="true" max="15" min="1" >
     </kirby-range>
    </form>
  `,
  codeSnippet: `public rangeFormStep: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormStep.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormStep = this.formBuilder.group({
      kirbyRangeName: [{ value: '10', disabled: false }],
    });
  }
  valueChanged(value: RangeValue): void {
    this.value = value;
  }`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeStepExampleComponent implements OnInit {
  template: string = config.template;

  public rangeFormStep: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormStep.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormStep = this.formBuilder.group({
      kirbyRangeName: [{ value: '10', disabled: false }],
    });
  }
  valueChanged(value: RangeValue): void {
    this.value = value;
  }
}
