import { Component, Input } from '@angular/core';

import { ListSwipeAction } from '../list';

class SwipeAction implements ListSwipeAction {
  public icon: string;
  public title: string;

  constructor(
    public position: ListSwipeAction['position'],
    title: ListSwipeAction['title'],
    public onSelected: ListSwipeAction['onSelected'],
    icon?: ListSwipeAction['icon'],
    public isDisabled?: ListSwipeAction['isDisabled'],
    public type?: ListSwipeAction['type']
  ) {
    const extractValue = (value: any) => (value instanceof Function ? value() : value);

    this.icon = extractValue(icon);
    this.title = extractValue(title);
  }

  public get side() {
    return {
      left: 'start',
      right: 'end',
    }[this.position];
  }
}

@Component({
  selector: 'kirby-item-sliding',
  templateUrl: './item-sliding.component.html',
  styleUrls: ['./item-sliding.component.scss'],
})
export class ItemSlidingComponent {
  /* TODO: Find a better place to store list swipe actions type
     perhaps it should also be aliased? */

  _swipeActions: SwipeAction[] = [];
  @Input() set swipeActions(value: ListSwipeAction[]) {
    this._swipeActions = value.map(
      ({ position, title, icon, onSelected, isDisabled, type }) =>
        new SwipeAction(position, title, onSelected, icon, isDisabled, type)
    );
  }

  get _hasSwipeActions(): boolean {
    const returnValue = Array.isArray(this._swipeActions) && this._swipeActions.length !== 0;
    console.log(returnValue);
    return returnValue;
  }
}
