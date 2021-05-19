import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { SegmentedControlComponent, SegmentItem } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-segmented-control',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SegmentedControlComponent,
      useExisting: forwardRef(() => MockSegmentedControlComponent),
    },
  ],
})
export class MockSegmentedControlComponent {
  @Input() mode: Mode;
  @Input() items: SegmentItem[];
  @Input() selectedIndex: number;
  @Input() value: SegmentItem;
  @Input() size: 'sm' | 'md';
  @Output() segmentSelect = new EventEmitter();
}

// #endregion
