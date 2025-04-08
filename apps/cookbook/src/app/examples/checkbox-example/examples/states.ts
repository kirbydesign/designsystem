import { Component } from '@angular/core';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const config = {
  selector: 'cookbook-checkbox-states-example',
  template: `<kirby-checkbox text="Default"></kirby-checkbox>
<kirby-checkbox disabled="true" text="Disabled"></kirby-checkbox>
<kirby-checkbox [checked]="true" text="Checked"></kirby-checkbox>
<kirby-checkbox disabled="true" [checked]="true" text="Disabled checked"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Indeterminate"></kirby-checkbox>
<kirby-checkbox [indeterminate]="true" text="Disabled Indeterminate" [disabled]="true"></kirby-checkbox>
<kirby-checkbox hasError="true" text="Has error"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        max-width: 480px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 var(--kirby-spacing-s);
      }
    `,
  ],
  imports: [CheckboxComponent],
})
export class CheckboxStatesExampleComponent {
  template: string = config.template;
}
