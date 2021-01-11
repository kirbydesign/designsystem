import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-sizes-example',
  template: `<kirby-radio-group>
  <kirby-radio size="xs" text="Extra Small"></kirby-radio>
  <kirby-radio size="sm" text="Small"></kirby-radio>
  <kirby-radio size="md" text="Medium (default)"></kirby-radio>
<kirby-radio-group>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./sizes.scss'],
})
export class RadioSizesExampleComponent {
  template: string = config.template;
}
