import { Component } from '@angular/core';
import { ListComponent } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const config = {
  selector: 'cookbook-checkbox-list-example',
  template: `<kirby-list [items]="checkboxItems" [showDivider]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-checkbox
      slot="start"
      [checked]="item.checked"
    ></kirby-checkbox>
    <kirby-label>{{ item.label }}</kirby-label>
  </kirby-item>
</kirby-list>`,
  codeSnippet: `checkboxItems = [
  { label: 'Checkbox 1', checked: true },
  { label: 'Checkbox 2', checked: false },
  { label: 'Checkbox 3', checked: false },
];`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ListComponent, ItemComponent, CheckboxComponent],
})
export class CheckboxListExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  checkboxItems = [
    { label: 'Checkbox 1', checked: true },
    { label: 'Checkbox 2', checked: false },
    { label: 'Checkbox 3', checked: false },
  ];
}
