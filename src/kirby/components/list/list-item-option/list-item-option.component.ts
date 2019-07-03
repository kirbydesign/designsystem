import { Component, Input } from '@angular/core';

import { ListHelper, SelectedOptionItem } from '../helpers/list-helper';

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
  constructor(private listHelper: ListHelper) {}
  onClick(id: string) {
    const selectedOptionItem: SelectedOptionItem = {
      id: id,
      item: this.item,
    };
    this.listHelper.selectedOptionItem$.next(selectedOptionItem);
  }
}
