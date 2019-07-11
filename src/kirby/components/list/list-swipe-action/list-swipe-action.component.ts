import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ThemeColor } from '../../../helpers/theme-color.type';
import { ListHelper } from './../helpers/list-helper';

@Component({
  selector: 'kirby-list-swipe-action',
  templateUrl: './list-swipe-action.component.html',
  styleUrls: ['./list-swipe-action.component.scss'],
})
export class ListSwipeActionComponent {
  @Input() selected: boolean;
  @Input() title: string;
  @Input() altTitle?: string;
  @Input() iconName?: string;
  @Input() altIconName?: string;
  @Input() themeColor?: ThemeColor;

  @Output() swipeActionSelect = new EventEmitter<boolean>();

  constructor(private listHelper: ListHelper) {}

  onSelect() {
    this.swipeActionSelect.emit(!this.selected);
    this.listHelper.closeActionItems();
  }
}
