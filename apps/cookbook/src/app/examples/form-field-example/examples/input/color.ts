import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

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
  styleUrl: 'color.scss',
  imports: [CardModule, ThemeColorDirective, FormFieldModule, DateInputDirective, InputComponent],
})
export class FormFieldInputColorExampleComponent {
  get template(): string {
    return config.template.split('<div class="card-option-button-group">')[0]; // Remove config part of the template
  }
  color: string = 'white';

  setThemeColor(color: string) {
    this.color = color;
  }
}
