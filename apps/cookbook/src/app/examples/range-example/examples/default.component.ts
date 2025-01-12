import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-range-default-example',
  template: `<kirby-range minLabel="Min label" maxLabel="Max label" max="100" min="1" value="25"></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class RangeDefaultExampleComponent {
  template: string = config.template;
}
