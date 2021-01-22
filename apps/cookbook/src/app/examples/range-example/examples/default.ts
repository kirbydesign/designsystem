import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-default-example',
  template: `
    <form [formGroup]="rangeFormDefault">
      <kirby-range formControlName="kirbyRangeName" [formGroup]="rangeFormDefault" ticks="5" startLabel="Min value" endLabel="Max value" pin="true" snaps="true" max="5" min="1"></kirby-range>
    </form>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeDefaultExampleComponent implements OnInit{
  template: string = config.template;

  public rangeFormDefault: FormGroup;
  public get kirbyRangeName(): AbstractControl {
    return this.rangeFormDefault.get('kirbyRangeName');
  }

  @Output() value: RangeValue;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.rangeFormDefault = this.formBuilder.group({
      kirbyRangeName: [{ value: '3', disabled: false }],
    });
  }
}
