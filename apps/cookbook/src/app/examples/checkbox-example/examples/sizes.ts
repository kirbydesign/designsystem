import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-sizes-example',
  template: `<kirby-checkbox size="xs" text="Extra Small"></kirby-checkbox>
<kirby-divider [hasMargin]="true"></kirby-divider>
<kirby-checkbox size="sm" text="Small"></kirby-checkbox>
<kirby-checkbox size="md" text="Medium (default)"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../checkbox-radio-sizes-example.scss'],
})
export class CheckboxSizesExampleComponent {
  template: string = config.template;
}
