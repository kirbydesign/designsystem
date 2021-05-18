import { Component, EventEmitter, forwardRef, Input, Output, TrackByFunction } from '@angular/core';

import {
  ListComponent,
  ListItem,
  ListSwipeAction,
  LoadOnDemandEvent,
  ThemeColor,
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
  @Input() items: ListItem[];
  @Input() getItemColor: (item: ListItem) => ThemeColor;
  @Input() getSectionName: (item: ListItem) => string;
  @Input() trackBy: TrackByFunction<any>;
  @Input() noMoreItemsText: string;
  @Input() showDivider: boolean;
  @Input() markSelectedRow: boolean;
  @Input() shape;
  @Input() hasItemSpacing: boolean;
  @Input() useVirtualScroll: boolean;
  @Input() virtualScrollViewportHeight: number;
  @Input() virtualScrollSettings: any;
  @Input() isLoadOnDemandEnabled: boolean;
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Input() swipeActions: ListSwipeAction[];
  @Output() itemSelect = new EventEmitter<any>();
}

// #endregion
