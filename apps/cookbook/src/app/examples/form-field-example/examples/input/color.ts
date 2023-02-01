import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-color-example',
  template: `<kirby-card hasPadding="true" [themeColor]="color">
    <kirby-form-field>
    <input kirby-input placeholder="Default input with placeholder text inside card" />
  </kirby-form-field>
</kirby-card>

<div class="card-option-button-group">
    <button (click)="setThemeColor('white')" class="white"></button>
    <button (click)="setThemeColor('light')" class="light"></button>
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../form-field-example.component.scss'],
})
export class FormFieldInputColorExampleComponent {
  template: string = config.template;
  color: string = 'white';

  setThemeColor(color: string) {
    this.color = color;
  }
}
