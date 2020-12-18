import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-states-example',
  template: `<kirby-checkbox text="Default"></kirby-checkbox>
<kirby-checkbox [checked]="true" text="Checked"></kirby-checkbox>
<kirby-checkbox disabled="true" text="Disabled"></kirby-checkbox>
<kirby-checkbox disabled="true" [checked]="true" text="Disabled checked"></kirby-checkbox>
<kirby-checkbox hasError="true" text="Has error"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class CheckboxStatesExampleComponent {
  template: string = config.template;
}
