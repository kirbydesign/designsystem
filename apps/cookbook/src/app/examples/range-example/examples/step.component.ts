import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-step-example',
  template: `
    <form [formGroup]="rangeFormStep">
      <kirby-range minLabel="Min value" maxLabel="Max value">
        <ion-range
            formControlName="kirbyRangeName" [formGroup]="rangeFormStep" ticks="true"  
            pin="true" snaps="true" max="15" min="1" 
       >
        </ion-range>
     </kirby-range>
    </form>
  `,
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
}
