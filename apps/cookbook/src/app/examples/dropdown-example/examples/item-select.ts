import { Component, Input } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-item-select',
  template: `<kirby-dropdown
  placeholder="Dropdown with event handler"
  aria-label="Choose your favorite fruit"
  [items]="items"
  (change)="onItemSelect($event)"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownComponent],
})
export class DropdownExampleItemSelectComponent {
  template: string = config.template;
  items = [
    { id: 11, text: 'Apple' },
    { id: 22, text: 'Banana' },
    { id: 33, text: 'Blackberry' },
    { id: 44, text: 'Blueberry' },
    { id: 55, text: 'Grapes' },
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
