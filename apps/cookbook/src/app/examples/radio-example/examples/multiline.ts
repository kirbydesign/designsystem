import { Component } from '@angular/core';
import { RadioModule } from '@kirbydesign/designsystem/radio';

const config = {
  selector: 'cookbook-radio-multiline-example',
  template: `<kirby-radio
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-radio>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RadioModule],
})
export class RadioMultilineExampleComponent {
  template: string = config.template;
}
