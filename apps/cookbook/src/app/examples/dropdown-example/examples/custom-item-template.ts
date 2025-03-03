import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { JsonPipe, NgIf } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-dropdown-example-custom-item-template',
  template: `<kirby-dropdown #dropdown
  [size]="size"
  placeholder="Dropdown with custom item template"
  [items]="items"
  itemTextProperty="title">
  <kirby-item
    *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
    selectable="true"
    [selected]="selected"
    [class.focused]="focused"
  >
    <kirby-icon *ngIf="selected" name="checkmark-selected" slot="start"></kirby-icon>
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <p class="kirby-item-detail">{{ item.subtitle }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
      <data class="kirby-item-detail">{{ item.value }}</data>
    </kirby-label>
  </kirby-item>
</kirby-dropdown>
<p class="selection">Selected item: {{ dropdown.value | json }}</p>`,
  styles: [
    `.selection {
    margin-left: 12px;
    font-size: 12px;
    font-style: italic;
  }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [DropdownModule, NgIf, IconModule, JsonPipe, ItemModule],
})
export class DropdownExampleCustomItemTemplateComponent {
  template: string = config.template;
  items = [
    { title: 'Item 1', subtitle: 'Bacon ipsum dolor', value: 1 },
    { title: 'Item 2', subtitle: 'Tenderloin short loin frankfurter', value: 2 },
    { title: 'Item 3', subtitle: 'Salami andouille hamburger', value: 3 },
    { title: 'Item 4', subtitle: 'Tongue bresaola tail swine', value: 4 },
    { title: 'Item 5', subtitle: 'Drumstick pastrami sirloin ', value: 5 },
  ];
  @Input() size: string;
}
