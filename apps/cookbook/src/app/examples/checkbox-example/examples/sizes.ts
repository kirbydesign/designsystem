import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-sizes-example',
  template: `<kirby-checkbox size="xs" text="Extra small ('xs')"></kirby-checkbox>
<kirby-checkbox size="sm" text="Small ('sm' - default)"></kirby-checkbox>
<kirby-checkbox size="md" text="Medium ('md')"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      kirby-checkbox {
        margin-bottom: 8px;
      }

      kirby-checkbox ::ng-deep ion-checkbox {
        background-color: pink;
      }
    `,
  ],
})
export class CheckboxSizesExampleComponent {
  template: string = config.template;
}
