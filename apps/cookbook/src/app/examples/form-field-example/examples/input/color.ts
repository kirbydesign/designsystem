import { Component } from '@angular/core';
import { CardComponent, CardVariant } from '@kirbydesign/designsystem/card';
import {
  DateInputDirective,
  FormFieldComponent,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-color-example',
  template: `<kirby-card hasPadding="true" [variant]="variant">
    <kirby-form-field>
    <input kirby-input placeholder="Default input with placeholder text inside card" />
  </kirby-form-field>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setVariant('base')" class="kirby-surface-base" aria-label="Base"></button>
    <button (click)="setVariant('raised')" class="kirby-surface-raised" aria-label="Raised"></button>
    <button (click)="setVariant('brand')" class="kirby-surface-brand" aria-label="Brand"></button>
</div>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: 'color.scss',
  imports: [CardComponent, FormFieldComponent, DateInputDirective, InputComponent],
})
export class FormFieldInputColorExampleComponent {
  get template(): string {
    return config.template.split('<div class="card-option-button-group">')[0]; // Remove config part of the template
  }
  variant: CardVariant = 'raised';

  setVariant(variant: CardVariant) {
    this.variant = variant;
  }
}
