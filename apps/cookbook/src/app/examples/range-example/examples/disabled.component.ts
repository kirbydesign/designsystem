import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-disabled-example',
  template: `
          <kirby-range minLabel="Min label" maxLabel="Max label">
          <ion-range ticks="true" disabled="true"  pin="true" snaps="true" max="15" min="1"
          >
        </ion-range>
     </kirby-range>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeDisabledExampleComponent {
  template: string = config.template;
}
