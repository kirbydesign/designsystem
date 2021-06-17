import { Component, EventEmitter, forwardRef, Input, Output, TrackByFunction } from '@angular/core';

import {
  ListComponent,
  ListShape,
  ListSwipeAction,
  LoadOnDemandEvent,
  ThemeColor,
  VirtualScrollSettings,
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
  @Input() getItemColor: (item: any) => ThemeColor;
  @Input() getSectionName: (item: any) => string;
  @Input() trackBy: TrackByFunction<any>;
  @Input() noMoreItemsText: string;
  @Input() showDivider: boolean;
  @Input() markSelectedRow: boolean;
  @Input() shape: ListShape;
  @Input() hasItemSpacing: boolean;
  @Input() useVirtualScroll: boolean;
  @Input() virtualScrollViewportHeight: number;
  @Input() virtualScrollSettings: VirtualScrollSettings;
  @Input() virtualScrollTimeout: number;
  @Input() isLoadOnDemandEnabled: boolean;
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Input() swipeActions: ListSwipeAction[];
  @Output() itemSelect = new EventEmitter<any>();
}

// #endregion
