import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { SegmentedControlComponent, SegmentItem } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
// start class MockSegmentedControlComponent
export class MockSegmentedControlComponent {
  @Input() items: SegmentItem[];
  @Input() selectedIndex: number;
  @Input() value: SegmentItem;
  @Input() mode: 'default' | 'chip';
  @Input() size: 'sm' | 'md';
  @Output() segmentSelect = new EventEmitter();
} // end class MockSegmentedControlComponent

// #endregion
