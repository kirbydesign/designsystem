import { Component, Input } from '@angular/core';

/* TODO: Find a better place to store list swipe actions type
     perhaps it should also be aliased? */

import { ListSwipeAction } from '../list';

class SwipeAction implements ListSwipeAction {
  public icon?: string;
  public title: string;

  constructor(
    /* TODO: delete this shit */
    public position: ListSwipeAction['position'],
    title: ListSwipeAction['title'],
    public onSelected: ListSwipeAction['onSelected'],
    icon?: ListSwipeAction['icon'],
    /* TODO: make this do stuff */
    public isDisabled?: ListSwipeAction['isDisabled'],
    public type?: ListSwipeAction['type']
  ) {
    const extractValue = (value: any) => (value instanceof Function ? value() : value);

    this.type = extractValue(type);
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
  _swipeActions: SwipeAction[] = [];
  @Input() set swipeActions(value: ListSwipeAction[]) {
    this._swipeActions = value.map(
      ({ position, title, icon, onSelected, isDisabled, type }) =>
        new SwipeAction(position, title, onSelected, icon, isDisabled, type)
    );
  }

  _side: 'start' | 'end' = 'start';
  @Input() set side(value: 'left' | 'right') {
    this._side = value === 'left' ? 'start' : 'end';
  }

  get _hasSwipeActions(): boolean {
    const returnValue = Array.isArray(this._swipeActions) && this._swipeActions.length !== 0;
    return returnValue;
  }
}
