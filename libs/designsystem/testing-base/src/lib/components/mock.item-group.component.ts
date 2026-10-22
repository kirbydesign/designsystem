import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { ItemGroupComponent } from '@kirbydesign/designsystem/item-group';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-group',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: ItemGroupComponent,
      useExisting: forwardRef(() => MockItemGroupComponent),
    },
  ],
})
export class MockItemGroupComponent {}

// #endregion
