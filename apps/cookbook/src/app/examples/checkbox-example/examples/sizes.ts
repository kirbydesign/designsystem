import { Component } from '@angular/core';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { DividerComponent } from '@kirbydesign/designsystem/divider';

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
  imports: [CheckboxComponent, DividerComponent],
})
export class CheckboxSizesExampleComponent {
  template: string = config.template;
}
