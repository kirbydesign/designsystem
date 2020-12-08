import { forwardRef, Component, Input, Output, EventEmitter, TrackByFunction } from '@angular/core';

import {
  ListComponent,
  ListSwipeAction,
  ListShape,
  LoadOnDemandEvent,
  ThemeColor,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
// start class MockListComponent
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
  @Input() swipeActions: ListSwipeAction[];
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Output() itemSelect = new EventEmitter<any>();
} // end class MockListComponent

// #endregion
