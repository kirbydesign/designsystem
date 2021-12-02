import { Component, Input } from '@angular/core';

import { ListSwipeAction } from '../list';
import { EvaluatedListSwipeAction } from '../list/list-swipe-action.type';

@Component({
  selector: 'kirby-item-sliding',
  templateUrl: './item-sliding.component.html',
  styleUrls: ['./item-sliding.component.scss'],
})
export class ItemSlidingComponent {
  _evaluatedSwipeActions: EvaluatedListSwipeAction[] = [];

  @Input() set swipeActions(values: ListSwipeAction[]) {
    this._evaluatedSwipeActions = values.map((value) => this.evaluateSwipeAction(value));
  }

  _side: 'start' | 'end' = 'start';
  @Input() set side(value: 'left' | 'right') {
    this._side = value === 'left' ? 'start' : 'end';
  }

  private evaluateSwipeAction(swipeAction: ListSwipeAction): EvaluatedListSwipeAction {
    const evaluatedEntries = Object.entries(swipeAction).map(([key, value]) => ({
      [key]: value instanceof Function ? value() : value,
    }));
    return Object.assign({}, ...evaluatedEntries);
  }

  get _hasSwipeActions(): boolean {
    const returnValue =
      Array.isArray(this._evaluatedSwipeActions) && this._evaluatedSwipeActions.length !== 0;
    return returnValue;
  }
}
