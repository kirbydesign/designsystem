import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-states-example',
  template: `<kirby-radio-group>
  <kirby-radio text="Default"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio value="bacon" text="Checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group>
  <kirby-radio disabled="true" text="Disabled"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio disabled="true" value="bacon" text="Disabled checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group>
  <kirby-radio hasError="true" text="Has error"></kirby-radio>
</kirby-radio-group>`,
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

      kirby-radio {
        margin-right: 16px;
      }
    `,
  ],
})
export class RadioStatesExampleComponent {
  template: string = config.template;
}
