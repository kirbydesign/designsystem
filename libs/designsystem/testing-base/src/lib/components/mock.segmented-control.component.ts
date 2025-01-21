import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  SegmentedControlComponent,
  SegmentedControlMode,
  SegmentItem,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-segmented-control',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: SegmentedControlComponent,
      useExisting: forwardRef(() => MockSegmentedControlComponent),
    },
  ],
})
export class MockSegmentedControlComponent {
  @Input() mode: SegmentedControlMode | `${SegmentedControlMode}`;
  @Input() items: SegmentItem[];
  @Input() selectedIndex: number;
  @Output() selectedIndexChange = new EventEmitter<number>();
  @Input() value: SegmentItem;
  @Input() size: 'sm' | 'md';
  @Input() disableChangeOnSwipe: boolean;
  @Output() segmentSelect = new EventEmitter();
}

// #endregion
