import { Component } from '@angular/core';
import { RangeComponent } from '@kirbydesign/designsystem/range';

const config = {
  selector: 'cookbook-range-default-example',
  template: `<kirby-range minLabel="Min label" maxLabel="Max label" max="100" min="1" value="25"></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RangeComponent],
})
export class RangeDefaultExampleComponent {
  template: string = config.template;
}
