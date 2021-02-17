import { Component, EventEmitter, forwardRef, Input, Output, TrackByFunction } from '@angular/core';

import {
  ListComponent,
  ListItemColor,
  ListItemColor,
  ListShape,
  ListSwipeAction,
  LoadOnDemandEvent,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListComponent,
      useExisting: forwardRef(() => MockListComponent),
    },
  ],
})
export class MockListComponent {
  @Input() items: any[];
  @Input() getItemColor: (item: any) => ListItemColor;
  @Input() getSectionName: (item: any) => string;
  @Input() trackBy: TrackByFunction<any>;
  @Input() noMoreItemsText: string;
  @Input() showDivider: boolean;
  @Input() markSelectedRow: boolean;
  @Input() shape: ListShape;
  @Input() hasItemSpacing: boolean;
  @Input() swipeActions: ListSwipeAction[];
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Output() itemSelect = new EventEmitter<any>();
}

// #endregion
