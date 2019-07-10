import { Component, Input } from '@angular/core';

import { ThemeColor } from './../../../helpers/theme-color.type';
import { ListHelper } from '../helpers/list-helper';
import { SelectedItemOption, SelectedItemWithOption } from './list-item-option';

@Component({
  selector: 'kirby-list-item-option',
  templateUrl: './list-item-option.component.html',
  styleUrls: ['./list-item-option.component.scss'],
})
export class ListItemOptionComponent {
  @Input() item: any;
  @Input() id: number;
  @Input() selected: boolean;
  @Input() title: string;
  @Input() iconName?: string;
  @Input() themeColor?: ThemeColor;
  constructor(private listHelper: ListHelper) {}
  onClick() {
    this.selected = !this.selected;
    let optionItem = this.item.slidingOptions.find((option) => option.id === this.id);

    if (optionItem) {
      optionItem.selected = this.selected;
    } else {
      optionItem = { id: this.id, selected: this.selected };
      this.item.slidingOptions.push(optionItem);
    }
    console.log(this.item.slidingOptions);

    const selectedItemWithOption: SelectedItemWithOption = {
      item: this.item,
      selectedItemOption: optionItem,
    };
    this.listHelper.setSelectedItemWithOption(selectedItemWithOption);
  }
}
