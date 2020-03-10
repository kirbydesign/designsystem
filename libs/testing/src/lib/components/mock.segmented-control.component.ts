import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-segmented-control',
  template: '<ng-content></ng-content>',
})
export class MockSegmentedControlComponent {
  @Output() segmentSelect = new EventEmitter();
  @Input() items: SegmentItem[];
  @Input() mode;
}

// #endregion
