import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-multi-list-example',
  template: `
<kirby-list [items]="checkboxItems" showDivider="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-checkbox
      slot="start"
      type="multi"
      [checked]="item.checked"
      (checkedChange)="checkedChange($event)"
    ></kirby-checkbox>
    <kirby-label>{{ item.label }}</kirby-label>
  </kirby-item>
</kirby-list>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxMultiListExampleComponent {
  template: string = config.template.trim();

  checkboxItems = [
    { label: 'Checkbox 1', checked: true },
    { label: 'Checkbox 2', checked: false },
    { label: 'Checkbox 3', checked: false },
  ];
}
