import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockListComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockListComponent,
      useExisting: forwardRef(() => MockMockListComponent),
    },
  ],
})
export class MockMockListComponent {
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
