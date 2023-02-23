import { Component, forwardRef, Input } from '@angular/core';

import { MockFabSheetComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-fab-sheet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockFabSheetComponent,
      useExisting: forwardRef(() => MockMockFabSheetComponent),
    },
  ],
})
export class MockMockFabSheetComponent {
  @Input() disabled: boolean;
  @Input() horizontalAlignment: 'left' | 'center' | 'right';
}

// #endregion
