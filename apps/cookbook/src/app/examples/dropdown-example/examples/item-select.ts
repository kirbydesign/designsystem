import { Component, Input } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-item-select',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Dropdown with event handler"
  [items]="items"
  (change)="onItemSelect($event)"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownModule],
})
export class DropdownExampleItemSelectComponent {
  template: string = config.template;
  items = [
    { id: 11, text: 'Item 1' },
    { id: 22, text: 'Item 2' },
    { id: 33, text: 'Item 3' },
    { id: 44, text: 'Item 4' },
    { id: 55, text: 'Item 5' },
  ];
  @Input() size: string;

  constructor(private toastController: ToastController) {}

  onItemSelect(item: { id: number; text: string }) {
    const config: ToastConfig = {
      message: `Item '${item.text} (id=${item.id})' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
