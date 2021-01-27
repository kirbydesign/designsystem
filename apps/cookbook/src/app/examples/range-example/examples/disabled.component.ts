import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-disabled-example',
  template: `
      <kirby-range  disabled="true" ticks="5"  minLabel="Min" maxLabel="Max" max="5" min="1"></kirby-range>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeDisabledExampleComponent {
  template: string = config.template;
}
