import { Component } from '@angular/core';
import { RadioModule } from '@kirbydesign/designsystem/radio';

const config = {
  selector: 'cookbook-radio-sizes-example',
  template: `<kirby-radio-group aria-label="Radio size example">
  <kirby-radio size="xs" text="Extra Small"></kirby-radio>
  <kirby-radio size="sm" text="Small"></kirby-radio>
  <kirby-radio size="md" text="Medium (default)"></kirby-radio>
<kirby-radio-group>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../checkbox-radio-sizes-example.scss'],
  imports: [RadioModule],
})
export class RadioSizesExampleComponent {
  template: string = config.template;
}
