import { Component, forwardRef } from '@angular/core';

import { TabsComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-bar',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: TabsComponent,
      useExisting: forwardRef(() => MockTabsComponent),
    },
  ],
})
export class MockTabsComponent {}

// #endregion
