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
  @Output() segmentSelect = new EventEmitter();
  @Input() items: SegmentItem[];
  @Input() mode: 'default' | 'chip';
  @Input() size: 'sm' | 'md';
}

// #endregion
