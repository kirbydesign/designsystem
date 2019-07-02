import { Component, Input } from '@angular/core';

import { ListItemOptionHelper, SelectedOptionItem } from '../helpers/list-item-option-helper';

@Component({
  selector: 'kirby-list-item-option',
  templateUrl: './list-item-option.component.html',
  styleUrls: ['./list-item-option.component.scss'],
})
export class ListItemOptionComponent {
  @Input() id: string;
  @Input() title: string;
  @Input() iconName?: string;
  @Input() item: any;
  constructor(private listItemOptionHelper: ListItemOptionHelper) {}
  onClick(id: string) {
    const selectedOptionItem: SelectedOptionItem = {
      id: id,
      item: this.item,
    };
    this.listItemOptionHelper.selectedOptionItem$.next(selectedOptionItem);
  }
}
