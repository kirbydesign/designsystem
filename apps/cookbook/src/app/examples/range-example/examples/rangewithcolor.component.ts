import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import {
  RangeComponent,
  RangeValue,
} from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-color-example',
  template: `
    <div>
    <kirby-range ticks="5" #kirbyRangeColor minLabel="Min value" maxLabel="Max value" pin="true" snaps="true" max="5" min="1"></kirby-range>
    </div>
    <div>
    <p><br>
    <button (click)="setColor(kirbyRangeColor, 'lightgray', 'gray')">Switch to Gray theme</button>
    </p>
   </div>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeWithColorExampleComponent {
  template: string = config.template;

  public setColor(kirbyRange: RangeComponent, color: string, backgroundColor: string): void {
    kirbyRange.setKnobBackground(backgroundColor);

    kirbyRange.setPin(color);
    kirbyRange.setPinFontSize(color);
    kirbyRange.setPinBackground(backgroundColor);

    kirbyRange.setBarBackground(backgroundColor);
    kirbyRange.setActiveBar(color);
    kirbyRange.setBar(color);

    kirbyRange.setActiveTick(color);
    kirbyRange.setTick(color);

    kirbyRange.setLabelBackground(backgroundColor);
    kirbyRange.setLabel(color);
  }
}
