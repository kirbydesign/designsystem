import { forwardRef, Component, Input } from '@angular/core';

import { FabSheetComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-fab-sheet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FabSheetComponent,
      useExisting: forwardRef(() => MockFabSheetComponent),
    },
  ],
})
export class MockFabSheetComponent {
  @Input() disabled: boolean;
  @Input() horizontalAlignment: 'left' | 'center' | 'right';
}

// #endregion
