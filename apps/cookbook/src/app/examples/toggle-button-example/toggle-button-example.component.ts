import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-toggle-button-example',
  template: `<kirby-toggle-button [checked]="true" (checkChanged)="onCheckChanged($event)">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="success">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="false" (checkChanged)="onCheckChanged($event)">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="warning">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button [checked]="true" (checkChanged)="onCheckChanged($event)">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="danger">Activated</button>
</kirby-toggle-button>

<kirby-toggle-button (checkChanged)="onCheckChanged($event)">
  <button kirby-button unchecked disabled attentionLevel="3">Disabled</button>
  <button kirby-button checked >Activated</button>
</kirby-toggle-button>`,
};

@Component({
  selector: config.selector,
  styleUrls: ['./toggle-button-example.component.scss'],
  template: config.template,
})
export class ToggleButtonExampleComponent {
  template = config.template;

  onCheckChanged(checked: boolean) {
    console.log(`Toggle onCheckChanged: ${checked}`);
  }
}
