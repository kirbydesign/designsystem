import { Component } from '@angular/core';
import { ButtonComponent, IconModule, ToggleButtonModule } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-toggle-button-theme-color',
  template: `<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="success">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="warning">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="danger">Activated</button>
</kirby-toggle-button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ToggleButtonModule, ButtonComponent, IconModule],
})
export class ToggleButtonThemeColorExampleComponent {
  template: string = config.template;
}
