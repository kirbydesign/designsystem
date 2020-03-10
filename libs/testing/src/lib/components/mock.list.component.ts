import { Component, Input, Output, EventEmitter, TrackByFunction } from '@angular/core';

import {
  ThemeColor,
  ListSwipeAction,
  ListShape,
  LoadOnDemandEvent,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list',
  template: '<ng-content></ng-content>',
})
export class MockListComponent {
  @Input() items: any[];
  @Input() getItemColor: (item: any) => ThemeColor;
  @Input() getSectionName: (item: any) => string;
  @Input() trackBy: TrackByFunction<any>;
  @Input() noMoreItemsText: string;
  @Input() showDivider;
  @Input() markSelectedRow;
  @Input() shape: ListShape;
  @Input() swipeActions: ListSwipeAction[];
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Output() itemSelect = new EventEmitter<any>();
}

// #endregion
