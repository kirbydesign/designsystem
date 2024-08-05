import { Component, EventEmitter, forwardRef, Input, Output, TrackByFunction } from '@angular/core';

import {
  ListComponent,
  ListShape,
  ListSwipeAction,
  LoadOnDemandEvent,
  StandAloneSpacing,
  ThemeColor,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
  @Input() getStandAloneByProperty: string;
  @Input() standAloneSpacing: StandAloneSpacing;
  @Input() noMoreItemsText: string;
  @Input() showDivider: boolean;
  @Input() markSelectedRow: boolean;
  @Input() shape: ListShape;
  @Input() hasItemSpacing: boolean;
  @Input() isLoadOnDemandEnabled: boolean;
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Input() swipeActions: ListSwipeAction[];
  @Output() itemSelect = new EventEmitter<any>();
  @Input() disableSelectionHighlight: boolean;
}

// #endregion
