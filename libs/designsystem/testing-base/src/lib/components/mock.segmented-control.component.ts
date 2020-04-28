import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() items: SegmentItem[];
  @Input() selectedIndex: number;
  @Input() value: SegmentItem;
  @Input() mode: 'default' | 'chip';
  @Input() size: 'sm' | 'md';
  @Output() segmentSelect = new EventEmitter();
}

// #endregion
