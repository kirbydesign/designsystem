import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-sizes-example',
  template: `<kirby-checkbox size="xs" text="xs"></kirby-checkbox>
<kirby-checkbox size="sm" text="sm (default)"></kirby-checkbox>
<kirby-checkbox size="md" text="md"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

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
