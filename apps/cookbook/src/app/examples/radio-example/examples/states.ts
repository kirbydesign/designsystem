import { Component } from '@angular/core';
import { RadioModule } from '@kirbydesign/designsystem/radio';

const config = {
  selector: 'cookbook-radio-states-example',
  template: `<kirby-radio-group aria-label="Radio state example">
  <kirby-radio text="Default"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio value="bacon" text="Checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group>
  <kirby-radio [disabled]="true" text="Disabled"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group value="bacon">
  <kirby-radio disabled="true" value="bacon" text="Disabled checked"></kirby-radio>
</kirby-radio-group>

<kirby-radio-group [hasError]="true">
  <kirby-radio text="Has error"></kirby-radio>
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
  imports: [RadioModule],
})
export class RadioStatesExampleComponent {
  template: string = config.template;
}
