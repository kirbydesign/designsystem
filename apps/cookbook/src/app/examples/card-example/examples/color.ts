import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

const config = {
  selector: 'cookbook-card-example-color',
  codeSnippet: `<kirby-card hasPadding="true" [themeColor]="color">
  <strong>A themed card</strong>
  <p>This cards color is defined by the <code>themeColor</code> input property.</p>
  <p>Recommended values for themeColor are: <br> <code>'secondary' | 'tertiary' | 'medium' | 'dark'</code></p>
  <p>Use the buttons below to see the different options 👇</p>
</kirby-card>`,
  template: `<kirby-card hasPadding="true" [themeColor]="color">
    <strong>A themed card</strong>
    <p>This cards color is defined by the <code>themeColor</code> input property.</p>
    <p>Recommended values for themeColor are: <br> <code>'secondary' | 'tertiary' | 'medium' | 'dark'</code></p>
    <p>Use the buttons below to see the different options 👇</p>
</kirby-card>

<div class="card-option-button-group">
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('tertiary')" class="tertiary"></button>
    <button (click)="setThemeColor('medium')" class="medium"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
  imports: [CardModule, ThemeColorDirective],
})
export class CardExampleColorComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  color: string = 'secondary';

  setThemeColor(color: string) {
    this.color = color;
  }
}
