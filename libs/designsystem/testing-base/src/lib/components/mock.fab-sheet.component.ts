import { Component, forwardRef, Input } from '@angular/core';

import { FabSheetComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-fab-sheet',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
