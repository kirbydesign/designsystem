import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-range-pin-example',
  template: `<kirby-range pin="true" minLabel="Min value" maxLabel="Max value" ticks="true" snaps="true" max="15" min="1"></kirby-range>`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class RangePinExampleComponent {
  template: string = config.template;
}
