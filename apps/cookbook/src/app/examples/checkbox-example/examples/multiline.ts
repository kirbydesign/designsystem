import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-multiline-example',
  template: `<kirby-checkbox
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,&#10; sed do eiusmod tempor incididunt ut labore et dolore &#10; magna aliqua.">
</kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class CheckboxMultilineExampleComponent {
  template: string = config.template;
}
