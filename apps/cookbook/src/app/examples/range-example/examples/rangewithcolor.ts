import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { RangeComponent, RangeValue } from '@kirbydesign/designsystem/components/range/range.component';

const config = {
  selector: 'cookbook-range-color-example',
  template: `
    <div>
    <kirby-range ticks="5" #kirbyRangeColor startLabel="Min value" endLabel="Max value" pin="true" snaps="true" max="5" min="1"></kirby-range>
    </div>
    <div>
    <button (click)="setColor(kirbyRangeColor, 'lightgray', 'gray')">Use Gray theme</button>
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
