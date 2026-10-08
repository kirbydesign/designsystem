import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  SegmentedControlComponent,
  SegmentedControlMode,
  SegmentItem,
} from '@kirbydesign/designsystem/segmented-control';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-segmented-control',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: SegmentedControlComponent,
      useExisting: forwardRef(() => MockSegmentedControlComponent),
    },
  ],
})
export class MockSegmentedControlComponent<TItem extends SegmentItem = SegmentItem> {
  @Input() mode: SegmentedControlMode | `${SegmentedControlMode}`;
  @Input() items: TItem[];
  @Input() selectedIndex: number;
  @Output() selectedIndexChange = new EventEmitter<number>();
  @Input() value: NoInfer<TItem>;
  @Input() size: 'sm' | 'md';
  @Input() disableChangeOnSwipe: boolean;
  @Output() segmentSelect = new EventEmitter<TItem>();
}

// #endregion
