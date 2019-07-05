import { Component, Input } from '@angular/core';

import { ListHelper } from '../helpers/list-helper';
import { ItemOption, SelectedItemWithOption } from './list-item-option';

@Component({
  selector: 'kirby-list-item-option',
  templateUrl: './list-item-option.component.html',
  styleUrls: ['./list-item-option.component.scss'],
})
export class ListItemOptionComponent {
  @Input() item: any;
  @Input() option: ItemOption;
  constructor(private listHelper: ListHelper) {}
  onClick() {
    this.option.selected = !this.option.selected;
    const selectedItemWithOption: SelectedItemWithOption = {
      item: this.item,
      option: this.option,
    };
    this.listHelper.setSelectedItemWithOption(selectedItemWithOption);
  }
}
